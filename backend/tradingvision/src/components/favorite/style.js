import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme)=>({
    tablehead:{
        backgroundColor:"black",
      },
      tablecell:{
        color: "white",
        fontWeight: "700",
        fontFamily: "Montserrat",
        backgroundColor:"black",
        borderBottom: "1.5px solid #AEAEAE",
      },
      row: {
        cursor: "pointer",
        fontFamily: "Montserrat",
        backgroundColor: "black",
        
        '&:hover': {
          backgroundColor: "rgba(55,58,109,0.5)",
      },
    },
      cell:{
        color:'white',
        fontFamily:'Montserrat',
      },
      tableContainer: {
        marginTop: "5%",
        maxHeight: 500,
        marginBottom: "10%",
        border: "2px solid #AEAEAE",
      },
    pagination: {
        backgroundColor: "black",
    },
    // ------ Popup Set Reminder --------------
    line:{
      border: 'solid orange',
      height: '1.4px',
      width: '150px',
      marginTop: '-2%',
      marginLeft: '4%',
      backgroundColor: 'orange',
    },
    dialog_content: {
      marginTop: "2%",
    },
    calendar:{
      color:"black"
    },
    reminder:{
      padding:"2%"
    },
    btn:{
      marginBottom: "3%",
      marginRight: "2%",
    },
    btn_Save: {
      backgroundColor:"#00FF00",
      "&:hover":{
        backgroundColor:"#00A300",
      }
    },
    btn_Cancel: {
      backgroundColor:"#868B8E",
      "&:hover":{
        backgroundColor:"#4E4F50",
      }
    }

}))

export default useStyles