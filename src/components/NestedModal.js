import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '380px',
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  borderRadius:'30px',
  opacity: 0.9,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3, 
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
        <ChildModal style={{display:'none'}}/>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal(prop) {
  return (
    <React.Fragment>
      <Modal
        open={prop.open}
        shouldCloseOnOverlayClick={false}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style}}>
          <h2 id="parent-modal-title">{prop.title}</h2>
          <div style={{ margin:'0px 0px 50px 0px'}}>{prop.content}</div>
          <Button variant='contained' onClick={()=>prop.handleClose()} style={{borderRadius:'20px'}}>Close</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
