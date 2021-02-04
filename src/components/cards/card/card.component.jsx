import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Chart from '../../chart/chart.component'
import './card.styles.scss'
import Button from '@material-ui/core/Button'
import Edit from '@material-ui/icons/Edit'
import { Redirect, Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    chartBox: {
        //margin: '10px 10px 0px 10px',
        // paddingBottom: '40px',
        background: '#0A081A',
        height: '286px',
        cursor: 'pointer'
    },
    textHeader: {
        color: '#64D7EB'
    },
    textHeader1: {
        margin: '0px 30px 00px 00px',

    },
    textBody: {
        color: '#FFFFFF'
    },
    chartText: {
        // marginBottom:'50px',
        padding: '10px 20px 10px 20px'
    },
    chart: {
        padding: '0px 15px 15px 15px'
    },
    button: {
        marginLeft: '20px',
        padding: '05px 20px 05px 20px',
        backgroundColor: "#FFFFFF"
    },
    ecgTexts: {
        paddingLeft: '5px'
    },
    greenHeaders: {
        color: "#5FFF2D",
        fontSize: '1rem'
    },
    greenHeadersNumbers: {
        color: "#5FFF2D",
        textAlign: 'center',
        fontSize: '2rem',
        paddingTop: '30px'

    },
    greenBottoms: {
        color: "#5FFF2D",
        paddingTop: '20px'
    },
    purpleHeader: {
        fontSize: '1.2rem',
        color: '#FF1EFD',

    },
    blueHeaders: {
        fontSize: '0.9rem',
        color: '#00E5FF',
    },
    blueHeadersNumbers: {
        paddingTop: '10px',
        color: "#00E5FF",
        textAlign: 'center',
        fontSize: '1.5rem',

    },
    blueBottoms: {
        color: "#00E5FF",
        paddingTop: '15px',
        fontSize: '0.9rem',
    },
    notificationIcon: {
        margin: '2px 10px 00px 00px',
        color: '#FFFFFF'
    },
    maxHeight: {
        padding: '20px',
        height: '25%'
    }



})

)
const ENDPOINT = 'http://localhost:8080/';
function Card({ bed }) {
    const classes = useStyles()
    let history = useHistory()
    const [patientData, setPatientData] = useState({})
    useEffect(() => {
        axios.get(`${ENDPOINT}patient/${bed}`)
        .then((response)=>{
            console.log(response.data)
            if(response.data){
                setPatientData(response.data)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    },[]);

    return (

        <div className={classes.chartBox}>

            <div className={classes.chartText}>
                <Grid container xs={12}>
                    <Grid item xs={2} className={classes.textHeader1}>
                        <Typography variant="subtitle" className={classes.textHeader}>Bed No:</Typography>

                    </Grid>
                    <Grid item xs={3} className={classes.textHeader1}>
                        <Typography variant="subtitle" className={classes.textHeader}>Patient Name:</Typography>

                    </Grid>
                    <Grid item xs={1} className={classes.textHeader1}>
                        <Typography variant="subtitle" className={classes.textHeader}>Age:</Typography>

                    </Grid>
                    <Grid item xs={1} className={classes.textHeader1}>
                        <Typography variant="subtitle" className={classes.textHeader}>Sex:</Typography>

                    </Grid>
                    <Grid item xs={1} className={classes.textHeader1}>
                        <Typography variant="subtitle" className={classes.textHeader}>Temp:</Typography>
DZS1WQA

                    </Grid>

                    <NotificationsActiveIcon className={classes.notificationIcon}></NotificationsActiveIcon>
                    <Grid item xs={2} style={{ marginRight: '30px' }}>
                        <Typography variant="subtitle" className={classes.textBody}>{bed}</Typography>

                    </Grid>
                    <Grid item xs={3} style={{ marginRight: '32px' }}>
                        <Typography variant="subtitle" className={classes.textBody}>{patientData.name}</Typography>

                    </Grid>
                    <Grid item xs={1} style={{ marginRight: '30px' }}>
                        <Typography variant="subtitle" className={classes.textBody}>{patientData.age}</Typography>

                    </Grid>
                    <Grid item xs={1} style={{ marginRight: '30px' }}>
                        <Typography variant="subtitle" className={classes.textBody}>{patientData.sex}</Typography>

                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant="subtitle" className={classes.textBody}>temp</Typography>

                    </Grid>
                    <Grid item xs={1}>


                    </Grid>


                </Grid>
            </div>

            <div className={classes.chart}>
                <Grid container xs={12}>

                    <Grid item xs={8}>
                        <Chart />
                        <Typography variant="h6" style={{ paddingTop: '10px', paddingBottom: "10px" }} className={classes.textHeader} >PLETH</Typography>
                        <Chart />
                    </Grid>


                    <Grid item className={classes.ecgTexts} container spacing={1} xs={4}>

                        <Grid item xs={2}>
                            <Typography variant="h6" className={classes.greenHeaders} >HR</Typography>
                            <Typography variant="h6" className={classes.greenHeaders} gutterBottom >150</Typography>
                            <Typography variant="h6" className={classes.greenHeaders} >50</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography variant="h2" className={classes.greenHeadersNumbers} >120</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6" className={classes.greenHeaders} >PVC</Typography>
                            <Typography variant="h6" className={classes.greenHeaders} gutterBottom>ST-I</Typography>
                            <Typography variant="h6" className={classes.greenHeaders} >ST-II</Typography>
                        </Grid>
                        <Grid item xs={2} style={{ paddingLeft: '20px' }} >
                            <Typography variant="h6" className={classes.greenHeaders} >0</Typography>
                            <Typography variant="h6" className={classes.greenHeaders} gutterBottom>?</Typography>
                            <Typography variant="h6" className={classes.greenHeaders} >-0.8</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6" className={classes.purpleHeader} >NBP 109/70 (79)</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <Typography variant="h6" className={classes.blueHeaders} gutterBottom >Sp02</Typography>
                            <Typography variant="h6" className={classes.blueBottoms} >Pulse</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography variant="h3" className={classes.blueHeadersNumbers} >97</Typography>
                            <Typography variant="h3" className={classes.blueHeadersNumbers} >118</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography variant="h5" className={classes.blueHeaders} >ST-III</Typography>
                            <Typography variant="h5" className={classes.blueHeaders} >ST-aVR</Typography>
                            <Typography variant="h5" className={classes.blueHeaders} >ST-aVL</Typography>
                            <Typography variant="h5" className={classes.blueHeaders} >ST-aVF</Typography>
                        </Grid>

                        <Grid item xs={1}>
                            <Typography variant="h5" className={classes.blueHeaders} >?</Typography>
                            <Typography variant="h5" className={classes.blueHeaders} >?</Typography>
                            <Typography variant="h5" className={classes.blueHeaders} >?</Typography>
                            <Typography variant="h5" className={classes.blueHeaders} >?</Typography>
                        </Grid>



                    </Grid>


                </Grid>


            </div>
        </div>



    )
}

export default Card
