import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar'
import picture from '../../assets/Login.png'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link, NavLink } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import HomeIcon from '@material-ui/icons/Home';


const useStyles = makeStyles(theme => ({

    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    bigAvatar: {
        margin: 'auto',
        width: '50%',
        width: '67px',
        height: '67px'
    },
    link: {
        marginRight: '10px'
    },
    link1: {
        marginRight: '10px'
    }


}))

export default function ButtonAppBar() {
    const classes = useStyles();

    const [personName, setPersonName] = useState()
    const [open, setOpen] = useState(false);

    useEffect(() => {

        setPersonName("Dr. Sarder A. Nayeem")

    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <AppBar position="static" style={{ background: 'linear-gradient(45deg, #55D0B3 30%, #64D7EB 90%)' }}>
                <Toolbar>
                    <IconButton component={Link} to={'/dashboard'} color="inherit">
                        <HomeIcon />
                    </IconButton>

                    <Typography variant="h5" className={classes.title} >
                        VSM Dashboard
                    </Typography>

                    <MenuItem className={classes.link1}  onClick={handleClickOpen} component={Link} to={'/add-patient'}>Add Patient</MenuItem>
                    <MenuItem className={classes.link1}  component={Link} to={'/remove-patient'}>Remove Patient</MenuItem>

                    <div className={classes.link}>

                        <Typography style={{ paddingLeft:'125px' }}>Welcome</Typography>
                        <Typography  variant="h6" >{personName}</Typography>
                        <Typography style={{ textDecoration: 'none',color: '#FFFFFF',paddingLeft:'145px' }} variant="caption" display="block" component={Link} to={'/'}>Sign out</Typography>


                    </div>

                    <Avatar src={picture} className={classes.bigAvatar} />

                </Toolbar>
            </AppBar>
        </>
    );
}