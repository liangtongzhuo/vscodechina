import React, { Component } from 'react'
import { Button } from 'material-ui'
import AV from "leancloud-storage"
import queryString from 'query-string'
import Progress from "../component/progress"
import SnackBar from "../component/snackbar"
import "./oauth.css"

class Oauth extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)
    const search = window.location.search
    const { code, state } = queryString.parse(search)
    this.state = { progressShow: true, code, state }
    this._back = this._back.bind(this)
    // github 回调 code        
    this._oauth()
  }
  // 加载一次，Dom 未加载
  componentWillMount() {


  }
  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {

  }
  _oauth() {
    const { code, state } = this.state
      if (!code) return window.location.href='/'      
    // 传送 code，换取登陆信息。
    AV.Cloud.run('gitHubOauth', {
      code,
      state
    }).then(result => {
      // 登陆
      return AV.User.signUpOrlogInWithAuthData({
        'uid': result.uid + '',
        'access_token': result.access_token,
      }, 'github')
    }).then(_ => {
      this.setState({ progressShow: false })        
      window.location.href='/'      
  
    }).catch(err => {
      this.setState({ progressShow: false, error: true })
      this._snackBarOpen('好奇怪耶～，获取不到你的 GitHub 交友信息～', 5000)
      console.log(err)
    });
  }
  _back(e) {
    window.location.href='/'      
  }
  // 渲染 Dom
  render() {
    return (
      <div className="oauth">
        <Progress show={this.state.progressShow} />
        <SnackBar open={this.state.snackBarOpen} content={this.state.content} />
        <div className="box" onClick={this._back}>
          {this.state.error === true ? (<h1 >讨厌错误了~_~</h1>) : (<h1 >正在授权登陆</h1>)}
          {this.state.error === true ? (<Button className="button">点击返回主页</Button>) : ('')}
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

export default Oauth
