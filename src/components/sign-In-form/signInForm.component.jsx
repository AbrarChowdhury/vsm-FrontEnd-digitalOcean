import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import HomePageIMG from '../../assets/Login2.png'
import BioforgeLogo from '../../assets/BioforgeLogo1.png'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    img: {
        [theme.breakpoints.up('xs')]: {
            float: 'left',
            maxWidth: '-webkit-fill-available',
        },
        [theme.breakpoints.up('sm')]: {
            float: 'left',
            maxWidth: '-webkit-fill-available',
        },
        [theme.breakpoints.up('md')]: {
            float: 'left',
            maxWidth: '-webkit-fill-available',
        },
        [theme.breakpoints.up('lg')]: {
            float: 'left',
            height: '-webkit-fill-available',
        },
        [theme.breakpoints.up('xl')]: {
            float: 'left',
            height: '969px',
        },
    },
    img1: {
        [theme.breakpoints.up('xs')]: {
            maxHeight: '141px',
            maxWidth: '111px',
        },
        [theme.breakpoints.up('sm')]: {
            maxHeight: '141px',
            maxWidth: '111px',
        },
        [theme.breakpoints.up('md')]: {
            maxHeight: '141px',
            maxWidth: '111px',
        },
        [theme.breakpoints.up('lg')]: {
            maxHeight: '141px',
            maxWidth: '111px',
            paddingLeft: '65px',
            textAlign: 'left'
        },
        [theme.breakpoints.up('xl')]: {
            paddingTop: '40px',
            maxHeight: '141px',
            maxWidth: '111px',
            paddingLeft: '70px',
            textAlign: 'left'

        },
    },

    notchedOutline: {
        borderWidth: "1px",
        borderColor: "#64D7EB"
    },
    btn: {
        [theme.breakpoints.up('lg')]: {
            background: 'linear-gradient(45deg, #55D0B3 30%, #64D7EB 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 40,
            width: 140,
            padding: '0 40px',
            margin: '30px',
            marginLeft: '375px',
        },
        [theme.breakpoints.up('xl')]: {
            background: 'linear-gradient(45deg, #55D0B3 30%, #64D7EB 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 40,
            // width:40,
            padding: '0 40px',
            margin: '30px',
            marginLeft: '421px',
        }

    },
    text: {
        paddingTop: '20px',
        paddingLeft: '90px',
        textAlign: 'left',

    },
    subtitleText: {
        paddingLeft: '90px',
        textAlign: 'left',
        paddingTop: '30px',
    },
    textField: {
        [theme.breakpoints.up('lg')]: {
            marginTop: '30px',
            marginLeft: '90px',
            width: '420px'
        },
        [theme.breakpoints.up('xl')]: {
            marginTop: '30px',
            marginLeft: '90px',
            width: '469px'

        },

    },
    bottomText: {
        [theme.breakpoints.up('lg')]: {
            textAlign: 'right',
            position: 'absolute',
            bottom: '40px',
            right: '100px',
            // textAlign: 'left',
        },
        [theme.breakpoints.up('xl')]: {
            textAlign: 'right',
            position: 'absolute',
            bottom: '40px',
            right: '100px',
            // textAlign: 'left',
        },
       

    },
    bottomImg: {
        [theme.breakpoints.up('md')]: {
            maxHeight: '141px',
            maxWidth: '111px',
        },
        [theme.breakpoints.up('lg')]: {
            textAlign: 'right',
            position: 'absolute',
            bottom: 0,
            right: 0,
            maxHeight: '141px',
            maxWidth: '111px',
            paddingLeft: '550px',
            // paddingBottom: '20px',
            // textAlign: 'left',
        },
        [theme.breakpoints.up('xl')]: {
            textAlign: 'right',
            position: 'absolute',
            bottom: 0,
            right: 0,
            maxHeight: '141px',
            maxWidth: '111px',
            // paddingLeft: '35px',
            // textAlign: 'left',
        },


    },



})

)

function SignInForm() {
    const { register, handleSubmit, reset, errors } = useForm();

    const classes = useStyles()
    const history = useHistory()

    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const clickSubmit = data => {
        reset()
        console.log(values)
        const { username, password } = values
        if (values.email === 'admin' && values.password === 'admin123') {
            history.push("dashboard")
        }
        else {
            alert('Wrong Email/Password')
        }
    }

    return (
        <>
            <Grid container>

                <Grid item xs={12} md={12} lg={7} xl={7} >
                    <span>
                        <img className={classes.img} src={HomePageIMG} />
                    </span>
                </Grid>


                <Grid item xs={12} md={12} lg={5} xl={5}>


                    <span>
                        <img className={classes.img1} src={BioforgeLogo} />
                    </span>


                    <Typography className={classes.text} style={{ paddingTop: '40px' }} variant="h4">Welcome!</Typography>
                    <Typography className={classes.text} variant="h4">Lets get started.</Typography>
                    <Typography className={classes.subtitleText} display="block" variant="subtitle"> Vital Signs Monitoring System</Typography>


                    <TextField className={classes.textField} onChange={handleChange('email')} label="Email Id" variant="outlined" InputProps={{ classes: { notchedOutline: classes.notchedOutline } }} />
                    <br></br>
                    <TextField className={classes.textField} onChange={handleChange('password')} label="Password" type="password" variant="outlined" InputProps={{ classes: { notchedOutline: classes.notchedOutline } }} />
                    <br></br>

                    <Button onClick={clickSubmit} className={classes.btn}>Log In</Button>
                    <br></br>

                    <Typography display="block" className={classes.bottomText} variant="subtitle"> Powered By:</Typography>
                    <span>
                        <img className={classes.bottomImg} src={BioforgeLogo} />
                    </span>
                </Grid>
            </Grid>




            {/* <form onSubmit={handleSubmit(onSubmit)}>
                    <input name="username" type="text" ref={register} />
                    {errors.name && <span>Please insert the correct password</span>}
                    <br></br>
                    <input name="password" type="password" ref={register({ required: true })} />
                    {errors.password && <span>Please insert the correct password</span>}
                    <br></br>
                    <input type="submit" />
                </form> */}



        </>
    )
}

export default SignInForm
