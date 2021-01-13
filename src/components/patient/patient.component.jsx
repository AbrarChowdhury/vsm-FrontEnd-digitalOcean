import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Grid from '@material-ui/core/Grid'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import UpdatePatientForm from './updatePatientForm.component'
import io from "socket.io-client";
import DeleteButton from "../deleteButton/deleteButton"
import './patient.styles.scss'
import Chart from '../chart/chart.component'
import axios from 'axios'
import Navbar from '../NavBar/Navbar'
import { Typography } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'

import Button from '@material-ui/core/Button'
import Edit from '@material-ui/icons/Edit'

const ENDPOINT = 'http://localhost:5000/';
let socket;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    chartBox: {
        margin: '20px 20px 0px 20px',
        // paddingBottom: '40px',
        background: '#0A081A',
        maxHeight: '784px'
    },
    textHeader: {
        color: '#64D7EB'
    },
    textHeader1: {
        margin: '0px 80px 00px 00px',

    },
    textBody: {
        color: '#FFFFFF'
    },
    chartText: {
        // marginBottom:'50px',
        padding: '40px'
    },
    chart: {
        padding: '20px 40px 40px 40px'
    }



})

)

function Patient() {
    const classes = useStyles()
    let { bed } = useParams();
    const [patient, setPatient] = useState({})
    const [inputValue, setInputValue] = useState('')
    const [vsmData, setVsmData] = useState('')


    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("the value", inputValue)
        socket.emit('vsm', { inputValue })
        setInputValue('')
    }

    useEffect(async () => {
        const result = await axios(
            `${ENDPOINT}patient/${bed}`,
        );
        setPatient(result.data);

    });

    useEffect(() => {
        socket = io(ENDPOINT)
        console.log('stateChanged')
    }, [])

    useEffect(() => {
        socket.on('message', (message) => {
            console.log(message)
        })
    }, [])

    return (
        <>
            <div className={classes.root}>
                <Navbar></Navbar>


                <div className={classes.chartBox}>

                    <div className={classes.chartText}>
                        <Grid container xl={24}>
                            <Grid item xs={1} className={classes.textHeader1}>
                                <Typography variant="h6" className={classes.textHeader}>Bed No: </Typography>
                                <Typography variant="h6" className={classes.textBody}>{patient.bed}</Typography>
                            </Grid>
                            <Grid item xs={1} className={classes.textHeader1}>
                                <Typography variant="h6" className={classes.textHeader}>Patient Name:</Typography>
                                <Typography variant="h6" className={classes.textBody}>{patient.name}</Typography>
                            </Grid>
                            <Grid item xs={1} className={classes.textHeader1}>
                                <Typography variant="h6" className={classes.textHeader}>Age:</Typography>
                                <Typography variant="h6" className={classes.textBody}>{patient.age}</Typography>
                            </Grid>
                            <Grid item xs={1} className={classes.textHeader1}>
                                <Typography variant="h6" className={classes.textHeader}>Sex:</Typography>
                                <Typography variant="h6" className={classes.textBody}>{patient.sex}</Typography>
                            </Grid>
                            <Grid item xs={1} className={classes.textHeader1}>
                                <Typography variant="h6" className={classes.textHeader}>Temp:</Typography>
                                <Typography variant="h6" className={classes.textBody}>{patient.sex}</Typography>
                            </Grid>
                            <Grid item xs={1} className={classes.textHeader1}>
                                <Typography variant="h6" className={classes.textHeader}>Admission-date:</Typography>
                                <Typography variant="h6" className={classes.textBody}>{"22/11/2020"}</Typography>
                            </Grid>
                            <Grid item xs={1} className={classes.textHeader1}>
                                <Typography variant="h6" className={classes.textHeader}>Diagnosis:</Typography>

                            </Grid>
                            <Grid item xs={1}>
                                <Button variant="contained" color="#FFFFFF" className={classes.button} endIcon={<Edit/>}><Typography>Edit</Typography> </Button>

                            </Grid>

                            {/* <Grid item xs={6}>
                            <UpdatePatientForm name={patient.name} age={patient.age} sex={patient.sex} bed={patient.bed} />
                        </Grid> */}
                            {/* <Grid item xs={6}>
                            <DeleteButton bed={bed} />
                        </Grid> */}
                            {/* <Grid item xs={6}>
                            <Typography variant="h5" className={classes.text}>Admission-date: {"22/12/2020"}</Typography>
                        </Grid> */}

                        </Grid>
                    </div>

                    <div className={classes.chart}>
                        <Chart />
                    </div>
                </div>

                {/* <form onSubmit={handleSubmit}>
                    <input type="text" name="input" value={inputValue} onChange={handleChange} />
                    <input type="submit" name="button" />
                </form> */}

                {/* <h1>Data: {vsmData}</h1> */}
            </div>
        </>
    )
}

export default Patient
