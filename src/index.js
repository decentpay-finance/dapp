import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider, useMoralis} from "react-moralis";
import Moralis   from 'moralis';
const appId="3fJo4YOfynXdzjfLh29lnHSQY5ISVX3CfuXkEgYu";
const serverUrl = "https://rb23g45mqtnd.moralishost.com:2053/server";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <App useMoralis={useMoralis} Moralis={Moralis} appId={appId} serverUrl={serverUrl}/>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
