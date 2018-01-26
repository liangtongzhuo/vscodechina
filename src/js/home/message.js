import React, { Component } from 'react'
import { Button } from 'material-ui'
import AV from "leancloud-storage"
import TextareaAutosize from 'react-autosize-textarea'
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
    query.find().then((messages) => {
      this.setState({
        messages: messages,
        progressShow: false
      });
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
            <TextareaAutosize onChange={this._textarea} placeholder="留言的人运气不会差" />
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
    }).catch((error) => {
      this.setState({ progressShow: false })
      this._snackBarOpen('讨厌，网络错误了')
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messagesShow === true) {
      this._net()
    }
  }
}

export default MessageComponent


//https://secure.gravatar.com/avatar/3a1e5cac75ad5e0a710e828fa2f433bd?s=50*50