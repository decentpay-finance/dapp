import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import NestedModal from './NestedModal';
const actions = ['Send', 'Receive', 'Swap'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open , title, openSwap, openSend, openReceive} = props;
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    switch (value) {
        case "Show Transaction Hash": openSend(); break;
        case "Network Scan": openReceive(); break;
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

export default function TransactionOptionDialogue(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(actions[1]);
  const [openSwapState, setOpenSwapState] = React.useState(false);
  const [openSendState, setOpenSendState] = React.useState(false);
  const [openReceiveState, setOpenReceiveState] = React.useState(false);
  

const handleOpenSwap = () => {
  setOpenSwapState(true);
};
const handleCloseSwap = () => {
  setOpenSwapState(false);
};
const handleOpenSend = () => {
  setOpenSendState(true);
};
const handleCloseSend = () => {
  setOpenSendState(false);
};
const handleOpenReceive = () => {
  setOpenReceiveState(true);
};
const handleCloseReceive = () => {
  setOpenReceiveState(false);
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
        <FontAwesomeIcon icon={faEllipsisV} />
      </IconButton>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        title={props.title}
        openSwap={handleOpenSwap}
        openSend={handleOpenSend}
        openReceive={handleOpenReceive}
      />
    <NestedModal open={openSendState} handleClose={()=>handleCloseSend()} title="Send" />
    <NestedModal open={openSwapState} handleClose={()=>handleCloseSwap()} title="Swap"/>
    <NestedModal open={openReceiveState} handleClose={()=>handleCloseReceive()} title="Receive"/>
    </div>
  );
}
