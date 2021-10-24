import { Box } from "@mui/system";
import QRCode from "react-qr-code";

export default function QRDisplay(props){
    return (
      <Box sx={{
        mx: 'auto',
        bgcolor: '#F8F9F9',
        color: '#000',
        textAlign: 'center',
        borderRadius:'30px',
        padding: '40px 0px 40px 0px',
        boxShadow: "1px 3px 60px #BDC3C7"
      }}>
        <QRCode  value={props.user?"ethereum:"+props.user.get('ethAddress'):""} style={{ width: '100%', borderRadius:'20px', margin:'0px 0px 50px 0px'}} />
        <h5>Scan the QR code to recieve payment</h5>
      </Box>
      
    )
  }
