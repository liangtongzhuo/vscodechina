import React, { Component } from 'react'
import { Button } from 'material-ui'
import AV from "leancloud-storage"
import TextareaAutosize from 'react-autosize-textarea'
import ReactMarkdown from 'react-markdown'
import md5 from 'blueimp-md5'
import "github-markdown-css"
import { Reply, MessageGood } from "./svg.js"
import Progress from "../component/progress.js"
import SnackBar from "../component/snackbar.js"

class MessageComponent extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)
    this.state = { progressShow: false, snackBarOpen: false, messages: [] }
    this._textarea = this._textarea.bind(this)
    this._clickSend = this._clickSend.bind(this)
    this._net = this._net.bind(this)
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
    query.equalTo('atricle', this.props.item);
    query.descending('createdAt')
    query.include('user')
    query.find().then((messages) => {
      messages = messages.map(item => {
        if (item.get('likeUsers') && item.get('likeUsers').split(',').indexOf(AV.User.current().id) !== -1) {
          item.likeBool = true
        }
        return item
      })

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
    const messages = this.state.messages.map((item, index) =>
      <div key={index}>
        <div className="head">
          <img className="headimg" src={'https://secure.gravatar.com/avatar/' + md5(item.get('user').get('email')) + '?s=140*140&d=identicon&r=g'} alt="头像" />
          <a>梁萌萌</a>
          <span>五天前</span>
        </div>
        <ReactMarkdown source={item.get('message')} className="markdown-body content" escapeHtml={false} />
        <div className="messagetool">
          <Button className={item.likeBool ? 'button buttonColor' : 'button '} onClick={this._clickGood.bind(this, index)}>
            <MessageGood className={item.likeBool ? 'g-color-white-fill' : 'g-color-gray-fill'} />&nbsp; {item.get('like')} 赞
          </Button>
          <Button className="button" onClick={this._XXX}>
            <Reply className="g-color-gray-fill" />&nbsp; 回复
          </Button>
        </div>
      </div>)

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
            <Button className="" onClick={this._clickSend}>
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
    const message = this.state.message
    if (!message || message.length === 0) {
      this._snackBarOpen('哎～，你怎么不说话')
      return
    }
    this.setState({ progressShow: true })
    const Message = AV.Object.extend('Message')
    const mes = new Message()
    mes.set('message', message)
    mes.set('atricle', this.props.item)
    mes.set('user', AV.User.current())
    mes.save().then(mess => {
      this.setState({ progressShow: false, message: '' })
      this._snackBarOpen('欧耶～发送成功')
      this._net()
    }).catch((error) => {
      this.setState({ progressShow: false })
      this._snackBarOpen('讨厌，网络错误了')
    });


    // 文章增加留言数字
    AV.Cloud.run('atricleMessage', { id:this.props.item.id }).then(result => {
      // console.log(result)
    }).catch(err => {
      console.log(err)
    })

  }
  // 点赞
  _clickGood(index, e) {
    const messages = this.state.messages
    const bool = messages[index].likeBool
    const like = messages[index].get('like')
    messages[index].likeBool = !bool

    if (bool) {
      messages[index].set('like', like + 1);
    } else {
      messages[index].set('like', like - 1);
    }
    this.setState({ messages })
    const id = this.state.messages[index].id
    AV.Cloud.run('messageLike', { id }).then(result => {
      // console.log(result)
    }).catch(err => {
      this._snackBarOpen('讨厌，网络错误了')
      console.log(err)
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.messagesShow === true) this._net()
  }
}

export default MessageComponent


//https://secure.gravatar.com/avatar/3a1e5cac75ad5e0a710e828fa2f433bd?s=50*50