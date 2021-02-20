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
import api from '../../../context/api.context'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    chartBox: {
        //margin: '10px 10px 0px 10px',
        // paddingBottom: '40px',
        background: '#0A081A',
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
const ENDPOINT = `http://${api}/`;
const wss = new WebSocket(`ws://${api}`);
function Card({ bed }) {
    const classes = useStyles()
    let history = useHistory()
    const [patientData, setPatientData] = useState({})
    const [temp, setTemp]=useState([0])
    const [heartRate, setHeartRate]=useState([0])
    const [ecg, setEcg]=useState([0])
    const [spo2, setSpo2]=useState([0])

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
        wss.addEventListener('message', (message) => {
            if(JSON.parse(message.data).bedNumber==bed){
                // console.log("hoise: ", JSON.parse(message.data))
                setTemp(JSON.parse(message.data).temp)
                setHeartRate(JSON.parse(message.data).heartRate)
                setEcg(JSON.parse(message.data).ecg)
                setSpo2(JSON.parse(message.data).spo2)
                // console.log(temp)
            } 
        });
    },[]);

    return (
        <div className="Card">
        <div className={classes.chartBox} >

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
                        <Typography variant="subtitle" className={classes.textBody}>{temp[temp.length-1]}</Typography>

                    </Grid>
                    <Grid item xs={1}>


                    </Grid>


                </Grid>
            </div>

            <div className={classes.chart}>
                <Grid container xs={12}>
                    <Grid item xs={10} >
                        <div className="padding-right-large">
                        <Chart bed={bed}/>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className="green hr-grid">
                            <Typography className="title" variant="p">HR</Typography>
                            <Typography className="upper" variant="p">150</Typography>
                            <Typography className="lower" variant="p">50</Typography>
                            <Typography className="hr" variant="h2">{heartRate[heartRate.length-1]}</Typography>
                        </div>
                    </Grid>
                </Grid>
                <Grid container xs={12}>
                    <Grid item xs={12}><Typography variant="h6" style={{ paddingTop: '10px', paddingBottom: "10px" }} className={classes.textHeader} >PLETH</Typography></Grid>
                    <Grid item xs={10} >
                        <div className="padding-right-large">
                            <Chart bed={bed}/>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className="side-by-side blue">
                            <Typography variant="p">Sp02</Typography>
                            <Typography variant="h3">{spo2[spo2.length-1]}</Typography>
                        </div>
                        <div className="side-by-side blue">    
                            <Typography variant="p">Pulse</Typography>
                            <Typography variant="h3">{ecg[ecg.length-1]}</Typography>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>


    </div>
    )
}

export default Card
