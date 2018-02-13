/**
 * 担任页面路由
 */
import React, { Component } from 'react'
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom'
import Home from "./home"
import Write from "./write"
import Login from "./login"
import Me from "./me"
import Read from "./read"
import Atricle from "./atricle"
import Notice from "./notice"

class App extends Component {
  render() {
    return (
      <Router hashType="hashbang">
        <div>
          <Switch>
            {/* 登陆 */}
            <Route exact path="/login" component={Login} />
            {/* 自己信息设置 */}
            <Route exact path="/me" component={Me} />
            {/* 通知页面 */}
            <Route exact path="/notice" component={Notice} />            
            {/* 单文章展示 */}
            <Route exact path="/read/:atricleId?" component={Read} />
            {/* 个人文章展示 */}
            <Route exact path="/atricle/:userId?" component={Atricle} />
            {/* 写文章界面 */}
            <Route exact path="/write/:atricleId?" component={Write} />
            {/* 主页文章列表 */}
            <Route exact path="/:page?" component={Home} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
