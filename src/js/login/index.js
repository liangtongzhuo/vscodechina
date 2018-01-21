import React, { Component } from 'react'
import { TextField, Button } from 'material-ui'
// import AV from "leancloud-storage"
import "./login.css"
import Progress from "../component/progress.js"


class Login extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)
    console.log(111)
  }
  // 加载一次，Dom 未加载
  componentWillMount() {

  }
  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {

  }
  _clickLogin(e) {

  }
  _clicRegister(e){

  }
  // 渲染 Dom
  render() {
    return (
      <div className="login">
        <Progress show={true}/>
        <div className="box">
          <h1>VSCodeChina</h1>
          <TextField
            required
            className="item"
            id="name"
            label="邮箱"
          />
          <TextField
            required
            className="item"
            id="password"
            label="密码"
            type="password"
          />

          <div className="itemButton">
            <Button  className="button">
              登陆
            </Button>
            <Button  className="button">
              注册
          </Button>
          </div>

          <Button  className="buttonGithub">
              GitHub 授权登陆
          </Button>
        </div>
      </div>
    )
  }
  // 父组建更新 Props 调用
  componentWillReceiveProps(nextProps) {

  }
  // 更新 Props 或 State 则调用
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  //在 Dom 更新之前调用 
  componentWillUpdate(nextProps, nextState) {

  }
  // 更新 Dom 结束后调用
  componentDidUpdate() {

  }
  // 拆卸调用
  componentWillUnmount() {

  }
}

export default Login
