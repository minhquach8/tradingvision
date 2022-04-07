import {makeStyles} from '@material-ui/core'


const useStyles = makeStyles((theme)=>({
    loading_spinner:{
      marginLeft:"50%",
      marginTop:"20%",
      
   },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "rgba(55,58,109,0.8)",
        '&:hover': {
          backgroundColor: "rgba(55,58,109,0.5)",
        },
        marginRight: theme.spacing(5),
        marginLeft: theme.spacing(5),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(5),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(1, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },

      tablehead:{
        backgroundColor:"rgba(55,58,109,0.8)",
      },
      tablecell:{
        color: "white",
        fontWeight: "700",
        fontFamily: "Montserrat",
        backgroundColor:"rgba(55,58,109)",
      },
      row: {
        cursor: "pointer",
        fontFamily: "Montserrat",
        backgroundColor: "rgba(55,58,109,0.8)",
        '&:hover': {
          backgroundColor: "rgba(55,58,109,0.5)",
      },
    },
      cell:{
        color:'white',
      },
      tableContainer: {
        marginTop: '5%',
        maxHeight: 450,
        marginBottom: '5%',
      },
}))

export default useStyles