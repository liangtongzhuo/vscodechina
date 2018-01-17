import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { Button } from 'material-ui'
// import AV from "leancloud-storage"
import ReactMarkdown from 'react-markdown'

import "github-markdown-css"
import "./write.css"

class Write extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)
    this.state = { title: '标题', data: '内容' }

    this._onChangeContent = this._onChangeContent.bind(this)
    this._onChangeTitle = this._onChangeTitle.bind(this)
    this._clickSave = this._clickSave.bind(this)
    this._clickUpFile = this._clickUpFile.bind(this)
  }
  // 加载一次，Dom 未加载
  componentWillMount() {

  }
  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {

  }
  _onChangeTitle(e) {
    this.setState({ title: e.target.value })
  }
  _onChangeContent(e) {
    this.setState({ data: e.target.value })
  }
  _clickSave(e) {
    // var Atricle = AV.Object.extend('Atricle');
    // var atricle = new Atricle();
    // atricle.set('title', '工程师周会');
    // atricle.set('content', '每周工程师会议，周一下午2点');
    // atricle.save().then(function (todo) {
    //   // 成功保存之后，执行其他逻辑.
    // }, function (error) {
    //   // 异常处理
    // });
  }
  _clickUpFile(e) {

  }
  // 渲染 Dom
  render() {
    return (
      <div className="write">
        <div className="head">
          <input onChange={this._onChangeTitle} placeholder="输入文章标题..." maxLength="80" />
          <div>
            <Button className="button" onClick={this._clickSave}>保存</Button>
            <div className="upfile" onClick={this._clickUpFile}>上传图片<input type="file" id="img" /></div>
          </div>
        </div>
        <div className="content">
          <div className="wr">
            <textarea onChange={this._onChangeContent} placeholder="请输入内容" ></textarea>
          </div>
          <ReactMarkdown source={this.state.data} className="markdown-body show" escapeHtml={false} />

        </div>
      </div>
    )
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


export default Write
