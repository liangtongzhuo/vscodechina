import React, { Component } from 'react'
import "./atircleMessage.css"

class AtircleMessage extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)

    const { item } = this.props
    const AtricleTitle = item.get('atricle').get('title')
    const AtricleId = item.get('atricle').id
    const message = item.get('message')
    const time = this._getDateDiff(item.createdAt)

    this.state = { message, AtricleId, AtricleTitle, time }
    
    this._clickSkitRead = this._clickSkitRead.bind(this)    
    this._getDateDiff = this._getDateDiff.bind(this)
  }

  render() {
    return (<div className="atircleMessage g-color-gray" onClick={this._clickSkitRead}>
      在 &nbsp;<a className="color">{this.state.AtricleTitle}</a>
      &nbsp;文章评论:&nbsp;<span className="color">{this.state.message}</span>
      &nbsp; {this.state.time}
    </div>)
  }
  _clickSkitRead(e) {
    this.props.history.push('/read/' + this.state.AtricleId)
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

export default AtircleMessage


//https://secure.gravatar.com/avatar/3a1e5cac75ad5e0a710e828fa2f433bd?s=50*50