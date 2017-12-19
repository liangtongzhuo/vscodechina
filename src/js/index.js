/**
 * 担任页面路由
 */
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import Header from "./header"
import Home from "./home"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/:page?" component={Home} />
        </div>
      </Router>
    );
  }
}



export default App;
