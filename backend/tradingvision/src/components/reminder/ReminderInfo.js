  import React, {useState, useEffect} from 'react'
  import {  
      createTheme, 
      ThemeProvider, 
      TableContainer, 
      LinearProgress,
      Table,
      TableHead,
      TableRow,
      TableCell,
      TableBody,
      Paper,
      Container,
      TablePagination,
    } from '@material-ui/core'
  import useStyles from './style'
  import EditIcon from '@mui/icons-material/Edit';
  import DeleteIcon from '@mui/icons-material/Delete';
  import SetReminderButton from "./reminderpopup/SetReminderButton";  
  import ReminderDelete from './reminderpopup/ReminderDelete';
  import ReminderDetail from './reminderpopup/ReminderDetail';
  import ReminderEditTest from './reminderpopup/ReminderEditTest';
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
      fontFamily: "Montserrat",
    },
  });

 
const ReminderInfo = ({reminders}) => {
  
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRow, setSelectedRow] = useState();

    const rows = reminders.map((reminder) =>{
      return {
        id: reminder._id,
        title: reminder.Title,
        ticker: reminder.Ticker,
        content: reminder.Content,
        time: reminder.RemindAt,
      }
    })
    //Open reminder content
    const [openReminder, setOpenReminder] = React.useState(false);
    
    const handleOpenReminder = (row) => {
      setSelectedRow(row);
      setOpenReminder(true);
      
    };
    const handleCloseReminder = () => {
      setOpenReminder(false);
     
    };
    
    //Open reminder edit
    const [values, setValues] = useState({
      title: "",
      content: "",
      ticker: "",
      time: "",
    });
    const [openEdit, setOpenEdit] = React.useState(false)
    const [date, setDate] = useState();
    const [stockTicker,setTicker] = React.useState([]);
    const handleOpenEdit = (row) => {
      setSelectedRow(row);
      setValues({
        title: row.title,
        content: row.content,
        ticker: row.ticker,
        time: row.time
      });
      setOpenEdit(true);
      setDate(new Date(row.time));
      setTicker(row);
    };
    const handleCloseEdit = () => {
      setOpenEdit(false);
    };

    //Handle pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    };
    
    //Open reminder delete
    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = (row) => {
      setSelectedRow(row);
      setOpenDelete(true);
    }
    const handleCloseDelete = () => {
      setOpenDelete(false);
    };
    
  return (
    <Container>
    <ThemeProvider theme={darkTheme}>
    <div>
       <SetReminderButton/>
    </div>
    <TableContainer 
            className={classes.tableContainer}
            component={Paper}>
                {
                    loading ? (
                        <LinearProgress style={{backgroundColor:"primary"}}/>
                    ):(
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead  className={classes.tablehead}
                            rowCount={rows.length}>
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
                    
                            <TableBody>
                                {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row)=> (
                                 <>
                                    <TableRow
                                    className ={classes.row}
                                    key={row.title}>
                                      
                                    <TableCell component='th' scope='row'
                                        style={{
                                          fontWeight: 'bold',
                                        }}
                                        className={classes.cell}> {row.title}
                                    </TableCell>
                                    <TableCell align="left" className={classes.cell}>                   
                                      {new Date( new Date(row.time).toUTCString() ).toLocaleString()}
                                    </TableCell>
                                    <TableCell align="left" className={classes.cell}>{row.ticker}</TableCell>
                                    <TableCell align="left" className={classes.cell} 
                                    onClick = {() => handleOpenReminder(row)}    
                                                           
                                    >
                                    Read more
                                   
                                    </TableCell>
                                    <ReminderDetail 
                                        open = {openReminder} 
                                        onClose = {handleCloseReminder}
                                        content = {(selectedRow || {}).content}
                                        ticker = {(selectedRow || {}).ticker}
                                        title = {(selectedRow || {}).title}
                                        time = {(selectedRow || {}).time}

                                         />  
                                    <TableCell align="left" className={classes.cell}>
                                      <EditIcon 
                                      onClick = {() => handleOpenEdit(row)} 
                                      
                                       /></TableCell>
                                    <TableCell align="left" className={classes.cell}><DeleteIcon style={{marginLeft:"10%"}} 
                                      onClick = {() => handleOpenDelete(row)}/></TableCell>
                                  
                                <ReminderEditTest
                                  open = {openEdit} 
                                  onClose = {handleCloseEdit} 
                                  id = {(selectedRow || {}).id}
                                  values = {values}
                                  setValues = {setValues}
                                  date = {date}
                                  setDate = {setDate}
                                  stockTicker = {stockTicker}
                                  setTicker = {setTicker}
                                  />   
                                  
                                <ReminderDelete 
                                  open = {openDelete} 
                                  onClose = {handleCloseDelete} 
                                  title = {(selectedRow || {}).title}
                                  rowID={(selectedRow || {}).id}

                                />      
                                </TableRow>
                               
                                </>
                                ))}
                            </TableBody>
                            
                        </Table>
                    )
                }
                <TablePagination
                className={classes.pagination}
                rowsPerPageOptions={[5,10,25,100]}
                component="div"
                count={rows.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
                
            </TableContainer>

    </ThemeProvider>

    
    </Container>
  )
}

export default ReminderInfo