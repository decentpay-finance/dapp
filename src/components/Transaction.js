import { Avatar, Container, ListItem, ListItemAvatar, ListItemText, List } from "@material-ui/core";
import {  CallMade,  CallReceived} from "@mui/icons-material";
import AssetOptionDialogue from "./AssetOptionDialogue";

const Transacton = (props) => {

    return (
        <Container fixed style={{padding:'0px', margin:'0px'}}>
            <List sx={{width: '100%', overflow: 'auto'}}>            
                {props.transactions?(
                    props.transactions.map((transaction, index)=>{
                        //console.log(token)
                        const {value,from_address,block_timestamp}=transaction;
                        const direction = from_address===props.user.get('ethAddress')?'Send':'Receive';
                        const avatarColor = direction==='Send'?'`red`':'`blue`';
                        if(value>0){
                            return(
                                <ListItem className = "listItems" style={{backgroundColor:'#007278', opacity: '0.9', marginBottom:'4px', borderRadius:'10px', color:'#95FAFF', padding:'3px 5px 3px 10px'}} size="small">
                                <ListItemAvatar>
                                <Avatar style={{backgroundColor:avatarColor}}>
                                    {direction==='Send'?
                                    <CallMade/>
                                    :
                                    <CallReceived/>
                                }
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={direction} secondary={block_timestamp}/>
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