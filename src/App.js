
import Button from '@mui/material/Button';
import {Box } from '@mui/system';
import Moralis from 'moralis';
import './App.css';
import { useState } from 'react';
import { useMoralis } from 'react-moralis';
import * as React from 'react';
import logo from './img/logo.png'; 
import bgImage from './img/logo.png'; 
import NestedModal from './components/NestedModal';
import BasicTabs from './components/TabPanel';
import {isMobile} from 'react-device-detect';
import { Fab } from '@mui/material';
import QROptionDialogue from './components/QROptionDialogue';
import QRDisplay from './components/QRDisplay';
import QRScanner from './components/QRSCanner';
const App = () => {
    //const [balance, setBalance] = useState('0.0');  
    const [nativeBalance , setNativeBalance] = useState('0.0');  
    const [tokens , seTokens] = useState();  
    const [transactions , setTransactions] = useState();  
    const { authenticate, isAuthenticated, user} = useMoralis();
    const [openPayState, setOpenPayState] = React.useState(false);
    const [openReceiveState, setOpenReceiveState] = React.useState(false);
    
    document.body.style.backgroundImage = {bgImage};
    const appId="3fJo4YOfynXdzjfLh29lnHSQY5ISVX3CfuXkEgYu";
    //const apiId="DtMZCYg0hnVK8ZrNhCtnsfoHHTpPf9f2uKh7xee4eFFmqg8urWVeznVK3N0vFilo";
    const serverUrl = "https://rb23g45mqtnd.moralishost.com:2053/server";
    document.title = "DecentPay Smart DApp"
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
  getWindowDimensions();
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
  //console.log(user);
    return (
        <div>
          {isAuthenticated?
          <div>
            <Box className="headerInfo" style={{
              color: '#000',
              height:'190px',
              margin:'5px 20px 10px 20px',
              textAlign: 'center',
              borderRadius:'30px 30px 0px 0px',
              boxShadow: "1px 3px 20px #000",
            }}>
            <div>
              <Fab aria-label="add" size="small" style={{margin:'10px', borderRadius:'20px', position:'relative', float:'right', backgroundColor:'#F2F3F4', padding:'0px'}}>
                <QROptionDialogue user={user} title="QR Options"/>
              </Fab>
              <h5 style={{margin:'0px 01px 10px 0px'}}><img src={logo} alt="Logo" style={{width:'30px', marginBottom:'-10px'}}/>DecentPay</h5>
            </div>
          <div>
            
            <h1 style={{paddingBottom:'10px', color:'#FFF', fontWeight:600}}>{parseFloat(nativeBalance).toFixed(5)} BNB</h1>           
            <Box sx={{
              marginBottom:'-50px'
            }}>
                <Button style={{...buttonStyle, backgroundColor:'#E85BB2'}} onClick={()=>handleOpenPay()}>Spend</Button>
                <Button style={{...buttonStyle, backgroundColor:'#5BE8DA'}}  onClick={()=>handleOpenReceive()}>Receive</Button>                
                <NestedModal open={openPayState} handleClose={()=>handleClosePay()} title="Spend" content={<QRScanner user={user}/>}/>
                <NestedModal open={openReceiveState} handleClose={()=>handleCloseReceive()} title="Receive" content={<QRDisplay />}/>
            </Box>
          </div>
        </Box>        
        <Box  className="homeTab" sx={{
                mx: 'auto',
                color: '#000',
                p: 1,
                margin:'-30px 20px 20px 20px',
                textAlign: 'center',
                borderRadius:'20px 20px 20px 20px',
                boxShadow: "1px 3px 20px #000"}}>
                <BasicTabs tokens={tokens} transactions={transactions} user={user}/>
            </Box>
            </div>
          :
            <Button style={buttonStyle} onClick={()=>walletConnectLogIn()}>
              Login With Wallet
            </Button>
          }
        </div>
    )
}
const buttonStyle={    
    fontSize:'1.4em',
    color:'#FFF',
    borderRadius:'9px',
    backgroundColor: '#F8F9F9',
    padding:'5px 20px 5px 20px',
    height:'50px',
    width:'120px',
    fontWeight:400,
    boxShadow: "0px 3px 5px #676767",
    textTransform: 'capitalize',
    margin:'15px'
}
export default App