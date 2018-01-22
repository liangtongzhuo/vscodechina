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
    this.state = { show: false }

    this._clickLogin = this._clickLogin.bind(this)
    this._clicRegister = this._clicRegister.bind(this)
    this._onChangeMail = this._onChangeMail.bind(this)
    this._onChangePassword = this._onChangePassword.bind(this)
    this._onGitHub = this._onGitHub.bind(this)
  }
  // 加载一次，Dom 未加载
  componentWillMount() {

  }
  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {

  }
  _clickLogin(e) {
    this.props.history.push('/')
    // AV.User.logIn('Tom', 'cat!@#123').then(function (loginedUser) {
    //   console.log(loginedUser);
    // }, function (error) {
    // });
  }
  _clicRegister(e) {
  //   AV.User.requestEmailVerify('abc@xyz.com').then(function (result) {
  //     console.log(JSON.stringify(result));
  // }, function (error) {
  //     console.log(JSON.stringify(error));
  // });
  }
  _onGitHub(e) {

  }
  _onChangeMail(e) {
    this.setState({ mail: e.target.value })

    
  }
  _onChangePassword(e) {
    this.setState({ password: e.target.value })
  }
  // 渲染 Dom
  render() {
    return (
      <div className="login">
        <Progress show={this.state.show} />
        <div className="box">
          <h1>VSCodeChina</h1>
          <TextField
            required
            className="item"
            label="邮箱"
            onChange={this._onChangeMail}
          />
          <TextField
            required
            className="item"
            label="密码"
            type="password"
            onChange={this._onChangePassword}
          />

          <div className="itemButton">
            <Button className="button" onClick={this._clickLogin}>
              登陆
            </Button>
            <Button className="button" onClick={this._clicRegister}>
              注册
          </Button>
          </div>

          <Button className="buttonGithub" onClick={this._onGitHub}>
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
