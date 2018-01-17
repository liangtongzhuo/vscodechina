import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'material-ui'
import AV from "leancloud-storage"
import TextareaAutosize from 'react-autosize-textarea'
import "./home.css"
import { Bottom, Good, Message, Collection, Share, Reply, MessageGood } from "./svg.js"

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
    this._net()
  }
  _net() {
    const query = new AV.Query('Atricle')
    query.limit(1000)
    query.descending('createdAt')
    // query.contains('tag', decodeURI()) //注意转码
    query.find().then((items) => {
      this.setState({
        items: items
      });
    }, function (error) {
      console.error(error)
    })
  }
  // 渲染 Dom
  render() {
    // console.log('-----', this.props.match);
    const items = this.state.items.map((item, index) =>
      <Item key={index} item={item} />
    )
    return (
      <div className="g-container home">
        <div className="left">
          {items}
        </div>
        <div className="right">
          <div className="card">
            提示<br />
            用于 Visual Studio Code
          </div>
        </div>
      </div >
    )
  }
  // 父组建更新 Props 调用
  componentWillReceiveProps(nextProps) {
  }
  // 更新 Props 或 State 则调用
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.match.params.page !== nextProps.match.params.page) {
      this._net()
    }
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

class Item extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)
  }

  render() {
    return (
      <div className="item">
        {/* 简介 */}
        <div>
          <span className="span">{this.props.item.get('tag')}</span>
        </div>
        {/* 用户信息 */}
        <div className="user">
          <img className="headimg" src="http://ac-2my9ah1h.clouddn.com/d9908c3a09d563feb9aa.jpg" alt="header" />
          <Link className="name" to="/"> 梁同桌 </Link>
          <Link className="github" to="/"> GitHub </Link>
        </div>
        {/* 标题 */}
        <h1 className="h1">{this.props.item.get('title')}</h1>
        {/* 内容 */}
        <div className="content">
          <div className="img" style={{ backgroundImage: "url(http://ac-2my9ah1h.clouddn.com/e9daf54e67c3221e9e7e.jpg)" }}> </div>
          <div className="info">
            椎名林檎今年的演唱會「百鬼夜行」藍光碟：日本亞馬遜：341 人民幣（5850 日元），剛出的時候更貴，400 多人民幣中國：45 人民幣中國的，說的當然是盜版。在中國當然也可以買正版，問題：社會風氣普遍認爲買實體唱片（無論正版盜版）是件傻事，一件落後於時代的事。
              <Button className="button" onClick={this._clickRead}>
              阅读全文 &nbsp;
                  <Bottom className="g-color-gray-fill" />
            </Button>
          </div>
        </div>
        {/* 按钮工具 */}
        <div className="tool">
          <Button className="button" onClick={this._clickGood}>
            <Good className="g-color-gray-fill" />&nbsp; 100 赞
              </Button>

          <Button className="button" onClick={this._clickMessage}>
            <Message className="g-color-gray-fill" />&nbsp; 30 条评论
              </Button>

          <Button className="button" onClick={this._clickCollection}>
            <Collection className="g-color-gray-fill" />&nbsp; 收藏
              </Button>

          <Button className="button" onClick={this._clickShare}>
            <Share className="g-color-gray-fill" />&nbsp; 分享
              </Button>
        </div>

        <div className="messagesList">
          <div className="messagesCount">3 条留言</div>
          <div className="messages">
            <div className="head">
              <img className="headimg" src="http://ac-2my9ah1h.clouddn.com/d9908c3a09d563feb9aa.jpg" alt="头像" />
              <a>梁萌萌</a>
              <span>五天前</span>
            </div>
            <div className="content">真的超级萌萌</div>
            <div className="messagetool">
              <Button className="button" onClick={this._clickGood}>
                <MessageGood className="g-color-gray-fill" />&nbsp; 100 赞
              </Button>
              <Button className="button" onClick={this._clickGood}>
                <Reply className="g-color-gray-fill" />&nbsp; 回复
              </Button>
            </div>
            <div className="replyMessage">
              <TextareaAutosize placeholder="留言的人运气不会差" />
              <Button className="" onClick={this._clickGood}>
                发送
              </Button>
            </div>
          </div>

        </div>
      </div>
    )
  }

  // 阅读全文
  _clickRead() {
    console.log('-----阅读')
  }
  // 点赞
  _clickGood() {
    console.log('-----点赞')
  }
  // 展开评论
  _clickMessage() {
    console.log('-----展开评论')
  }
  // 收藏
  _clickCollection() {
    console.log('-----收藏')
  }
  // 分享
  _clickShare() {
    console.log('-----分享')
  }
}

export default Home
