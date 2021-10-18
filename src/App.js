import { Button, List } from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/system";
function App() {
  const [header,setHeader] = useState(HomeHeader);
  const [navigator,setNavigator] = useState(HomeNavigator);
  const [workarea,setWorkArea] = useState(HomeWorkArea);
  const [actionArea,setActionArea] = useState(HomeActionArea);

  function setPageHeader(_header){
    setHeader(_header);
  }
  function setPageNavigator(_navigator){
    setNavigator(_navigator);
  }

  function setPageWorkArea(_setWorkArea){
    setWorkArea(_setWorkArea);
  }
  function setActionkArea(_setActionArea){
    setActionArea(_setActionArea);
  }
  function homeNavHomeButtonClick(){
    setPageHeader(HomeHeader);
    setPageNavigator(HomeNavigator)
    setWorkArea(HomeWorkArea);
    setActionkArea(HomeActionArea);
  }
  function receiveButtonClick(){
    setPageHeader(ReceiveHeader);
    setPageWorkArea(ReceiveWorkArea);
    setActionkArea(ReceiveActionArea);
  }

  function payButtonClick(){
    setPageHeader(PayHeader);
    setPageWorkArea(PayWorkArea)
  }
  function  HomeHeader(){
    return (
      <div>
      <Button variant="contained" size="small" >Show Asset</Button>
        <h4>Home</h4>
      </div>
    )
  }
  function  ReceiveHeader(){
    return (
      <div>
        <h4>Receive</h4>
      </div>
    )
  }
  function  HomeWorkArea(){
    return (
      <div>
        <h4>Home WorkArea</h4>
      </div>
    )
  }
  function HomeActionArea(){
    return (
      <div>
      <List style={{display: 'flex', alignItems: 'center'}}>
        <Button variant="contained" style={navButtonStyle} onClick={homeNavHomeButtonClick}>Tokens</Button>
        <Button variant="contained" style={navButtonStyle} onClick={homeNavHomeButtonClick}>Connect</Button>
      </List>
      </div>
    )
  }
  function  ReceiveActionArea(){
    return (
      <div>
      <List style={{display: 'flex', alignItems: 'center'}}>
        <Button variant="contained" style={navButtonStyle} onClick={homeNavHomeButtonClick}>Cancel</Button>
        <Button variant="contained" style={navButtonStyle} onClick={homeNavHomeButtonClick}>Next</Button>
      </List>
      </div>
    )
  }
  function ReceiveWorkArea(){
    return (
      <div>
        <h4>Receive WorkArea</h4>
      </div>
    )
  }
  
  function  PayHeader(){
    return (
      <div>
        <h4>Pay</h4>
      </div>
    )
  }
  function PayWorkArea(){
    return (
      <div>
        <h4>Pay WorkArea</h4>
      </div>
    )
  }
  function HomeNavigator(){
        return (
          <div>
          <Box sx={{ '& button': { m: 1 } }} style={{justifyContent:"center",
  alignItems:"center"}}>
          <List style={{display: 'flex', alignItems: 'center'}}>
            <Button style={navButtonStyle} onClick={homeNavHomeButtonClick}>Home</Button>
            <Button style={navButtonStyle} onClick={receiveButtonClick}>Receive</Button>
            <Button style={navButtonStyle} onClick={payButtonClick}>Pay</Button>
            <Button style={navButtonStyle} onClick={payButtonClick}>Swap</Button>
          </List>
          </Box>
          </div>
        );
  }
  return (
    <div className="App" style={{height:'100%'}}>
      <div style={{height:'150px', padding:'10px', backgroundColor:'#b5b5b5', marginBottom:'-32px'}}>{header}</div>
      <div style={navButtonBG}>{navigator}</div>
      <div style={{backgroundColor:"#454545", marginTop:'-30px', height:'563px'}}>
        <div style={workAreaBG}>{workarea}</div>
      <div style={actionAreaBG}>{actionArea}</div>
      </div>
    </div>
  );
}

const navButtonBG={
  backgroundColor:"#2b2b2b",
  borderRadius:'30px 30px 0px 0px',
  margin:'0px 15px 0px 15px',
  padding:'0px 10px 0px 10px',
  alignItems:'center',
  
};

const workAreaBG={
  height:'460px',
  padding:'15px 30px 00px 30px',
  backgroundColor:"#2b2b2b",
  margin:'0px 15px 5px 15px',
  borderRadius:'0px 0px 30px 30px',
};
const actionAreaBG={
  height:'50px',
  padding:'0px 5px 13px 5px',
  backgroundColor:"#404040",
  margin:'0px 15px 0px 15px',
  borderRadius:'30px 30px 30px 30px',
};
const navButtonStyle={  
  margin:'5px',
  fontWeight: 400,
  width: '200px',
  backgroundColor:"#00857f",
  color:'#FFF',
  border:'1px solid #00c4bb',
  borderRadius:'20px 20px 20px 20px',
  boxShadow: "0px 0px 10px #87fffa",
};
export default App;
