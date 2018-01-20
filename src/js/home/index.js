import React, { Component } from 'react'
import AV from "leancloud-storage"
import Item from "./item"
import "./home.css"

class Home extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)
    this.state = { items: [] }
  }
  // 加载一次，Dom 未加载
  componentWillMount() {

  }
  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {
    this._net(this.props.match.params.page) 
  }
  _net(page) {
    const query = new AV.Query('Atricle')
    if (page)query.contains('tag', decodeURI(page)) //注意转码    
    query.limit(1000)
    query.descending('createdAt')
    query.find().then((items) => {
      this.setState({
        items: items
      });
    }, function (error) {
      alert('网络错误 :)')
    })
  }
  // 渲染 Dom
  render() {
    // console.log('-----', this.props.match);
    const items = this.state.items.map((item, index) =>
      <Item key={index} item={item} />
    )
    return (
      <div className="g-container home">
        <div className="left">
          {items}
        </div>
        <div className="right">
          <div className="card">
            提示<br />
            用于 Visual Studio Code
          </div>
        </div>
      </div >
    )
  }
  // 父组建更新 Props 调用
  componentWillReceiveProps(nextProps) {
    this._net(nextProps.match.params.page) 
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

let matches = '<p>aaaa<img><a>,.,.,.<a></p>'.replace(/<[^>]+>/g, '');
    console.log(matches)
export default Home
