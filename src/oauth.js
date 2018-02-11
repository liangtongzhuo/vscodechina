/**
 * token 跳转的单页面
 */
import React from 'react'
import ReactDOM from 'react-dom'
import AV from "leancloud-storage"
import Oauth from './js/oauth'
import registerServiceWorker from './registerServiceWorker'

//初始化 Leancloud 
const appId = 'U4D6TL1HgHHauvmmmhR7qNYA-gzGzoHsz'
const appKey = 'wbh3vxJVB72NUiX8sSkcOPzx'
AV.init({ appId, appKey })

ReactDOM.render(<Oauth />, document.getElementById('root'))
registerServiceWorker()
