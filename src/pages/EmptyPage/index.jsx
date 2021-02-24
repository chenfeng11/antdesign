import React, { Component, Fragment} from 'react'
import { Button, message } from 'antd';
class Father extends React.Component {
state={
  fatherName:"fatherName",
  fatherage:"fatherage",
  value:"这里是值"
}
  ChangeTest=(value)=>{
  this.setState({
    value
  })
  }
  render() {
    return (
      <div>
        <p>{this.state.value}</p>
        <Button>点击调用子组件的方法</Button>
        <Child fatherName={this.state.fatherName} fatherage={this.state.fatherage} 
          ChangeTest={this.ChangeTest.bind(this)} onRef={this.onRef}/>
      </div>
    )
  }
}

class Child extends React.Component {
state={
  childName:"childName"
}
  onClick=()=>{
    message.success(this.props.fatherName);
    this.props.ChangeTest(this.state.childName);
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
