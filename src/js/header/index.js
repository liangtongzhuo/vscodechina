import React, { Component } from 'react'
import {
  NavLink,
  Link
} from 'react-router-dom'
import { Button, IconButton } from 'material-ui'

import "./header.css"
import { Bell } from "./svg.js"

class Header extends Component {
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
          <div className="right">
            <Button className="button"><NavLink to="/write/create" className="a" activeClassName="selected"> 发布话题 </NavLink></Button>
            <IconButton className="bell">
              <Bell className="g-color-gray-fill" />
            </IconButton>
            <img className="headimg" src="http://ac-2my9ah1h.clouddn.com/d9908c3a09d563feb9aa.jpg" alt="header" />
          </div>
        </div>
      </header>
    )
  }
}

export default Header
