import React, { Component } from 'react'
import { TextField, Button } from 'material-ui'
import AV from "leancloud-storage"
import Progress from "../component/progress"
import SnackBar from "../component/snackbar"

import "./login.css"

class Login extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)
    this.state = {}

    this._clickLogin = this._clickLogin.bind(this)
    this._clicRegister = this._clicRegister.bind(this)
    this._onChangeMail = this._onChangeMail.bind(this)
    this._onChangePassword = this._onChangePassword.bind(this)
    this._onGitHub = this._onGitHub.bind(this)
    this._onBlur = this._onBlur.bind(this)
    this._findPsw = this._findPsw.bind(this)
    this._findSend = this._findSend.bind(this)
    this._backHom = this._backHom.bind(this)
  }
  // 加载一次，Dom 未加载
  componentWillMount() {

  }
  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {

  }
  // 登陆
  _clickLogin(e) {
    this.setState({ progressShow: true })
    const mail = this.state.mail
    const password = this.state.password
    AV.User.logIn(mail, password).then(loginedUser => {
      this.props.history.push('/')
    }).catch(error => {
      console.log(error)
      this.setState({ progressShow: false })
      if (error.code === 211) return this._snackBarOpen('没有找到邮箱～')
      if (error.code === 210) return this._snackBarOpen('密码错误，你好好想想～')
      return this._snackBarOpen('网络有些问题耶～')
    })
  }
  // 注册
  _clicRegister(e) {
    if (!this.state.buttonLogin) {
      this._snackBarOpen('请在本页面填写「账号」与「密码」再点击注册啦～', 5000)
      return
    }
    this.setState({ progressShow: true })
    const mail = this.state.mail
    const password = this.state.password
    const user = new AV.User()
    user.setUsername(mail)
    user.setEmail(mail)
    user.setPassword(password)
    user.set('name', mail.split('@')[0])
    user.signUp().then(loginedUser => {
      this.props.history.push('/')
    }).catch(error => {
      this.setState({ progressShow: false })
      if (error.code === 203)
        return this._snackBarOpen('邮箱已被注册，是不是你忘记密码了？')
      if (error.code === 125)
        return this._snackBarOpen('电子邮箱地址无效，不要骗我')
      return this._snackBarOpen('网络有些问题～')
    })
  }
  // 切换找回密码与登陆界面
  _findPsw(e) {
    this.setState({ findPsw: !this.state.findPsw })
  }
  // 根据邮箱找回密码
  _findSend() {
    const mail = this.state.mail
    if (!mail) {
      return this._snackBarOpen('请输入邮箱')
    }
    this.setState({ progressShow: true })
    AV.User
      .requestPasswordReset(mail)
      .then(success => {
        this.setState({ progressShow: false })
        this._snackBarOpen('发送一封邮件, 请及时验证邮箱，及时验证邮箱，验证邮箱，重要说三遍啦', 5000)
      }).catch(error => {
        this.setState({ progressShow: false })
        if (error.code === 1)
          return this._snackBarOpen('15 分钟后再试啦～')
        if (error.code === 205)
          return this._snackBarOpen('找不到电子邮箱地址，别骗我啦')
        return this._snackBarOpen('网络异常，网络又不好了')
      })
  }
  _onGitHub(e) {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=538a8b0fb32787b493c7&redirect_uri=http://vscode-china.com/oauth.html'
  }
  _onChangeMail(e) {
    this.setState({ mail: e.target.value })
    this._verify()
  }
  _onChangePassword(e) {
    this.setState({ password: e.target.value })
    this._verify()
  }
  // 判断账号和密码合法性，修改状态
  _verify() {
    // 密码与邮箱符合验证
    if (this.state.password && this.state.password.length >= 6
      && this.state.mail && this.state.mail.match(/^(.+)@(.+)$/)) {
      this.setState({ buttonLogin: true })
    } else {
      this.setState({ buttonLogin: false })
    }

    if (this.state.mail && this.state.mail.match(/^(.+)@(.+)$/)) {
      this.setState({ buttonMailError: false })
    } else if (this.state.mail) {
      this.setState({ buttonMailError: true })
      return
    }

    if (!this.state.password) return

    if (this.state.password && this.state.password.length >= 6) {
      this.setState({ buttonPasswordError: false })
    } else {
      this.setState({ buttonPasswordError: true })
    }

  }
  // 失去焦点
  _onBlur(e) {
    this._verify()
  }
  // back 主页
  _backHom() {
    this.props.history.push('/')
  }
  // 渲染 Dom
  render() {
    const hiddenStyle = {
      display: 'none'
    }
    const visibleStyle = {
      display: ''
    }
    return (
      <div className="login">
        <Progress show={this.state.progressShow} />
        <SnackBar open={this.state.snackBarOpen} content={this.state.content} />
        <div className="box" style={this.state.findPsw ? hiddenStyle : visibleStyle}>
          <h1 onClick={this._backHom}>VSCodeChina</h1>
          <TextField
            required
            error={this.state.buttonMailError}
            className="item"
            label={this.state.buttonMailError ? '不是合法邮箱' : '邮箱'}
            onChange={this._onChangeMail}
            onBlur={this._onBlur}
          />
          <TextField
            required
            error={this.state.buttonPasswordError}
            className="item"
            label={this.state.buttonPasswordError ? '密码大于等于 6 位' : '密码'}
            type="password"
            onChange={this._onChangePassword}
            onBlur={this._onBlur}
          />
          {/* 按钮 */}
          <div className="itemButton">
          <Button disabled={!this.state.buttonLogin} className={!this.state.buttonLogin ? 'button' : 'button blue'} onClick={this._clickLogin}>
              登陆
          </Button>
          <Button className="button" onClick={this._clicRegister}>
              注册
          </Button>
          </div>
          <Button className={this.state.buttonLogin ? 'buttonGithub' : 'buttonGithub-blue'} onClick={this._onGitHub}>
            GitHub 授权登陆
          </Button>
          <Button className="findPsw" onClick={this._findPsw}>
            找回密码
          </Button>
        </div>

        <div className="box" style={this.state.findPsw ? visibleStyle : hiddenStyle}>
          <h1>VSCodeChina</h1>
          <TextField
            required
            error={this.state.buttonMailError}
            className="item"
            label={this.state.buttonMailError ? '不是合法邮箱' : '邮箱'}
            onChange={this._onChangeMail}
            onBlur={this._onBlur}
          />
          {/* 按钮 */}
          <Button className="buttonGithub" onClick={this._findSend}>
            发送邮件
          </Button>
          <Button className="findPsw" onClick={this._findPsw}>
            返回
          </Button>
        </div>
      </div>
    )
  }
  _snackBarOpen(content, time = 2000) {
    this.setState({ snackBarOpen: true, content: content })
    setTimeout(() => {
      this.setState({ snackBarOpen: false })
    }, time)
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
