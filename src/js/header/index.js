import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Button, IconButton } from 'material-ui'
import AV from "leancloud-storage"

import "./header.css"
import { Bell } from "./svg.js"

class Header extends Component {
  constructor(props, context) {
    super(props)
    this.state = {}
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
          <Link className="logo" to="/"> VSCodeChina </Link>
          <nav>
            <Button className="button"><NavLink exact to="/" className="g-color-gray a" activeClassName="selected"> 全部 </NavLink></Button>
            <Button className="button"><NavLink to="/essence" className="g-color-gray a" activeClassName="selected"> 精华 </NavLink></Button>
            <Button className="button"><NavLink to="/shard" className="g-color-gray a" activeClassName="selected"> 分享 </NavLink></Button>
            <Button className="button"><NavLink to="/issue" className="g-color-gray a" activeClassName="selected"> 问答 </NavLink></Button>
          </nav>
          {this._userShow()}
        </div>
      </header>
    )
  }
  _userShow() {
    return AV.User.current() ?
      (<div className="right">
        <Button className="button"><NavLink to="/write/create" className="a" activeClassName="selected"> 发布话题 </NavLink></Button>
        <IconButton className="bell">
          <Bell className="g-color-gray-fill" />
        </IconButton>
        <img className="headimg" src="http://ac-2my9ah1h.clouddn.com/d9908c3a09d563feb9aa.jpg" alt="header" />
      </div>) :
      (<div className="right">
        <Button className="button"><NavLink to="/other/login" className="a" activeClassName="selected">&nbsp;&nbsp;&nbsp;登&nbsp;&nbsp;陆&nbsp;&nbsp;&nbsp;</NavLink></Button>
      </div>)
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
