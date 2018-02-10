import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Snackbar } from 'material-ui'
import "./modal.css"
const modalRoot = document.getElementById('modal-root')

// 遮盖层
class Modal extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)
    this.el = document.createElement('div')
    this._show = this._show.bind(this)
  }
  // 加载一次，Dom 未加载
  componentWillMount() {

  }
  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {
    modalRoot.appendChild(this.el)
  }
  // 提示文字
  _show(content, time = 2000) {
    this.setState({ snackBarOpen: true, content: content })
    setTimeout(() => {
      this.setState({ snackBarOpen: false })
    }, time)

  }
  render() {
    return ReactDOM.createPortal(
      <div>
        <Snackbar className="snackbar"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.open}
          message={this.state.content || ':)'}
        />
      </div>,
      this.el
    )
  }

  // 父组建更新 Props 调用
  componentWillReceiveProps(nextProps) {

  }
  // 更新 Props 或 State 则调用
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  // 在 Dom 更新之前调用 
  componentWillUpdate(nextProps, nextState) {

  }
  // 更新 Dom 结束后调用
  componentDidUpdate() {

  }
  // 拆卸调用
  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }
}

const modal = () => {
  return new Modal()
}

export default modal
