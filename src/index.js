/**
 * 这个模块只放初始化业务
 */
import React from 'react'
import ReactDOM from 'react-dom'
import AV from "leancloud-storage"
import App from './js/route.js'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

//初始化 Leancloud 
const appId = 'U4D6TL1HgHHauvmmmhR7qNYA-gzGzoHsz'
const appKey = 'wbh3vxJVB72NUiX8sSkcOPzx'
AV.init({ appId, appKey })

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
