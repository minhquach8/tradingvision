import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useStyles from '../style'
import { Box } from '@mui/system';

const ReminderDetail = (props) => {
    const classes = useStyles();
   
  return (
    <Dialog
              open={props.open}
              onClose={props.onClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              width = '500px'
              height = '500px'
            >
             
              <DialogTitle id="alert-dialog-title" color = 'black' fontWeight = "500" fontSize = "25px">
              
                {props.title}
                

              </DialogTitle>
              <div className={classes.line}></div>
              <DialogContent>
                <DialogContentText id="alert-dialog-description" >
                <Typography gutterBottom  fontWeight = "400">
                   {new Date( new Date(props.time).toUTCString() ).toLocaleString()}
                </Typography>
                
                <Typography gutterBottom  fontWeight = "400">
                   Ticker: {props.ticker}
                </Typography>
          <Box sx={{ border: 0.5, borderRadius: '10px', minWidth: 500, minHeight: 250}}>
                <Typography gutterBottom marginLeft = '4%'  marginTop = '4%' marginBottom = '4%'>
                  {props.content}
          </Typography>
          </Box>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                
                <Button 
                  onClick={props.onClose}
                  sx = {{
                    color: 'white',
                    backgroundColor:'#c1c1c1',
                    "&:hover":{
                      backgroundColor:"#AAAAAA",
                    }
                  }}
                  >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
  )
}

export default ReminderDetail