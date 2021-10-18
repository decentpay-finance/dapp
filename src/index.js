import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <MoralisProvider appId="3fJo4YOfynXdzjfLh29lnHSQY5ISVX3CfuXkEgYu" serverUrl="https://rb23g45mqtnd.moralishost.com:2053/server">
  <React.StrictMode>
    <App style={{backgroundColor:"#363636"}}/>
  </React.StrictMode>
  </MoralisProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
