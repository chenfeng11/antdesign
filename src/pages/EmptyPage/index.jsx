import React, { Component, Fragment} from 'react'
import { Button, message } from 'antd';
class Father extends React.Component {
state={
  fatherName:"fatherName",
  fatherage:"fatherage",
}
  render() {
    return (
      <div>
        <p>这是父组件</p>
        <Button>点击调用子组件的方法</Button>
        <Child fatherName={this.state.fatherName} fatherage={this.state.fatherage}/>
      </div>
    )
  }
}

class Child extends React.Component {

  onClick=()=>{
    message.success(this.props.fatherName);
  }
  render() {
    return (
      <div>
        <p>{this.props.fatherage}</p>
        <Button onClick={this.onClick}>点击拿父组件的值</Button>/
      </div>
    )
  }
}


export default Father
