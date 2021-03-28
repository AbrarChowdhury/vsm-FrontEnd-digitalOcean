import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import BioforgeLogo from '../../assets/BioforgeLogo.png'
import { Grid, Button, TextField, Typography, Container, Hidden } from '@material-ui/core';
import './signInForm.styles.scss'



function SignInForm() {
    const { register, handleSubmit, reset, errors } = useForm();
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
        if (values.email === 'admin' && values.password === 'admin123') {
            history.push("dashboard")
        }
        else {
            alert('Wrong Email/Password')
        }
    }

    return (
            <div className="SignInForm"> 
            <Grid container>
                <Hidden smDown>
                <Grid item md={7} lg={8} xl={8} >
                    <div className="bg-image">.</div>
                </Grid>
                </Hidden>
                <Grid item xs={12} md={5} lg={4} xl={4}>
                    <div className="container">
                    <div>                   
                        <div className="logo-container" style={{width:"70px"}}>
                            <img className="logo" src={BioforgeLogo} />
                        </div>
                        <div className="welcome vertical-gap">
                            <Typography variant="h4">Welcome!</Typography>
                            <Typography variant="h4">Lets get started.</Typography>
                        </div>
                        
                        <p className="subtitle margin-bottom"> Vital Signs Monitoring System</p>
                        
                        <div className="inputs vertical-gap">
                            <TextField style={{width:"100%"}}  onChange={handleChange('email')} label="Email Id" variant="outlined" />
                            <br/><br/>
                            <TextField style={{width:"100%"}} onChange={handleChange('password')} label="Password" type="password" variant="outlined" />
                        </div>
                        <Button className="vertical-gap btn-grad"  onClick={clickSubmit}>Log In</Button>
                        </div>    
                        <div className="footer">
                            <p className="subtitle">Powered by</p>
                            <div className="logo-container" style={{width:"30px"}}>
                                <img className="logo" src={BioforgeLogo} />
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
            </div>
    )
}

export default SignInForm
