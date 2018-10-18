import React, { Component } from 'react'
import { Button } from 'material-ui'
import AV from "leancloud-storage"
import TextareaAutosize from 'react-autosize-textarea'
import ReactMarkdown from 'react-markdown'
import md5 from 'blueimp-md5'
import "github-markdown-css"
import { Reply, MessageGood } from "../svg.js"
import Progress from "../progress"
import SnackBar from "../snackbar"
import "./message.css"

class MessageComponent extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)
    this.state = { progressShow: false, snackBarOpen: false, messages: [] }
    this._textarea = this._textarea.bind(this)
    this._clickSend = this._clickSend.bind(this)
    this._net = this._net.bind(this)
    this._getDateDiff = this._getDateDiff.bind(this)
    this._clickReply = this._clickReply.bind(this)
  }
  // 加载一次，Dom 未加载
  componentWillMount() {

  }
  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {
    this._net()
  }
  _net() {
    this.setState({ progressShow: true })
    const query = new AV.Query('Message')
    query.equalTo('atricle', this.props.item)
    query.addDescending('like')
    query.addDescending('createdAt')
    query.include('user')
    query.find().then((messages) => {
      if(AV.User.current()){
        messages = messages.map(item => {
          if (item.get('likeUsers') && item.get('likeUsers').split(',').indexOf(AV.User.current().id) !== -1) {
            item.likeBool = true
          }
          return item
        })
      }
      this.setState({
        messages: messages,
        progressShow: false
      })
    }).catch((error) => {
      this._snackBarOpen('讨厌，网络错误了')
      this.setState({ progressShow: false })
    })
  }
  _textarea(e) {
    this.setState({ message: e.target.value })
  }
  render() {
    const messages = this.state.messages.map((item, index) => {
      const headUrl = item.get('user').get('avatar') || 'https://secure.gravatar.com/avatar/' + md5(item.get('user').get('email')) + '?s=140*140&d=identicon&r=g'
      return (<div key={index}>
        <div className="head">
          <img className="headimg" src={headUrl} alt="头像" />
          <a>{item.get('user').get('name')}</a>
          <span>{this._getDateDiff(item.createdAt)}</span>
        </div>
        <ReactMarkdown source={item.get('message')} className="markdown-body content" escapeHtml={false} />
        <div className="messagetool">
          <Button className={item.likeBool ? 'button buttonColor' : 'button '} onClick={this._clickGood.bind(this, index)}>
            <MessageGood className={item.likeBool ? 'g-color-white-fill' : 'g-color-gray-fill'} />&nbsp; {item.get('like')} 赞
          </Button>
          <Button className="button" onClick={this._clickReply}>
            <Reply className="g-color-gray-fill" />&nbsp; 回复
          </Button>
        </div>
      </div>)
    })

    return (
      <div className="messagesList" style={{ display: this.props.messagesShow ? '' : 'none' }}>
        <Progress show={this.state.progressShow} />
        <SnackBar open={this.state.snackBarOpen} content={this.state.content} />
        <div className="messagesCount">{this.state.messages.length} 条留言</div>
        <div className="messages">
          {/*  留言 */}
          <div>
            {messages}
          </div>
          {/*  /留言 */}
          <div className="replyMessage">
            <TextareaAutosize value={this.state.message} onChange={this._textarea} placeholder="留言的人运气不会差" />
            <Button onClick={this._clickSend}>
              发送
          </Button>
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
  // 发送留言
  _clickSend(e) {
    if (!AV.User.current()) {
      this._snackBarOpen('哎～，你忘记登陆了耶')
      return
    }

    const message = this.state.message
    if (!message || message.length === 0) {
      this._snackBarOpen('哎～，你怎么不说话')
      return
    }
    this.setState({ progressShow: true })
    // 增加留言
    AV.Cloud.run('atricleMessage', {
      message: message,
      atricleId: this.props.item.id
    }).then(result => {
      this.setState({ progressShow: false, message: '' })
      this._snackBarOpen('欧耶～发送成功')
      this._net()
      this.props.messageSend()
    }).catch(err => {
      this.setState({ progressShow: false })
      this._snackBarOpen('讨厌，网络错误了')
      console.log(err)
    })

  }
  // 点赞
  _clickGood(index, e) {
    if (!AV.User.current()) {
      this._snackBarOpen('哎～，你忘记登陆了耶')
      return
    }

    const messages = this.state.messages
    const bool = messages[index].likeBool
    const like = messages[index].get('like')
    messages[index].likeBool = !bool
    if (bool) {
      messages[index].set('like', like - 1);
    } else {
      messages[index].set('like', like + 1);
    }
    this.setState({ messages })
    const id = this.state.messages[index].id
    AV.Cloud.run('messageLike', { id }).then(result => {
    }).catch(err => {
      this._snackBarOpen('讨厌，网络错误了')
      console.log(err)
    })
  }
  // 回复
  _clickReply(e){
    this._snackBarOpen('讨厌，此功能还没写完 = =')
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.messagesShow === true) this._net()
  }
  _getDateDiff(dateTimeStamp) {
    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24
    const month = day * 30
    const now = new Date().getTime()
    const diffValue = now - dateTimeStamp
    if (diffValue < 0) return
    const monthC = diffValue / month
    const weekC = diffValue / (7 * day)
    const dayC = diffValue / day
    const hourC = diffValue / hour
    const minC = diffValue / minute

    if (monthC >= 1) {
      return parseInt(monthC, 10) + "月前"
    }
    else if (weekC >= 1) {
      return parseInt(weekC, 10) + "周前"
    }
    else if (dayC >= 1) {
      return parseInt(dayC, 10) + "天前"
    }
    else if (hourC >= 1) {
      return parseInt(hourC, 10) + "小时前"
    }
    else if (minC >= 1) {
      return parseInt(minC, 10) + "分钟前"
    } else {
      return "刚刚"
    }
  }
}

export default MessageComponent


//https://secure.gravatar.com/avatar/3a1e5cac75ad5e0a710e828fa2f433bd?s=50*50