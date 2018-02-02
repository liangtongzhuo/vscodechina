/**
 * 担任页面路由
 */
import React, { Component } from 'react'
import {
  BrowserRouter as Router, Route
} from 'react-router-dom'
import Header from "./header"
import Home from "./home"
import Write from "./write"
import Login from "./login"

class App extends Component {
  render() {
    return (
      <Router>
          <div>
            {/* 头 */}
            <Route exact path="/:page?" component={Header} />
            {/* 文章列表 */}
            <Route exact path="/:page?" component={Home} />
            {/* 编辑页面 */}
            <Route exact path="/write/create/:id?" component={Write} />
            {/* 登陆 */}
            <Route exact path="/other/login" component={Login} />
          </div>
      </Router>
    );
  }
}



export default App