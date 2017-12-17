/**
 * 这个模块只放初始化业务
 */
import React from 'react';
import ReactDOM from 'react-dom';
import AV from "leancloud-storage";
import App from './js';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

//初始化 Leancloud 
const appId = '2MY9AH1hE38iVn6cfSMeVXW8-gzGzoHsz';
const appKey = 'rhmGmvC4cz4qohsQlpmP0KV0';
AV.init({ appId, appKey });

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
