import { Avatar, Container, ListItem, ListItemAvatar, ListItemText, List } from "@material-ui/core";
import { Adjust, AttachMoney, CallMade, CallMissed, CallReceived, DehazeRounded, Receipt, Send } from "@mui/icons-material";
import { IconButton, ListItemButton } from "@mui/material";
import userEvent from "@testing-library/user-event";

const Transacton = (props) => {

    return (
        <Container fixed>
            <List sx={{width: '100%'}}>            
                {props.transactions?(
                    props.transactions.map((transaction, index)=>{
                        //console.log(token)
                        const {value,from_address,to_address,block_timestamp, address, transaction_hash}=transaction;
                        const direction = from_address===props.user.get('ethAddress')?'Send':'Receive';
                        const avatarColor = direction==='Send'?'`red`':'`blue`';
                        if(value>0){
                        return(
                            <ListItem>
                            <ListItemAvatar>
                            <Avatar style={{backgroundColor:avatarColor}}>
                                {direction==='Send'?
                                <CallReceived/>
                                :<CallMade/>
                            }
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={value} secondary={block_timestamp}/>
                            <ListItemButton>
                                <IconButton>
                                    <Adjust/>
                                </IconButton>
                            </ListItemButton>
                            </ListItem>
                        );
                        }
                        })
                    
                    ):<div />
                }
            </List>
        </Container>
    );
}

export default Transacton