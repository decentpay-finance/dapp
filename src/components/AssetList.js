
import { Avatar, Container } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ImageIcon from '@mui/icons-material/Image';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Moralis from "moralis";
import AssetOptionDialogue from './AssetOptionDialogue';
import React from 'react';
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from 'react-perfect-scrollbar';
function AssetList(props) { 
    console.log(props.tokens);
    return (
        <Container fixed>
            <List sx={{width: '100%', overflow:'auto'}}>
        <PerfectScrollbar component="div" handlers={'touch'}>
                {props.tokens?(
                    props.tokens.map((token, index)=>{
                        //console.log(token)
                        const {name,symbol,decimals,balance }=token;
                        const bal = Moralis.Units.FromWei(balance, decimals);
                        return(
                            <ListItem className = "listItems"  kay={index} style={{ backgroundColor:'#007278', opacity: '0.9', marginBottom:'4px', borderRadius:'10px', color:'#95FAFF', padding:'3px 5px 3px 10px'}}>
                            <ListItemAvatar size="small" >
                            <Avatar>
                                <ImageIcon/>
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={name.concat(" " + symbol)} secondary={bal} />
                            <AssetOptionDialogue title={name}/>
                            </ListItem>
                        );
                        })
                    ):<div />
                }
            </PerfectScrollbar>    
            </List>
        </Container>
    );
}

export default AssetList