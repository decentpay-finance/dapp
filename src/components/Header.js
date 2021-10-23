import { Button } from '@material-ui/core';
import React from 'react';
import StringUtil from "../utils/StringUtil";


const Header = (prop) => {
    return (
    <div style={{alignItems : "flex-start"}}>
        <Button size="small" variant="contained" color="primary"  onClick={() => prop.authenticateUser()}>Authenticate</Button>          
    </div>
    );
}
const walletWrapper={
    fontWeight:100,
    fontSize:'1em',
    fontSmooth:"auto",
    border:"1px solid grey",
    padding:'10px',
    margin:'auto',
    position:'relative',
    borderRadius:'10px 10px 10px 10px',
    
}
export default Header
