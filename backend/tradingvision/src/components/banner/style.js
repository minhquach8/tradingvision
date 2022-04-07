import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(() =>({
    banner:{
        backgroundImage: "url(./banner2.jpg)",
    },
    bannerContent:{
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      },
}))

export default useStyles