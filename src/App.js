
import Button from '@mui/material/Button';
import {Box } from '@mui/system';
import Moralis from 'moralis';
import { useState } from 'react';
import { useMoralis } from 'react-moralis';
import * as React from 'react';
import logo from './img/logo.png'; 
import NestedModal from './components/NestedModal';
import BasicTabs from './components/TabPanel';
import {isMobile} from 'react-device-detect';
const App = () => {
    //const [balance, setBalance] = useState('0.0');  
    const [nativeBalance , setNativeBalance] = useState('0.0');  
    const [tokens , seTokens] = useState();  
    const [transactions , setTransactions] = useState();  
    const { authenticate, isAuthenticated, user} = useMoralis();
    const [openPayState, setOpenPayState] = React.useState(false);
    const [openSwapState, setOpenSwapState] = React.useState(false);
    const [openSendState, setOpenSendState] = React.useState(false);
    const [openReceiveState, setOpenReceiveState] = React.useState(false);
    const {windowWidth, windowHeight}=getWindowDimensions();
    document.body.style.backgroundColor = "#BDC3C7";
    const appId="3fJo4YOfynXdzjfLh29lnHSQY5ISVX3CfuXkEgYu";
    const serverUrl = "https://rb23g45mqtnd.moralishost.com:2053/server";

    async function walletConnectLogIn(){
        if(isMobile){
        await authenticate({ 
            provider: "walletconnect", 
            mobileLinks: [
              "rainbow",
              "metamask",
              "argent",
              "trust",
              "imtoken",
              "pillar",
            ]
        })
        }else{
            await authenticate();
        }
    }
      
  const handleOpenPay = () => {
    setOpenPayState(true);
  };
  const handleClosePay = () => {
    setOpenPayState(false);
  };
  const handleOpenSwap = () => {
    setOpenSwapState(true);
  };
  const handleCloseSwap = () => {
    setOpenSwapState(false);
  };
  const handleOpenSend = () => {
    setOpenSendState(true);
  };
  const handleCloseSend = () => {
    setOpenSendState(false);
  };
  const handleOpenReceive = () => {
    setOpenReceiveState(true);
  };
  const handleCloseReceive = () => {
    setOpenReceiveState(false);
  };
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  /*async function getTokenPrice(address, chain, exchange){
            //Get token price on PancakeSwap v2 BSC
            const options = {
            address: address,
            chain: chain,
            exchange: exchange
        };
        //const price1 = await Moralis.Web3API.token.getTokenPrice(options);
        const price = 480;
        return price;
  }*/
  React.useEffect(() => {    
    if(isAuthenticated){
        Moralis.start({ serverUrl, appId });
        async function getNativeBal(){           
            const accounts = await Moralis.Web3API.account.getNativeBalance({
                "address": user.get('ethAddress'),
                "chain": 'bsc'
            });
            setNativeBalance(Moralis.Units.FromWei(accounts.balance));        
            const balOptions = { chain: 'bsc', address: user.get('ethAddress')}       
            const tokensList = await Moralis.Web3API.account.getTokenBalances(balOptions);
            const transOptions = { chain: 'bsc', address: user.get('ethAddress'), from_block: "0"} 
            const userTransactions = await Moralis.Web3API.account.getTokenTransfers(transOptions);
            //const bnbPrice = getTokenPrice('0xB8c77482e45F1F44dE1745F52C74426C631bDD52', 'bsc','PancakeSwapv2');
            seTokens(tokensList);
            //setBalance((parseFloat(accounts.balance).toFixed(2)));
            setTransactions(userTransactions.result);
       }
       getNativeBal();
    }
  }, [isAuthenticated,user]);
    return (
        <Box  sx={{
            mx: 'auto',
            bgcolor: '#E5E7E9',
            color: '#000',
            maxWidth:windowWidth+'px',
            minWidth:windowHeight+'px',
            p: 1,
            m: 1,
            textAlign: 'center',
            borderRadius:'30px'
          }}>
          <div>
            
            <h2 style={{margin:'10px'}}><img src={logo} alt="Logo" style={{width:'35px', marginBottom:'-10px'}}/>DecentPay</h2>
          </div>
          {isAuthenticated?
          <div>
                <Box  sx={{
                    mx: 'auto',
                    bgcolor: '#F8F9F9',
                    color: '#000',
                    p: 1,
                    m: 1,
                    textAlign: 'center',
                    borderRadius:'30px',
                    boxShadow: "1px 3px 60px #BDC3C7",
                }}>
                {user.get('ethAddress')}
            </Box>
            
            <h3 style={{paddingBottom:'10px', fontWeight:600}}>{nativeBalance} BNB</h3>           
            <Box>
                <Button style={buttonStyle} onClick={()=>handleOpenPay()}>Pay</Button>
                <Button style={buttonStyle} onClick={()=>handleOpenSwap()}>Swap</Button>
                <Button style={buttonStyle} onClick={()=>handleOpenSend()}>Send</Button>
                <Button style={buttonStyle} onClick={()=>handleOpenReceive()}>Receive</Button>                
                <NestedModal open={openPayState} handleClose={handleClosePay} title="Pay"/>
                <NestedModal open={openSwapState} handleClose={handleCloseSwap} title="Swap"/>
                <NestedModal open={openSendState} handleClose={handleCloseSend} title="Send"/>
                <NestedModal open={openReceiveState} handleClose={handleCloseReceive} title="Receive"/>
            </Box>
            <Box sx={{
                mx: 'auto',
                bgcolor: '#F2F3F4',
                color: '#000',
                p: 1,
                m: 1,
                textAlign: 'center',
                borderRadius:'30px',
    boxShadow: "1px 3px 60px #BDC3C7"}}>
                <BasicTabs tokens={tokens} transactions={transactions} user={user}/>
            </Box>
          </div>
          :
        <Button
            style={buttonStyle} onClick={()=>walletConnectLogIn()}>
            Login With Wallet</Button>
          }
        </Box>
    )
}
const buttonStyle={    
    fontSize:'.9em',
    color:'black',
    borderRadius:'30px',
    backgroundColor: '#F8F9F9',
    padding:'5px 20px 5px 20px',
    fontWeight:400,
    boxShadow: "1px 3px 40px #BDC3C7",
    textTransform: 'capitalize',
    margin:'5px'
}
export default App