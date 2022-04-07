import React, {useState} from 'react'
import {  
    createTheme, 
    ThemeProvider, 
    TableContainer, 
    LinearProgress,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Paper,
    Container,
  } from '@material-ui/core'
  import useStyles from './style'
  import SetReminderButton from "./reminderpopup/SetReminderButton";
  import { Typography } from '@mui/material';


  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
      fontFamily: "Montserrat",
    },
  });

const ReminderEmpty = () => {
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
 

  return (
      <Container>
    <ThemeProvider theme={darkTheme}>
      <TableContainer 
            className={classes.tableContainer}
            component={Paper}>
                {
                    loading ? (
                        <LinearProgress style={{backgroundColor:"primary"}}/>
                    ):(
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead  className={classes.tablehead}
                            >
                                <TableRow>
                                {["TITLE", "TIME", "TICKER", "CONTENT", "EDIT","ACTIONS"].map((head) => (
                                    <TableCell
                                    className={classes.tablecell}
                                    key={head}
                                    align={head === "TITLE" ? "" : "left"}
                                    >
                                    {head}
                                    </TableCell>
                                ))}
                                </TableRow>
                            </TableHead>                                  
                        </Table>
                    )
                }
                
        </TableContainer>
        <Typography 
        variant="h6" 
        component="h6"
        align="center" >
        There is nothing here.<br/> 
        Please add your reminder
                
            <br/><br/><br/>
              <div>
                <SetReminderButton className={classes.btn_SetReminder}/>
              </div>
            <br/><br/><br/>
        </Typography>
        
            
    </ThemeProvider>
    </Container>
  )
}

export default ReminderEmpty