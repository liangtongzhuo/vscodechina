import React, { Component } from 'react'
import { Button, List, ListItem, ListItemText, Menu, MenuItem } from 'material-ui'
import AV from "leancloud-storage"
import ReactMarkdown from 'react-markdown'
import Progress from "../component/progress"
import SnackBar from "../component/snackbar"

import "github-markdown-css"
import "./write.css"

const dataContent = '> 少年少女们，打开了总要说些什么，战胜你的社交恐惧 :)'

class Write extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)
    this.state = { title: '标题', data: dataContent }

    this._onChangeContent = this._onChangeContent.bind(this)
    this._onChangeTitle = this._onChangeTitle.bind(this)
    this._clickSave = this._clickSave.bind(this)
    this._clickUpFile = this._clickUpFile.bind(this)
    this._clickTextarea = this._clickTextarea.bind(this)
    this._blurTextarea = this._blurTextarea.bind(this)
  }
  // 加载一次，Dom 未加载
  componentWillMount() {

  }
  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {
    if (!AV.User.current()) {
      this.props.history.push('/')
    }
  }
  _onChangeTitle(e) {
    this.setState({ title: e.target.value })

  }
  _onChangeContent(e) {
    this.setState({ data: e.target.value })
  }
  _clickSave(e) {
    const { title, data } = this.state;
    if (title.length === 0) {
      this._snackBarOpen('没有标题，我是不同意你上传的，哼～')
      return
    }
    if (data === dataContent) {
      this._snackBarOpen('没有内容，又骗我～')
      return
    }

    this.setState({ progressShow: true })
    var Atricle = AV.Object.extend('Atricle')
    var atricle = new Atricle()
    atricle.set('title', title)
    atricle.set('data', data)
    atricle.set('user', AV.User.current())
    // 新建一个 ACL 实例
    const acl = new AV.ACL()
    acl.setPublicReadAccess(true)
    acl.setWriteAccess(AV.User.current(),true)
    atricle.save().then(todo => {
      this.setState({ progressShow: false })
      this.props.history.push('/')
    }).catch((error) => {
      this.setState({ progressShow: false })
      this._snackBarOpen('很大概率是网路问题，抱歉')
    })
  }
  // 选择图片后上传
  _clickUpFile(e) {
    if (this.refs.upFile.files[0].size / 1000 / 1000 > 1) {
      this._snackBarOpen('图片大于 1 M，搬不动～')
      return;
    }
    this.setState({ progressShow: true })
    const reader = new FileReader()
    reader.readAsDataURL(this.refs.upFile.files[0])
    const self = this
    reader.onload = function () {

      const file = new AV.File(AV.User.current().id, self._dataToBlob(this.result))
      file.save().then(object => {
        const data = self.state.data
        self.setState({
          data: data + `
![](` + object.attributes.url + `)`,
          progressShow: false
        })
      }).catch(error => {
        self.setState({ progressShow: false })
        self._snackBarOpen('图片上传失败')
      })
    }
  }
  // dataURL 转 Blob
  _dataToBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }
  _selectClick(index) {
    console.log(index)
  }
  // 点击了 清空 textarea 
  _clickTextarea() {
    if (this.state.data.length === dataContent.length && this.state.data === dataContent) {
      this.setState({
        data: ''
      })
    }
  }
  // 取消了 textarea
  _blurTextarea(e) {
    if (e.target.value.length === 0) {
      this.setState({ data: dataContent })
      return
    }
  }
  // 渲染 Dom
  render() {
    return (
      <div className="write">
        <Progress show={this.state.progressShow} />
        <SnackBar open={this.state.snackBarOpen} content={this.state.content} />
        <div className="head">
          <input onChange={this._onChangeTitle} placeholder="输入文章标题..." maxLength="80" />
          <div>
            <Button className="button" onClick={this._clickSave}>保存</Button>
            <div className="upfile" >上传图片<input ref="upFile" type="file" id="img" onChange={this._clickUpFile} /></div>
            <SelectListMenu _selectClick={this._selectClick} />
          </div>
        </div>
        <div className="content">
          <div className="wr">
            <textarea onChange={this._onChangeContent} value={this.state.data} onClick={this._clickTextarea} onBlur={this._blurTextarea}></textarea>
          </div>
          <ReactMarkdown source={this.state.data} className="markdown-body show" escapeHtml={false} />
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

const options = [
  '分享',
  '问答'
]

class SelectListMenu extends Component {

  constructor(props, context) {
    super(props)
    this.state = {
      anchorEl: null,
      selectedIndex: 1
    }
  }

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuItemClick = (event, index) => {
    this.props._selectClick(index)
    this.setState({ selectedIndex: index, anchorEl: null })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl } = this.state
    return (
      <div className="menu">
        <List>
          <ListItem
            aria-haspopup="true"
            aria-controls="lock-menu"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary="选择类型"
              secondary={options[this.state.selectedIndex]}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}


export default Write
