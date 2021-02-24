import React, { Component, Fragment } from 'react'
//import style from "./index.less";
import './index.less';
function Square(props) {
  console.log("Square方法"+props);
  return (
    <button className="square" onClick={props.onClick}
    className={props.winner ? 'square gold' : 'square'}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  isWinnerIndex(i) {//判斷這個框框是否是贏的
    if (this.props.winner && this.props.winner.line.findIndex(el => el === i) !== -1) {
      return true;
    } return false;

  }

  renderSquare(i) {
    console.log("renderSquare***"+i);
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        winner={this.isWinnerIndex(i)}
        key={i}
      />
    );
  }

  render() {
    return (
      <div className="board">
        <div className="row-counters">
          <div className="row-num">3</div>
          <div className="row-num">2</div>
          <div className="row-num">1</div>
        </div>
        {
          Array(3).fill(null).map((row, x) => {
            return (
              <div className="board-row" key={x}>
                {
                  Array(3).fill(null).map((square, y) => this.renderSquare(3 * x + y))
                }
              </div>
            )
          })

        }
        <div className="column-counters">
          <div className="column-num">1</div>
          <div className="column-num">2</div>
          <div className="column-num">3</div>
        </div>

      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          result:""
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      where: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const result=coordinate(i);
    console.log("i:"+i+"****"+result);
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          result:result
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    console.log(winner);
    // const seat =this.state.history[this.state.stepNumber].result;
    console.log("current"+current);
    const moves = history.map((step, move) => {
      //step.result
      const desc = move ?
        'Go to move #' + step.result :
        'Go to game start';
        const bold = move === this.state.stepNumber ? 'bold' : '';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)} className={bold}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner.winner;
    }
    else {
      if (this.state.stepNumber == 9) {
        status = "平局";
      }
      else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winner={winner}
            onClick={a => this.handleClick(a)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function coordinate(i)
{
  console.log("鴿子的KEY"+i);
  const seats=[ 
   [0,1,1],
   [1,1,2],
   [2,1,3],
   [3,2,1],
   [4,2,2],
   [5,2,3],
   [6,3,1],
   [7,3,2],
   [8,3,3]
  ];
  for (let index = 0; index < seats.length; index++) {
    if(seats[index][0]==i)
    {
      const a="("+seats[index][1]+","+seats[index][2]+")";
      return a;
    }   
  }
  return null;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return (
        {
          winner: squares[a],
          line: lines[i],
        }
      )
    }
  }
  return null;
}


export default Game;