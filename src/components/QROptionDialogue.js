import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { IconButton } from '@mui/material';
import NestedModal from './NestedModal';
import { QrCode } from '@mui/icons-material';
import QRCode from "react-qr-code";
import QrReader from 'react-qr-reader-es6';

const actions = ['Scan Barcode To Start', 'Show Address QR'];
function SimpleDialog(props) {
  const { onClose, selectedValue, open , title, openAddress, openScan} = props;
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    switch (value) {
        case "Show Address QR": openAddress(); break;
        case "Scan Barcode To Start": openScan(); break;
        default:
        // code block
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
    <DialogTitle>{title}</DialogTitle>
      <List sx={{ pt: 0 }}>
        {actions.map((action) => (
          <ListItem button onClick={() => handleListItemClick(action)} key={action}>
            <ListItemText primary={action} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default function QROptionDialogue(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(actions[1]);
  const [openAddressState, setOpenAddressState] = React.useState(false);
  const [openScanState, setOpenScanState] = React.useState(false);
  const [scanState, setScanState] = React.useState('No result');
  const {user} = props;
  const handleScan=(data)=>{
    if (data) {
      setScanState(data)
      alert(scanState);
    }
  }
  const handleError = (err) => {
    console.error(err)
  }
const handleOpenAddress = () => {
  setOpenAddressState(true);
};
const handleCloseAddress = () => {
  setOpenAddressState(false);
};
const handleOpenScan = () => {
  setOpenScanState(true);
};
const handleCloseScan = () => {
  setOpenScanState(false);
};
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
       <IconButton aria-label="Example" onClick={handleClickOpen}>
       <QrCode />
      </IconButton>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        title={props.title}
        openAddress={handleOpenAddress}
        openScan={handleOpenScan}
      />
    <NestedModal open={openScanState} handleClose={()=>handleCloseScan()} title="Scan Barcode To Start" content={
    <QrReader delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%', borderRadius:'20px', margin:'0px 0px 50px 0px'}}/>}/>
    <NestedModal open={openAddressState} handleClose={()=>handleCloseAddress()} title="Show Address QR" content={<QRCode size={310} value={user?user.get('ethAddress'):""} style={{ width: '100%', borderRadius:'20px', margin:'0px 0px 50px 0px'}} />}/>
    </div>
  );
}
