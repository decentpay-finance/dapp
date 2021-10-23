
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMoralis } from 'react-moralis';
import AssetList from './AssetList';
import { Button } from '@material-ui/core';
import React from 'react';
import Transacton from './Transaction';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const tabStyle={
    textTransform: 'capitalize',
    backgroundColor:'#F2F3F4',
    borderRadius:"20px 20px 0px 0px",
    padding:'0px 10px 0px 10px',
    margin:"20px 5px 0px 10px",
    boxShadow: "1px 10px 50px #BDC3C7",
}
export default function BasicTabs(prop) {
    const {   user, logout} = useMoralis();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  return (
    <Box sx={{ width: '100%'}}>
      <Box sx={{ borderBottom: 2, borderColor: 'white' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Activity" {...a11yProps(0)} style={tabStyle} />
          <Tab label="Assets" {...a11yProps(1)} style={tabStyle}/>
          <Tab label="Trading" {...a11yProps(2)} style={tabStyle}/>
          <Tab label="Account" {...a11yProps(3)} style={tabStyle}/>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} style={{height:'500px',overflow: 'scroll'}} >
        <Transacton transactions={prop.transactions} user={user}/>
      </TabPanel>
      <TabPanel value={value} index={1} style={{height:'500px',overflow: 'scroll'}}>
        <AssetList tokens={prop.tokens}/>
      </TabPanel>
      <TabPanel value={value} index={2} style={{height:'500px'}}>
        <h2>Coming Soon</h2>
      </TabPanel>
      <TabPanel value={value} index={3} style={{height:'500px'}}>
        <Button variant="contained" onClick={()=>logout()}>Logout</Button>
      </TabPanel>
    </Box>
  );
}
