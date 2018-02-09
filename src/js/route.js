/**
 * 担任页面路由
 */
import React, { Component } from 'react'
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom'
import Header from "./header"
import Home from "./home"
import Write from "./write"
import Login from "./login"
import Me from "./me"
import Atricle from "./atricle"
import Oauth from "./oauth"



class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* 头 */}
          <Route exact path="/:page?" component={Header} />
          <Switch>
            {/* 自己信息设置 */}
            <Route exact path="/me" component={Me} />
            <Route exact path="/atricle/:atricleId?" component={Atricle} />
            {/* 文章列表 */}
            <Route exact path="/:page?" component={Home} />
          </Switch>
          {/* 写文章界面 */}
          <Route exact path="/other/write/:id?" component={Write} />
          {/* 登陆 */}
          <Route exact path="/other/login" component={Login} />
          {/* 第三方验证 */}
          <Route exact path="/other/oauth" component={Oauth} />          
        </div>
      </Router>
    );
  }
}



export default App
