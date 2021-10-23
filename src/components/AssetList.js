
import { Avatar, Container } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ImageIcon from '@mui/icons-material/Image';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Moralis from "moralis";

function AssetList(props) { 
    return (
        <Container fixed>
            <List sx={{width: '100%'}}>            
                {props.tokens?(
                    props.tokens.map((token, index)=>{
                        //console.log(token)
                        const {token_address,name,symbol,logo,thumbnail,decimals,balance }=token;
                        const bal = Moralis.Units.FromWei(balance, decimals);
                        return(
                            <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={name.concat(" " + symbol)} secondary={bal} />
                            </ListItem>
                        );
                        })
                    ):<div />
                }
            </List>
        </Container>
    );
}

export default AssetList