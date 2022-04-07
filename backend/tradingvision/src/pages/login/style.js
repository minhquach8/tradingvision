import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
    container:{
        backgroundImage: "url(./bg.jpg)",
        marginBottom:"-30px",
        padding: "15%",
        height: "100%",
    },
    content: {
        backgroundColor: "white",
        height: "350px",
        width: "450px",
        paddingTop: 15,
        marginBottom: 20,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.up('sx')]: {
            height: "150px",
            width: '200px',
          },
    },
    title:{
        fontFamily: "Montserrat",
        fontSize: "28px",
        fontWeight: "bold",
        color: "black",
        marginTop:"10%",
        marginLeft:"38%",
        marginBottom: "2%",
        left: "50%",
        right: "50%",
    },
    line:{
        backgroundColor: '#6DF2D0',
        height: "4px",
        width: "150px",
        marginLeft:"33%",
        marginBottom: "10%",
        left: "50%",
        right: "50%",
    },
    Facebook:{
        marginBottom: "15%",
        display: "flex",
        justifyContent: "center",
        alignItems:'center',
    },
    Google:{
        marginBottom: "10%",
        display: "flex",
        justifyContent: "center",
        alignItems:'center'
    },
    btn_fb:{
        color: 'white',
        backgroundColor: '#3B5998',
        fontFamily: "Montserrat",
        width: "300px",
        "&:hover": {
            backgroundColor: 'rgba(59, 89, 152,0.9)'
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: '300px',
          },
        [theme.breakpoints.up('sx')]: {
        marginLeft: theme.spacing(3),
        width: '200px',
        },
    },
    btn_gg:{
        color: 'white',
        backgroundColor: '#F65314',
        fontFamily: "Montserrat",
        justifyContent: "center",
        width: "400px",
        "&:hover": {
            backgroundColor: 'rgba(246, 83, 20,0.9)'
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: '300px',
          },
        [theme.breakpoints.up('sx')]: {
        marginLeft: theme.spacing(3),
        width: '150px',
        },
    },
    icon: {
        marginRight: "4%",
    },

}))


export default useStyles