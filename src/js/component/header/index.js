import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Button, IconButton, Menu, MenuItem } from 'material-ui'
import AV from 'leancloud-storage'
import md5 from 'blueimp-md5'
import './header.css'
import { Bell } from './svg.js'

class Header extends Component {
  constructor(props, context) {
    super(props)

    // 当前用户头像
    let url = AV.User.current() && (AV.User.current().get('avatar') || 'https://secure.gravatar.com/avatar/' + md5(AV.User.current().getEmail()) + '?s=140*140&d=identicon&r=g')
    this.state = { anchorEl: null, menuShow: false, url, numer: 0 }

    this._clickHead = this._clickHead.bind(this)
    this._handleClose = this._handleClose.bind(this)
    this._handleMenuClose = this._handleMenuClose.bind(this)
    this._clickLogin = this._clickLogin.bind(this)
    this._clickNotice = this._clickNotice.bind(this)    
  }
  // 加载一次，Dom 未加载
  componentWillMount() {
  }
  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {
  }
  render() {
    return (
      <header className="header">
        <div className="g-container container">
          <div className="left">
            <Link className="logo" to="/"> VSCodeChina </Link>
            <nav>
              <Button className="button"><NavLink exact to="/" className="g-color-gray a" activeClassName="selected"> 全部 </NavLink></Button>
              <Button className="button"><NavLink to="/精华" className="g-color-gray a" activeClassName="selected"> 精华 </NavLink></Button>
              <Button className="button"><NavLink to="/分享" className="g-color-gray a" activeClassName="selected"> 分享 </NavLink></Button>
              <Button className="button"><NavLink to="/问答" className="g-color-gray a" activeClassName="selected"> 问答 </NavLink></Button>
            </nav>
          </div>
          {this._userShow()}
        </div>

        <Menu
          open={this.state.menuShow}
          anchorEl={this.state.anchorEl}
          onClick={this._handleMenuClose}
          id="menuList"
        >
          <MenuItem onClick={this._handleClose.bind(this, 0)}>个人信息</MenuItem>
          <MenuItem onClick={this._handleClose.bind(this, 1)}>文章</MenuItem>
          <MenuItem onClick={this._handleClose.bind(this, 2)}>退出</MenuItem>
        </Menu>
      </header>
    )
  }
  _userShow() {
    return AV.User.current() ?
      (<div className="right">
        <Button className="button buttonw "><NavLink to="/write" className="a" activeClassName="selected"> 发布话题 </NavLink></Button>
        <IconButton className="bell" onClick={this._clickNotice}>
          <span className="tag" style={{ display: this.state.numer ? '' : 'none' }}>{this.state.numer}</span>
          <Bell className="g-color-gray-fill" />
        </IconButton>
        <img className="headimg" onClick={this._clickHead} src={this.state.url} alt="header" />
      </div>) :
      (<div className="right">
        <Button className="button login" onClick={this._clickLogin}>&nbsp;&nbsp;&nbsp;登&nbsp;&nbsp;陆&nbsp;&nbsp;&nbsp;</Button>
      </div>)
  }
  // 跳转提示页面
  _clickNotice(e){
    this.props.history.push('/notice')
  }
  // 点击了头像
  _clickHead(e) {
    const { menuShow } = this.state
    this.setState({
      anchorEl: e.currentTarget,
      menuShow: !menuShow
    })
  }
  // 点击了登陆
  _clickLogin(e) {
    this.props.history.push('/login')
  }
  // 点击 item
  _handleClose(i, e) {
    this.setState({ menuShow: false })
    if (i === 0) {
      this.props.history.push('/me')
      return
    }
    if (i === 1) {
      this.props.history.push('/atricle')
      return
    }
    if (i === 2) {
      AV.User.logOut()
      this.props.history.push('/')
      return
    }
  }
  // 按钮组
  _handleMenuClose() {
    this.setState({ menuShow: false })
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

export default Header
