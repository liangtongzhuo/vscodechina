import React, { Component } from 'react'
import md5 from 'blueimp-md5'
import AV from "leancloud-storage"
import Progress from "../component/progress"
import SnackBar from "../component/snackbar"
import Header from "../component/header"
import AtricleItem from "../component/atricleItem"
import Message from "../component/message"
import "./atricle.css"


class Oauth extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)

    const { atricleId } = this.props.match.params
    this.state = { atricleId, items: [] }
  }
  // 加载一次，Dom 未加载
  componentWillMount() {
    const {atricleId} = this.state

    // 查询文章
    this.setState({ progressShow: true })
    const query = new AV.Query('Atricle')
    if (!atricleId) {
      const url = AV.User.current().get('avatar') || 'https://secure.gravatar.com/avatar/' + md5(AV.User.current().getEmail()) + '?s=180*180&d=identicon&r=g'
      const githubUrl = AV.User.current().get('github_url')
      const blog = AV.User.current().get('blog')
      const bio = AV.User.current().get('bio')
      this.setState({
        url, githubUrl, blog, bio
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
    } else {

    }

  }
  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {

  }
  // 渲染 Dom
  render() {
    const items = this.state.items.map((item, index) =>
      <AtricleItem key={index} item={item} MessageChildren={Message} />
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
                  梁同桌
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
            <div className="cart">
              <div className="right-title">个人成就</div>
              <div className="right-item">发表文章 20 篇</div>
              <div className="right-item">留言 20 条</div>
            </div>
          </div>
          <div className="left">
            {items}
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
