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
    bgcolor: 'white',
    width:'81%',
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
    const [tokenAddress, setTokenAddress] = useState('');

    const [walletToPay, setWalletToPay] = useState('');
    async function loadTokenList(props){
      const balOptions = { chain: 'bsc', address: props.user.get('ethAddress')}       
      const tokens = await Moralis.Web3API.account.getTokenBalances(balOptions);
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
                padding: '1px',
                boxShadow: "1px 3px 20px #BDC3C7"
            }}>      
                <QrReader 
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    resolution={600}
                    />
                <h4>Scan the QR code to Start payment</h4>
                <Button style={{display:"none", margin:'10px', borderRadius:'20px'}} onClick={()=>setReloadToken(1)}>Reload</Button>
                <Button style={{display:"block", margin:'10px', borderRadius:'20px'}} onClick={()=>handleScan('ethereum:0xeF175A26D5d4CF8d93b275F7B8b84d624Cb0FAe0')}>Standard</Button>
                <Button style={{display:"block", margin:'10px', borderRadius:'20px'}} onClick={()=>handleScan('static:wallet:symbol:station')}>Static</Button>
                <Button style={{display:"none", margin:'10px', borderRadius:'20px'}} onClick={()=>handleScan('dynamic:wallet:symbol:station:O-orderid:P-promocode')}>Dynamic</Button>
                <SimplePay open={paymentMode===1} handleClose={()=>handleClose()} user={props.user} tokenList={tokenList} walletToPay={walletToPay} tokenSymbol={tokenSymbol} setTokenSymbol={setTokenSymbol} tokenAddress={tokenAddress} setTokenAddress={setTokenAddress}/>
                <StaticPay open={paymentMode===2} handleClose={()=>handleClose()} user={props.user} tokenList={tokenList} walletToPay={walletToPay} tokenSymbol={tokenSymbol} setTokenSymbol={setTokenSymbol} tokenAddress={tokenAddress} setTokenAddress={setTokenAddress}/>
                <DynamicPay open={paymentMode===3} handleClose={()=>handleClose()} user={props.user} tokenList={tokenList} walletToPay={walletToPay} tokenSymbol={tokenSymbol} setTokenSymbol={setTokenSymbol} tokenAddress={tokenAddress} setTokenAddress={setTokenAddress}/>
            </Box>
        </React.Fragment>
    )
  }
async function getTokenPrice(address){
    const options = {
        address: address,
        chain: "bsc",
        exchange: "PancakeSwapv2"
    };
    const price = await Moralis.Web3API.token.getTokenPrice(options);
    return price;
}


  function SimplePay(props){
    const[price,setPrice] = useState(0.0);
    useEffect(()=>{
        if(document.getElementById('priceDisplay')){
            document.getElementById('priceDisplay').innerText=price;
        }
    },[price]);
    async function queryPrice(){
        try{
            const tokenPrice = await getTokenPrice(props.tokenAddress);            
            setPrice(tokenPrice.usdPrice.toFixed(5));
        }catch(error){

        }
    }
    
    async function getTokenDecimals(address){
        //Get metadata for one token
        const options = { chain: "bsc", addresses: address };
        const tokenMetadata = await Moralis.Web3API.token.getTokenMetadata(options);
        return tokenMetadata[0].decimals;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function payERC20(){
        const tokens = document.getElementById('tokenQty').value;
        const decimals= await getTokenDecimals(props.tokenAddress);
        const options = {type: "erc20", 
                 amount: Moralis.Units.Token(tokens, decimals), 
                 receiver: props.walletToPay,
                 contractAddress: props.tokenAddress}
        let result = await Moralis.transfer(options)
        console.log(result);
    }

    function handleChange (e) {
        console.log(e.target.id)
        console.log(e.target.value)
        if(e.target.id === "tokenQty"){
            document.getElementById('usdQty').value=e.target.value * price;
        }
        if(e.target.id === "usdQty"){
            document.getElementById('tokenQty').value=e.target.value / price;
        }
        document.getElementById('qtyOfSlectedToken').innerText=parseFloat(document.getElementById('tokenQty').value).toFixed(5);
        document.getElementById('selectedToken').innerText=props.tokenSymbol;
    }

    return (
        <Modal open={props.open}
            onClose={()=>props.handleClose()}>
            <Box  sx={{ ...style}}>
                <h3>Standard Crypto Payment</h3>
                <p>Paying to:: <b>{StringUtil.shortenWallet(props.walletToPay)}</b></p>
                <h5>Double-tap to Select Token</h5>
                <SelectAssetList tokens={props.tokenList} setTokenSymbol={props.setTokenSymbol} setTokenAddress={props.setTokenAddress} queryPrice={queryPrice}/>
                <div>
                    <p>Enter Amount <b>{props.tokenSymbol}</b> to Pay</p>
                    <TextField 
                        size="small"
                        id="tokenQty"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}                        
                        onChange={handleChange}
                    />
                    <p><b>{props.tokenSymbol}</b> price is <b id="priceDisplay">0</b> USD</p>
                    <p>or enter equivalent of BUSD</p>
                    
                    <TextField
                        size="small"
                        id="usdQty"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange}
                        style={{margin:'0px 0px 0px 0px'}}
                    />
                </div>
                <p>Merchant will receive <b id="qtyOfSlectedToken">0</b> of <b id="selectedToken">selected token</b></p>
                <Box sx={{paddingTop:'40px'}}>
                    <Button variant='contained' color='primary' style={{position:'relative', float:'right', borderRadius:'20px'}} onClick={()=>payERC20()}>Confirm</Button>
                    <Button variant='contained' color='primary' style={{position:'relative', borderRadius:'20px'}} onClick={()=>props.handleClose()}>Cancel</Button>
                </Box>
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
    
    function select(tokenAddress,name){
        //alert(name);
        props.setTokenSymbol(name);
        props.setTokenAddress(tokenAddress);
        props.queryPrice();
    }
    return (
        <Container fixed>
            <List sx={{width: '100%', height:'200px', overflow:'auto',backgroundColor:'#F2F3F4', borderRadius:'10px'}} >
                {props.tokens?(
                    props.tokens.map((token, index)=>{
                        //console.log(token)
                        const {name,symbol,decimals,balance,token_address}=token;
                        const bal = Moralis.Units.FromWei(balance, decimals);
                        return(
                            <ListItem key={index} style={{borderBottom:'1px solid #D7DBDD'}} onClick={()=>select(token_address, name)} >
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