import React, { Component } from 'react'
import md5 from 'blueimp-md5'
import AV from "leancloud-storage"
import Progress from "../component/progress"
import SnackBar from "../component/snackbar"
import Header from "../component/header"
import AtricleItem from "../component/atricleItem"
import Message from "../component/message"
import AtircleMessage from "../component/atircleMessage"

import "./atricle.css"


class Oauth extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)

    const { userId } = this.props.match.params
    this.state = { userId, items: [], messages: [] }
  }
  // 加载一次，Dom 未加载
  componentWillMount() {
    const { userId } = this.state

    // 查询文章
    this.setState({ progressShow: true })
    const query = new AV.Query('Atricle')
    if (!userId) {
      const url = AV.User.current().get('avatar') || 'https://secure.gravatar.com/avatar/' + md5(AV.User.current().getEmail()) + '?s=180*180&d=identicon&r=g'
      const githubUrl = AV.User.current().get('github_url')
      const blog = AV.User.current().get('blog')
      const bio = AV.User.current().get('bio')
      const name = AV.User.current().get('name')

      this.setState({
        url, githubUrl, blog, bio, name
      })

      query.equalTo('user', AV.User.current())
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

      // 查询留言
      const messages = new AV.Query('Message')
      messages.limit(20)
      messages.equalTo('user', AV.User.current())
      messages.addDescending('like')
      messages.addDescending('createdAt')
      messages.include('user')
      messages.include('atricle')
      messages.find().then((messages) => {
        this.setState({
          messages: messages
        })
      }).catch((error) => {
        this._snackBarOpen('讨厌，网络错误了')
        this.setState({ progressShow: false })
      })

    } else {

    }

  }
  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {

  }
  // 渲染 Dom
  render() {
    const items = this.state.items.map((item, index) =>
      <AtricleItem key={item.id} history={this.props.history} item={item} MessageChildren={Message} />
    )

    const messages = this.state.messages.map((item, index) =>
      <AtircleMessage history={this.props.history}  key={item.id} item={item} />
    )
    return (
      <div>
        <Header history={this.props.history} />
        <div className="g-container atricle">
          <Progress show={this.state.progressShow} />
          <SnackBar open={this.state.snackBarOpen} content={this.state.content} />
          <div className="acontent">
            <div className="head">
              <div className="usercover-image" />
              <div className="info">
                <div className="div-user-image">
                  <img src={this.state.url} alt="头像" />
                </div>
                <h2 className="name">
                    {this.state.name}
                <a style={{ display: this.state.githubUrl ? '' : 'none' }}
                    href={this.state.githubUrl}>
                    GitHub
                </a>
                  <a style={{ display: this.state.blog ? '' : 'none' }}
                    href={this.state.blog}>
                    个人网页
                </a>
                  <div className="bio">
                    {this.state.bio}
                  </div>
                </h2>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="atriclecart">
              <div className="right-title">个人成就</div>
              <div className="right-item">发表文章 {this.state.items.length} 篇</div>
              <div className="right-item">留言 {this.state.messages.length} 条</div>
            </div>
            <div className="atriclecart" style={{ display: messages.length !== 0 ? '' : 'none' }}>
              {messages}
            </div>
          </div>
          <div className="left">
            <div className="cart" style={{ display: items.length !== 0 ? '' : 'none' }}>
              {items}
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


export default Oauth
