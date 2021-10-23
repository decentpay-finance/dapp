
import { useEffect, useState } from "react";
import Header from "./components/Header"
import HeaderAuth from "./components/HeaderAuth";
import Transaction from "./components/Transaction";
import Moralis from 'moralis';
//import { Button } from "@material-ui/core";
import Button from '@mui/material/Button';
import { useMoralis } from "react-moralis";
import { Container } from "@material-ui/core";
import { Box } from "@mui/system";
const App = (prop) => {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  const [balance, setBalance] = useState();  
  const [history, setHistory] = useState();  
  const [transactions, setTransactions] = useState(); 

  useEffect(() => {
    setTransactions(transactions);
  }, [transactions]);

  useEffect(() => {
    setBalance(balance);
  }, [balance]);

  const appId="3fJo4YOfynXdzjfLh29lnHSQY5ISVX3CfuXkEgYu";
  const serverUrl = "https://rb23g45mqtnd.moralishost.com:2053/server";
  Moralis.start({ serverUrl, appId });
  if (!isAuthenticated) {
    return (      
      <Box component="div"
        sx={{
          mx: 'auto',
          bgcolor: 'primary.main',
          color: '#000',
          width: 500,
          p: 1,
          m: 1,
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        <Button variant="contained" size="small"onClick={() => authenticate({ signingMessage: "DecentPay Authentication" })}>Authenticate</Button>
      </Box>
    );
  }
  const accounts = await  Moralis.Web3API.account.getNativeBalance({
    "address": user.get('ethAddress'),
    "chain": 'bsc testnet'
  });
  setBalance(Moralis.Units.FromWei(accounts.balance));
  return (
    <div>
    <Container>
      <h1>BNB {balance}</h1>
      <p>{user.get('ethAddress')}</p>
      </Container>
      
     <Container>
      <Button variant="contained" style={{margin:'10px'}} size="small" onClick={() => getNativeBalance(setBalance, user.get('ethAddress'),'bsc testnet')}>Balance</Button>
      <Button variant="contained" style={{margin:'10px'}} size="small" onClick={() => getTransactions(setTransactions, user.get('ethAddress'),'bsc testnet')}>History</Button>
      <Button variant="contained" style={{margin:'10px'}} size="small" onClick={() => logout()}>Logout</Button>
      </Container>
      <Container>
        <Transaction result={transactions} address={user.get('ethAddress')}/>
      </Container>
    </div>
  );
}
function renderTransaction(transactions){
  if(transactions){
    transactions.result.map((transaction, index)=>{
      const { block_hash, value, block_timestamp, from_address, to_address, gas_price, gas, block_number,  } = transaction //destructuring
      return <p>{value}</p>;
    })
  }
}

async function getNativeBalance(setBalance, address, chain){  
  const accounts = await  Moralis.Web3API.account.getNativeBalance({
      "address": address,
      "chain": chain
  });
  setBalance(Moralis.Units.FromWei(accounts.balance));
  return accounts.balance;
}

async function getTransactions(setTransactions, address_1, chain_1){
    const options = {
      address: address_1,
      chain: chain_1,
  };
  const transactions = await Moralis.Web3API.account.getTransactions({chain:'bsc testnet'});
  console.log(transactions.result);
  setTransactions(transactions.result);
}
export default App