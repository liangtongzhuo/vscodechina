import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'material-ui'
import marked from 'marked' //解析 markdown
import AV from "leancloud-storage"
import md5 from 'blueimp-md5'
import { Bottom, Good, Message, Collection, Share } from "./svg.js"
import ReactMarkdown from 'react-markdown'
import MessageComponent from './message.js'

import "github-markdown-css"

class Item extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)
    const title = props.item.get('title')
    //从 marked 提取文本与图片地址
    const markdown = marked(props.item.get('data'))
    const data = markdown.replace(/<[^>]+>/g, '').replace(/&.+?;/g, ' ').substring(0, 200) + '...'
    const imgObj = props.item.get('data').match(/!\[(.*?)\]\((.*?)\)/) || []
    const imgUrl = imgObj.length >= 2 ? imgObj[2] : ''

    let likeBool = false;
    if (props.item.get('likeUsers') && props.item.get('likeUsers').split(',').indexOf(AV.User.current().id) !== -1) {
      likeBool = true
    }
    const messageCount = this.props.item.get('messageCount')

    this.state = { title, data, imgUrl, markSource: props.item.get('data'), like: props.item.get('like'), likeBool, messageCount }

    this._clickRead = this._clickRead.bind(this)
    this._readInfo = this._readInfo.bind(this)
    this._clickMessage = this._clickMessage.bind(this)
    this._clickGood = this._clickGood.bind(this)
    this._messageSend = this._messageSend.bind(this)
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
          <div className="left">
            <img className="headimg" src={'https://secure.gravatar.com/avatar/' + md5(this.props.item.get('user').get('email')) + '?s=140*140&d=identicon&r=g'} alt="header" />
            <Link className="name" to="/"> 梁同桌 </Link>
            <Link className="github" to="/"> GitHub </Link>
          </div>
          <div className="time">
            {this._getDateDiff( this.props.item.createdAt)}
          </div>
        </div>
        {/* 标题 */}
        <h1 className="h1">{this.state.title}</h1>
        {/* 内容 */}
        <div className="content">
          <div className="img" style={{ display: this.state.imgUrl && !this.state.showRead ? '' : 'none', backgroundImage: "url(" + this.state.imgUrl + ")" }}> </div>
          {this._readInfo()}
        </div>
        {/* 按钮工具 */}
        <div className="tool">
          <Button className={this.state.likeBool ? "button buttonBlue" : "button"} onClick={this._clickGood}>
            <Good className={this.state.likeBool ? "g-color-white-fill" : "g-color-gray-fill"} />&nbsp; {this.state.like} 赞
              </Button>

          <Button className="button" onClick={this._clickMessage}>
            <Message className="g-color-gray-fill" />&nbsp; {this.state.messagesShow ? '收起评论' : this.state.messageCount + ' 条评论'}
          </Button>

          <Button className="button" onClick={this._clickCollection}>
            <Collection className="g-color-gray-fill" />&nbsp; 收藏
              </Button>

          <Button className="button" onClick={this._clickShare}>
            <Share className="g-color-gray-fill" />&nbsp; 分享
              </Button>
        </div>
        <MessageComponent messagesShow={this.state.messagesShow} item={this.props.item} messageSend={this._messageSend} />
      </div>
    )
  }
  // 设置是否展开
  _readInfo() {
    if (this.state.showRead) {
      return (<div className="info">
        <ReactMarkdown source={this.state.markSource} className="markdown-body markdown" escapeHtml={false} />
        <div className="open">
          <Button className="button read" onClick={this._clickRead}>
            &nbsp;收&nbsp;起&nbsp;
        </Button>
        </div>
      </div>)
    } else {
      return (<div className="info" onClick={this._clickRead}>
        {this.state.data}
        <Button className="button read" >
          阅读全文 &nbsp;
            <Bottom className="g-color-gray-fill" />
        </Button>
      </div>)
    }
  }
  _messageSend(e) {
    const messageCount = this.state.messageCount + 1
    this.setState({ messageCount })
  }
  // 阅读全文
  _clickRead(e) {
    const showRead = !this.state.showRead
    this.setState({ showRead })
  }
  // 点赞
  _clickGood(e) {
    const likeBool = !this.state.likeBool
    let like = likeBool ? this.state.like + 1 : this.state.like - 1
    this.setState({ likeBool, like })
    const id = this.props.item.id
    AV.Cloud.run('atricleLike', { id }).then(result => {
    }).catch(err => {
      this._snackBarOpen('讨厌，网络错误了')
      console.log(err)
    })
  }
  // 展开评论
  _clickMessage(e) {
    const messagesShow = !this.state.messagesShow
    this.setState({ messagesShow })
  }
  // 收藏
  _clickCollection(e) {
    console.log('-----收藏')
  }
  // 分享
  _clickShare(e) {
    console.log('-----分享')
  }
  _getDateDiff(dateTimeStamp) {
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const now = new Date().getTime();
    const diffValue = now - dateTimeStamp;
    if (diffValue < 0) return;
    const monthC = diffValue / month;
    const weekC = diffValue / (7 * day);
    const dayC = diffValue / day;
    const hourC = diffValue / hour;
    const minC = diffValue / minute;

    if (monthC >= 1) {
      return parseInt(monthC, 10) + "月前";
    }
    else if (weekC >= 1) {
      return parseInt(weekC, 10) + "周前";
    }
    else if (dayC >= 1) {
      return parseInt(dayC, 10) + "天前";
    }
    else if (hourC >= 1) {
      return parseInt(hourC, 10) + "小时前";
    }
    else if (minC >= 1) {
      return parseInt(minC, 10) + "分钟前";
    } else {
      return "刚刚";
    }

  }
}

export default Item


//https://secure.gravatar.com/avatar/3a1e5cac75ad5e0a710e828fa2f433bd?s=50*50