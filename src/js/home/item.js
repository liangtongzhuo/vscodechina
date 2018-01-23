import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'material-ui'
// import AV from "leancloud-storage"
import TextareaAutosize from 'react-autosize-textarea'
import { Bottom, Good, Message, Collection, Share, Reply, MessageGood } from "./svg.js"

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
            {this.props.item.get('data')}
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
            {/*  留言 */}
            <div>
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
            </div>
            {/*  /留言 */}

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

export default Item
