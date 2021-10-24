import { Avatar, Button, Container, List, ListItem, ListItemAvatar, ListItemText, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Moralis from "moralis";
import React, { useEffect, useState } from "react";
import QrReader from "react-qr-reader-es6";
import ImageIcon from '@mui/icons-material/Image';
import StringUtil from '../utils/StringUtil';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'white',
    //border: '2px solid #000',
    borderRadius:'30px',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3, 
  };


export default function QRScanner(props) {
    const [paymentMode, setPaymentMode] = useState(0);
    const [tokenList, setTokensList] = useState();    
    const [reloadToken, setReloadToken] = useState(false);
    const [tokenSymbol, setTokenSymbol] = useState('');

    const [walletToPay, setWalletToPay] = useState('');
    async function loadTokenList(props){
      const balOptions = { chain: 'bsc', address: props.user.get('ethAddress')}       
      const tokens = await Moralis.Web3API.account.getTokenBalances(balOptions);
      console.log(tokens);
      setTokensList(tokens);
    }
    useEffect(() => {
        loadTokenList(props);
    }, [reloadToken,props]);

    //ethereum:<wallet>
    //static:<wallet>:<symbol>:<station>
    //dynamic:<wallet>:<price>:<symbol>:<station>:O-<orderid>:P-<promocode>
    function handleScan(data){
        if(!data){
            return;
        }
        if(data.startsWith("ethereum")){
            setPaymentMode(1);
           var da = data.split(':')
           setWalletToPay(da[1]);
        }else if(data.startsWith("static")){
            setPaymentMode(2);
        }else if(data.startsWith("dynamic")){
            setPaymentMode(3);
        }
    }
    function handleClose(){
        setPaymentMode(0);
    }
    function handleError(msg){
        console.log(msg);
    }
    return (
        <React.Fragment>
            <Box sx={{
                mx: 'auto',
                bgcolor: '#F8F9F9',
                color: '#000',
                textAlign: 'center',
                borderRadius:'30px',
                padding: '40px 40px 40px 40px',
                boxShadow: "1px 3px 60px #BDC3C7"
            }}>      
                <QrReader 
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{width:'100%', margin:'auto', posistion:'relative'}} />
                <h4>Scan the QR code to Start payment</h4>
                <Button style={{display:"none"}} onClick={()=>setReloadToken(1)}>Reload</Button>
                <Button style={{display:"none"}} onClick={()=>handleScan('ethereum:0xeF175A26D5d4CF8d93b275F7B8b84d624Cb0FAe0')}>Standard</Button>
                <Button style={{display:"none"}} onClick={()=>handleScan('static:wallet:symbol:station')}>Static</Button>
                <Button style={{display:"none"}} onClick={()=>handleScan('dynamic:wallet:symbol:station:O-orderid:P-promocode')}>Dynamic</Button>
                <SimplePay open={paymentMode===1} handleClose={()=>handleClose()} user={props.user} tokenList={tokenList} walletToPay={walletToPay} tokenSymbol={tokenSymbol} setTokenSymbol={setTokenSymbol}/>
                <StaticPay open={paymentMode===2} handleClose={()=>handleClose()} user={props.user} tokenList={tokenList} walletToPay={walletToPay} tokenSymbol={tokenSymbol} setTokenSymbol={setTokenSymbol}/>
                <DynamicPay open={paymentMode===3} handleClose={()=>handleClose()} user={props.user} tokenList={tokenList} walletToPay={walletToPay} tokenSymbol={tokenSymbol} setTokenSymbol={setTokenSymbol}/>
            </Box>
        </React.Fragment>
    )
  }

  function SimplePay(props){
    return (
        <Modal open={props.open}
            onClose={()=>props.handleClose()}>
                <Box  sx={{ ...style}}>
                <h3>Standard Crypto Payment</h3>
                <p>Paying to:: <b>{StringUtil.shortenWallet(props.walletToPay)}</b></p>
                <h5>Select token to Pay</h5>
                <SelectAssetList tokens={props.tokenList} setTokenSymbol={props.setTokenSymbol}/>
                <div>
                <p>Enter Amount <b>{props.tokenSymbol}</b> to Pay</p>
                <TextField
                id="outlined-number"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                style={{margin:'0px 40px 40px 40px'}}
                />
                </div>
                <Button variant='contained' color='primary' style={{position:'relative', float:'right', borderRadius:'20px'}}>Confirm</Button>
                <Button variant='contained' color='primary' style={{position:'relative', borderRadius:'20px'}}>Cancel</Button>
            </Box>
        </Modal>
    )
  }
  function StaticPay(props){
    return (
        <Modal open={props.open}
            onClose={()=>props.handleClose()}>
        <Box  sx={{ ...style}}>
            <h3>StaticPay</h3>
            <SelectAssetList tokens={props.tokenList}/>
        </Box>
        </Modal>
    )

  }
  function DynamicPay(props){
    return (
        <Modal open={props.open}
            onClose={()=>props.handleClose()}>
        <Box  sx={{ ...style}}>
            <h3>DynamicPay</h3>
            <SelectAssetList tokens={props.tokenList}/>
        </Box>
        </Modal>
    )
  }

  function SelectAssetList(props){
    
    function select(element,name){
        //alert(name);
        props.setTokenSymbol(name);
    }
    return (
        <Container fixed>
            <List sx={{width: '100%', height:'200px', overflow:'auto',backgroundColor:'#F2F3F4', borderRadius:'10px'}} >
                {props.tokens?(
                    props.tokens.map((token, index)=>{
                        //console.log(token)
                        const {name,symbol,decimals,balance }=token;
                        const bal = Moralis.Units.FromWei(balance, decimals);
                        return(
                            <ListItem key={index} style={{borderBottom:'1px solid #D7DBDD'}} onClick={()=>select(this, name)} >
                            <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={name.concat(" " + symbol)} secondary={bal} />
                            </ListItem>
                        );
                        })
                    ):<ListItem/>
                }
            </List>            
        </Container>
    );

    
}