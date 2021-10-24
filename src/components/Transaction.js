import { Avatar, Container, ListItem, ListItemAvatar, ListItemText, List } from "@material-ui/core";
import {  CallMade,  CallReceived} from "@mui/icons-material";
import AssetOptionDialogue from "./AssetOptionDialogue";

const Transacton = (props) => {

    return (
        <Container fixed>
            <List sx={{width: '100%'}}>            
                {props.transactions?(
                    props.transactions.map((transaction, index)=>{
                        //console.log(token)
                        const {value,from_address,block_timestamp}=transaction;
                        const direction = from_address===props.user.get('ethAddress')?'Send':'Receive';
                        const avatarColor = direction==='Send'?'`red`':'`blue`';
                        if(value>0){
                            return(
                                <ListItem style={{borderBottom:'1px solid #D7DBDD'}}>
                                <ListItemAvatar>
                                <Avatar style={{backgroundColor:avatarColor}}>
                                    {direction==='Send'?
                                    <CallReceived/>
                                    :<CallMade/>
                                }
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={value} secondary={block_timestamp}/>
                                <AssetOptionDialogue title={value}/>
                                </ListItem>
                            );
                        }else{
                            return(
                                <ListItem></ListItem>
                            )
                        }
                        })
                    
                    ):<div />
                }
            </List>
        </Container>
    );
}

export default Transacton