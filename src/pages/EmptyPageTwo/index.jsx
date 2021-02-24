import React, { Component, Fragment } from 'react'
import { Button, message } from 'antd';
class Father extends React.Component {
  onClick=()=>{
    this.child.changeTest();
  }
  onRef = (ref) => {
    this.child = ref
    console.log(ref) // -> 获取整个Child元素
  }
  render() {
    return (
      <div>
        <p></p>
        <Button onClick={this.onClick}>点击父组件</Button>
        <Child onRef={this.onRef}/>
      </div>
    )
  }
}

class Child extends React.Component {
 state={
   test:"没调用之前"
 }
  componentDidMount() {
    this.props.onRef(this);
  }

  changeTest=()=>{
    this.setState({
      test: "已经调用了"
    })
    message.success("调用成功");
  }

  render() {
    return (
      <div>
        <p>{this.state.test}</p>
        <Button >点击子组件</Button>/
      </div>
    )
  }
}


export default Father
