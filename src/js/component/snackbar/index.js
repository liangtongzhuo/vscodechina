import React, { Component } from 'react'
import { Snackbar } from 'material-ui'

class SnackBar extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)

  }
  // 加载一次，Dom 未加载
  componentWillMount() {

  }
  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {

  }

  render() {
    return (
      <Snackbar className="snackbar"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={this.props.open}
        message={this.props.content || ':)'}
      />
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


export default SnackBar
