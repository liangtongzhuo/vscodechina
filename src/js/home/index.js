import React, { Component } from 'react'
import AV from "leancloud-storage"
import AtricleItem from "../component/atricleItem"
import Message from "../component/message"
import Progress from "../component/progress"
import SnackBar from "../component/snackbar"
import Header from "../component/header"

import "./home.css"

class Home extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)
    this.state = { items: [] }
  }
  // 加载一次，Dom 未加载
  componentWillMount() {

  }
  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {
    this._net(this.props.match.params.page)
  }
  _net(page) {
    this.setState({ progressShow: true })
    const query = new AV.Query('Atricle')
    if (page === '精华') {
      query.equalTo('essence', 1)
    } else if (page) {
      query.contains('tag', page)
    }
    query.limit(1000)
    query.descending('createdAt')
    query.include('user')
    query.find().then((items) => {
      this.setState({
        items: items,
        progressShow: false
      });
    }).catch((error) => {
      this._snackBarOpen('讨厌，网络错误了')
      this.setState({ progressShow: false })
    })
  }
  // 渲染 Dom
  render() {
    const atricleItems = this.state.items.map((item, index) =>
      <AtricleItem key={item.id} history={this.props.history} item={item} MessageChildren={Message} />
    )
    return (
      <div>
        <Header history={this.props.history} />
        <div className="g-container home">
          <Progress show={this.state.progressShow} />
          <SnackBar open={this.state.snackBarOpen} content={this.state.content} />
          <div className="left">
            {atricleItems}
          </div>
          <div className="right">
            <div className="card">
              本站主要愿景：<br />
              用于交流微软&nbsp;
              <a className="g-color-gray" href="https://code.visualstudio.com/">Visual Studio Code</a>
              &nbsp;编辑器一系列内容，也可交流任何与计算机相关内容。<br />
              小小提示：<br />
              少年少女们，打开了总要说些什么，战胜你的社交恐惧 :)
          </div>
            <footer className="footer">
              <a className="footer-item" href="http://www.liangtongzhuo.com">梁同桌博客</a>
              <span className="footer-dot"></span>
              <a className="footer-item" href="https://github.com/liangtongzhuo/vscodechina">前端 GitHub 仓库</a>
              <span className="footer-dot"></span>
              <a className="footer-item" href="https://github.com/liangtongzhuo/vscodechina_server">后端 GitHub 仓库</a>
              <span className="footer-dot"></span>
              <a className="footer-item" href="https://leancloud.cn">基于 LeanCloud</a>
            </footer>
          </div>
          <footer className="footer moblie">
            <a className="footer-item" href="http://www.liangtongzhuo.com">梁同桌博客</a>
            <span className="footer-dot"></span>
            <a className="footer-item" href="https://github.com/liangtongzhuo/vscodechina">前端 GitHub 仓库</a>
            <span className="footer-dot"></span>
            <a className="footer-item" href="https://github.com/liangtongzhuo/vscodechina_server">后端 GitHub 仓库</a>
            <span className="footer-dot"></span>
            <a className="footer-item" href="https://leancloud.cn">基于 LeanCloud</a>
          </footer>
        </div >
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
    this._net(nextProps.match.params.page)
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

export default Home
