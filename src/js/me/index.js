import React, { Component } from 'react'
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from 'material-ui'
import AV from "leancloud-storage"
import Progress from "../component/progress"
import SnackBar from "../component/snackbar"
import Header from "../component/header"
import "./me.css"


class Me extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)
    this.state = {
      email: AV.User.current().getEmail(),
      name: AV.User.current().get('name'),
      bio: AV.User.current().get('bio'),
      blog: AV.User.current().get('blog'),
      github_url: AV.User.current().get('github_url')
    }
    this._clickSave = this._clickSave.bind(this)
    this._onChangeName = this._onChangeName.bind(this)
    this._emailVerify = this._emailVerify.bind(this)
    this._upDataPassword = this._upDataPassword.bind(this)
    this._onChangebBio = this._onChangebBio.bind(this)
    this._onChangebBlog = this._onChangebBlog.bind(this)
    this._buttonGithub = this._buttonGithub.bind(this)
    this._open = this._open.bind(this)
    this._close = this._close.bind(this)
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
    if (this.state.name && (this.state.name.length === 0 || this.state.name.length > 20)) {
      this._snackBarOpen('名字不能为空，且不能大于 20 字符')
      return
    }
    // 验证名字合格
    for (let i = 0; i < this.state.name.length; i++) {
      const str = this.state.name[i];
      if (str === '@') {
        this._snackBarOpen('名字不能有 @ 呢 ~_~')
        return
      }
      if (str === ' ') {
        this._snackBarOpen('名字不能有空格呢 -_-')
        return
      }
    }

    this.setState({ progressShow: true })
    AV.User.current()
      .set('name', this.state.name)
      .set('bio', this.state.bio)
      .set('blog', this.state.blog)
      .save().then(result => {
        this.setState({ progressShow: false })
        this._snackBarOpen('保存成功 :)')
      }).catch(error => {
        this.setState({ progressShow: false })
        if (error.code === 137) return this._snackBarOpen('名字重复了 :(')
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
  // 授权页面
  _buttonGithub(e) {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=538a8b0fb32787b493c7&redirect_uri=http://vscode-china.com/oauth.html&state=' + AV.User.current().id
  }
  _open(e) {
    this.setState({ show: true })
  }
  _close(e) {
    this.setState({ show: false })
  }
  // 渲染 Dom
  render() {

    return (
      <div>
        <Header history={this.props.history} />
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
                value={this.state.email}
                label={'邮箱: 用于登陆且不可更改, 没有关联 GitHub 的头像显示 Gravatar 头像'}
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
                label={'GitHub 地址'}
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
                <Button className="b" onClick={this._open}>
                  GITHUB授权
              </Button>
                <Button className="b" onClick={this._emailVerify}>
                  验证邮箱
              </Button>
                <Button className="b" onClick={this._upDataPassword}>
                  修改密码
              </Button>
              </div>
            </div>
          </div>

          {/* model */}
          <Dialog
            open={this.state.show}
            onClose={this._close}
          >
            <DialogTitle >{"请注意，少部分人来说是危险操作"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                关联 GitHub 数据，同步昵称、GitHub 地址、个人主页、个性签名，最重的是当前的邮箱也会被 GitHub 绑定邮箱「 覆盖 」，则原来邮箱作废，用 GitHub 绑定邮箱登录。
              <br /><br />
                如果当前账户邮箱与 GitHub 绑定邮箱一致则不存在此问题 。
            </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this._buttonGithub} >
                授权更新
            </Button>
              <Button onClick={this._close} autoFocus>
                取消
            </Button>
            </DialogActions>
          </Dialog>
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
