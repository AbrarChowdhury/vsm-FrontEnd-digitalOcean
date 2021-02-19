import React, { useState, useEffect } from 'react';
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import Avatar from '@material-ui/core/Avatar'
// import picture from '../../assets/doctor.jpg'
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { useHistory, NavLink } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
// import Grid from '@material-ui/core/Grid';
import HomeIcon from '@material-ui/icons/Home';
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import './Navbar.styles.scss'
import ListItemIcon from '@material-ui/core/ListItemIcon';
export default function ButtonAppBar() {
    const history = useHistory()
    const [personName, setPersonName] = useState()
    const [drawer, setDrawer]=useState(false)
    const openDrawer = ()=> {
        setDrawer(true)
    }
    const closeDrawer = ()=>{
        setDrawer(false)
    }
    const list = () => (
        <div onClick = {closeDrawer}>
            <Button className="nav-link" component={NavLink} to={'/add-patient'}>Add Patient</Button>
            <Button className="nav-link" component={NavLink} to={'/remove-patient'}>Remove Patient</Button>
            <Divider/>
            <Button className="nav-link" component={NavLink} to={'/'}>Sign Out</Button>
        </div>
    )
    useEffect(() => {
        setPersonName("Dr. Sarder A. Nayeem")
    }, [])
    return (
        <div className="nav">
        <div className="Navbar">
            <div className="list">
                <HomeIcon onClick={() => history.push(`/dashboard`)} className="white"/>
                {/*<span onClick={() => history.push(`/dashboard`)} >VSM Dashboard</span>*/}
                <span className="white grid-right">{personName}</span>
                <MenuIcon className="white grid-right" onClick={openDrawer}/>
            </div>
        </div>
        <Drawer anchor={'right'} open={ drawer } onClose={closeDrawer} > 
                {list()}
        </Drawer>
        </div>
    )
}
    {/*    <>
            <AppBar position="static" style={{ background: 'linear-gradient(45deg, #55D0B3 30%, #64D7EB 90%)' }}>
                <Toolbar>
                    <IconButton component={Link} to={'/dashboard'} color="inherit">
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h5">
                        VSM Dashboard
                    </Typography>

                    <MenuItem  component={Link} to={'/add-patient'}>Add Patient</MenuItem>
                    <MenuItem  component={Link} to={'/remove-patient'}>Remove Patient</MenuItem>

                    <div>
                        <Typography style={{ textAlign: "right"}} varient="p">Welcome</Typography>
                        <Typography  variant="h6" >{personName}</Typography>
                        <Typography style={{ textAlign: "right"}} varient="p">Sign out</Typography>
                    </div>
                    <Avatar src={picture} />
                </Toolbar>
            </AppBar>
    </>*/}