import React, {useState} from 'react'
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import {Tab, Divider, Typography, FormControlLabel, } from '@material-ui/core'
import Profile from './Profile'
import Financials from './Financials'
import useStyles from './style'
import Collapse from '@mui/material/Collapse';
import CustomSwitch from '../specificticker/CustomSwitch'

const TabInfo = ({info}) => {
  const classes = useStyles();
  const [value, setValue] = useState('1');
  const [expanded, setExpanded] = useState(false);
  const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
  return (
    <>
    <FormControlLabel
      control={<CustomSwitch 
              checked={expanded}
              className={classes.toogle}
              onChange={() => {
                  setExpanded((prev) => !prev);
                }} />}
        label={<Typography className={classes.formControlLabel}>Show/Hide details</Typography>}
        style={{
          marginTop: "2%",
          width: "1000px"
        }}
        />
    <TabContext value={value}>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <TabList
                className={classes.tablist}
                onChange={handleChange} 
                aria-label="simple tabs "
                
                TabIndicatorProps={{
                style: {
                    backgroundColor: "rgba(0,0,0,0)",
                },
                
                }}>
                    <Tab 
                      label="Profile" 
                      value="1" 
                      className={classes.tab}/>
                    <Divider 
                      orientation="vertical" 
                      variant="inset" 
                      flexItem 
                      className={classes.divider}
                      style={{
                            height:"50px",
                            marginTop: "10px",
                            marginLeft: "-25px",
                            backgroundColor: "rgba(255, 165, 0, 0.5)"
                            }}
                      />
                    <Tab 
                      label="Financials" 
                      value="2" 
                      className={classes.tab}/>
                </TabList>
              <TabPanel value="1"><Profile info={info}/></TabPanel>
              
              <TabPanel value="2"><Financials info={info}/></TabPanel>
          </Collapse> 
        </TabContext>
      </>
  )
}

export default TabInfo
