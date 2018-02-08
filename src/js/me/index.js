import React, { Component } from 'react'
import { Button, TextField } from 'material-ui'
import AV from "leancloud-storage"
import Progress from "../component/progress.js"
import SnackBar from "../component/snackbar.js"
import "./me.css"


class Me extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)
    this.state = { 
      name: AV.User.current().get('name'), 
      bio: AV.User.current().get('bio') ,
      blog: AV.User.current().get('blog'), 
      github_url: AV.User.current().get('github_url')
    }
    this._clickSave = this._clickSave.bind(this)
    this._onChangeName = this._onChangeName.bind(this)
    this._emailVerify = this._emailVerify.bind(this)
    this._upDataPassword = this._upDataPassword.bind(this)
    this._onChangebBio = this._onChangebBio.bind(this)
    this._onChangebBlog = this._onChangebBlog.bind(this)
    
  }
  // 加载一次，Dom 未加载
  componentWillMount() {

  }
  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {

  }
  _onChangeName(e) {
    this.setState({ name: e.target.value })

    if (e.target.value.length === 0) {
      this.setState({ nameError: true })
    } else {
      this.setState({ nameError: false })
    }
  }
  // 保存信息
  _clickSave(e) {
    if (this.state.name && this.state.name.length === 0) {
      this._snackBarOpen('名字不能为空')
      return
    }

    this.setState({ progressShow: true })
    AV.User.current()
      .set('name', this.state.name)
      .set('bio', this.state.bio)
      .set('blog', this.state.blog)
      
      
      .save().then(result => {
        this.setState({ progressShow: false })
        this._snackBarOpen('保存成功')
      }).catch(error => {
        this.setState({ progressShow: false })
        this._snackBarOpen('讨厌，网络错误了')
      })
  }
  // 验证邮箱
  _emailVerify(e) {
    this.setState({ progressShow: true })

    AV.User
      .requestEmailVerify(AV.User.current().getEmail())
      .then(function (result) {
        this.setState({ progressShow: false })
        this._snackBarOpen('发送一封邮件, 请及时验证邮箱，及时验证邮箱，验证邮箱，重要说三遍啦')
      }).catch(function (error) {
        this.setState({ progressShow: false })
        this._snackBarOpen('网络错啦')
      })
  }
  // 更改密码
  _upDataPassword(e) {
    this.setState({ progressShow: true })
    AV.User
      .requestPasswordReset(AV.User.current().getEmail())
      .then(function (success) {
        this.setState({ progressShow: false })
        this._snackBarOpen('请注意查收邮箱', 5000)
      }).catch(function (error) {
        this.setState({ progressShow: false })
        this._snackBarOpen('网络错啦')
      });
  }
  // 修改个人信息
  _onChangebBio(e) {
    this.setState({ bio: e.target.value })
  }
  // 修改博客
  _onChangebBlog(e) {
    this.setState({ blog: e.target.value })
  }
  // 渲染 Dom
  render() {
    return (
      <div className="g-container me">
        <Progress show={this.state.progressShow} />
        <SnackBar open={this.state.snackBarOpen} content={this.state.content} />
        <div className="content">
          <h3>个人资料</h3>
          {/* 头像 */}
          {/* 邮箱 */}
          <div className="cell">
            <TextField
              disabled
              className="item"
              value={AV.User.current().getEmail()}
              label={'用于登陆且不可更改, 没有关联 GitHub 的头像显示 Gravatar 头像'}
            />
          </div>
          {/* 名字 */}
          <div className="cell">
            <TextField
              required
              error={this.state.nameError}
              className="item"
              value={this.state.name}
              label={this.state.nameError ? '昵称不能为空' : '昵称'}
              onChange={this._onChangeName}
            />
          </div>
          {/* 个人主页 */}
          <div className="cell">
            <TextField
              className="item"
              value={this.state.blog}
              label={'个人主页'}
              onChange={this._onChangebBlog}
            />
          </div>
          {/* github_url */}
          <div className="cell">
            <TextField
              disabled
              className="item"
              value={this.state.github_url}
              label={'GitHub 地址，仅有授权则修改'}
            />
          </div>
          {/* 介绍 */}
          <div className="cell">
            <TextField
              multiline
              rowsMax="4"
              className="item"
              value={this.state.bio}
              label={'个人签名'}
              onChange={this._onChangebBio}
            />
          </div>
          <div className="cell">
            <Button className="button" onClick={this._clickSave}>
              保存
            </Button>
            <div className="divb">
              {/* <Button className="b" onClick={this._upDataPassword}>
                GITHUB 数据同步
              </Button> */}
              {/* <Button className="b" onClick={this._emailVerify}>
                验证邮箱
              </Button>
              <Button className="b" onClick={this._upDataPassword}>
                修改密码
              </Button> */}
            </div>
          </div>
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


export default Me
