import React, {useEffect, useState, useRef} from 'react'
import useStyles from './style'
import {  
  createTheme, 
  ThemeProvider, 
  TableContainer, 
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@material-ui/core'


const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop) 

const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
      fontFamily: "Montserrat",
    },
  });


const SearchTicker = (props) => {
    const classes = useStyles()
    const [loading, setLoading] = React.useState(false)
    const handleOpen = () => setLoading(true);
    const handleClosed = () => setLoading(false);

 

    const rows = props.companies
        .map((company) => {
        return {
          id: company._id,
          ticker: company.Ticker,
          companyName: company.CompanyName,
          industry: company.Industry,
          stockExchange: company.StockExchange,
        };
      
    })
  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer 
            className={classes.tableContainer}
            component={Paper}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead  className={classes.tablehead}
                            rowCount={rows.length}>
                                <TableRow>
                                {["TICKER", "DESCRIPTION", "INDUSTRY", "STOCK EXCHANGE"].map((head) => (
                                    <TableCell
                                    className={classes.tablecell}
                                    key={head}
                                    align={head === "TICKER" ? "" : "left"}
                                    >
                                    {head}
                                    </TableCell>
                                ))}
                                </TableRow>
                            </TableHead>
                    
                            <TableBody>
                                {props.handleSearch(rows)
                                .map((row)=> (
                                    <TableRow                                   
                                    ref = {props.myRef}
                                    className ={classes.row}
                                    onClick={() => {
                                     
                                      props.handleSelection(row.ticker);
                                     
                                    }}
                                    
                                    selected={props.RowID === row.ticker}
                                    key={row.ticker}>
                                    
                                    <TableCell component='th' scope='row'
                                        style={{
                                          fontWeight: 'bold',
                                        }}
                                        className={classes.cell}
                                        onClick={handleClosed}> {row.ticker}
                                        
                                    </TableCell>
                                    <TableCell align="left" className={classes.cell}>{row.companyName}</TableCell>
                                    <TableCell align="left" className={classes.cell}>{row.industry}</TableCell>
                                    <TableCell align="center" className={classes.cell}>{row.stockExchange.toUpperCase()}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
            </TableContainer>
    </ThemeProvider>
  )
}

export default SearchTicker