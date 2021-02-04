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
import { Redirect, Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Edit from '@material-ui/icons/Edit'
import { sizing } from '@material-ui/system';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const ENDPOINT = 'http://localhost:8080/';
let socket;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    chartBox: {
        margin: '20px 20px 0px 20px',
        // paddingBottom: '40px',
        background: '#0A081A',
        maxHeight: '840px'
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
    },
    button: {
        marginLeft: '20px',
        padding: '05px 20px 05px 20px',
        backgroundColor: "#FFFFFF"
    },
    ecgTexts: {
        paddingLeft: '20px'
    },
    greenHeaders: {
        color: "#5FFF2D",
    },
    greenHeadersNumbers: {
        color: "#5FFF2D",
        textAlign: 'center',
        fontSize: '5rem',
        paddingTop: '60px'

    },
    greenBottoms: {
        color: "#5FFF2D",
        paddingTop: '70px'
    },
    purpleHeader: {
        color: '#FF1EFD'
    },
    blueHeaders: {
        color: '#00E5FF',
    },
    blueHeadersNumbers: {
        color: "#00E5FF",
        textAlign: 'center',
        // fontSize:'5rem',

    },
    blueBottoms: {
        color: "#00E5FF",
        paddingTop: '40px'
    },
    arrowIcon: {
        fontSize: '6rem',
        color: "#FF1EFD"
    },
    bottomGraphs: {
        justifyContent: 'center',
        paddingTop: '30px'
    }



})

)

function Patient() {
    const classes = useStyles()
    let { bed } = useParams();
    const [patient, setPatient] = useState({})
    const [inputValue, setInputValue] = useState('')
    const [vsmData, setVsmData] = useState('')
    const [redirectToUpdate, setRedirectToUpdate] = useState(false)


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
        let result = await axios.get(
            `${ENDPOINT}patient/${bed}`,
        )
        console.log("result : ", result.data)
        setPatient(result.data);
    },[]);

    // useEffect(()=>{
    //     async function getUser() {
    //         try {
    //           const response = await axios.get('/user?ID=12345');
    //           console.log(response);
    //         } catch (error) {
    //           console.error(error);
    //         }
    //       }
    // },[])

    // useEffect(() => {
    //     socket = io(ENDPOINT)
    //     console.log('stateChanged')
    // }, [])


    // if (redirectToUpdate == true) {
    //     return <Redirect to=`/${bed}/updatePatient` />
    // }

    return (
        <>
            <div className={classes.root}>
                <Navbar></Navbar>


                <div className={classes.chartBox}>

                    <div className={classes.chartText}>
                        <Grid container xs={12}>
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


                                <Link style={{ textDecoration: 'none' }} to={'/updatePatient/' + patient.bed}>
                                    <Button variant="contained" onClick={() => setRedirectToUpdate(true)} className={classes.button} endIcon={<Edit className={classes.textHeader} />}><Typography className={classes.textHeader}>Edit</Typography> </Button>
                                </Link>
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
                        <Grid container xs={12}>
                            <Grid item xs={9}>
                                <Chart />
                                <Typography variant="h6" style={{ paddingTop: '30px', paddingBottom: "30px" }} className={classes.textHeader} >PLETH</Typography>
                                <Chart />
                            </Grid>


                            <Grid item className={classes.ecgTexts} container spacing={1} xs={3}>

                                <Grid item xs={1}>
                                    <Typography variant="h5" className={classes.greenHeaders} >HR</Typography>
                                    <Typography variant="h5" className={classes.greenHeaders} >150</Typography>
                                    <Typography variant="h5" className={classes.greenBottoms} >50</Typography>

                                </Grid>

                                <Grid item xs={5}>
                                    <Typography variant="h2" className={classes.greenHeadersNumbers} >120</Typography>
                                </Grid>

                                <Grid item xs={3}>
                                    <Typography variant="h5" className={classes.greenHeaders} >PVC</Typography>
                                    <Typography variant="h5" className={classes.greenHeaders} >ST-I</Typography>
                                    <Typography variant="h5" className={classes.greenBottoms} >ST-II</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="h5" className={classes.greenHeaders} >0</Typography>
                                    <Typography variant="h5" className={classes.greenHeaders} >?</Typography>
                                    <Typography variant="h5" className={classes.greenBottoms} >-0.8</Typography>
                                </Grid>

                                <Grid item style={{ maxHeight: '10px' }} xs={12}>
                                    <Typography variant="h4" className={classes.purpleHeader} >NBP 109/70 (79)</Typography>
                                </Grid>

                                <Grid item xs={1}>
                                    <Typography variant="h5" className={classes.blueHeaders} >Sp02</Typography>

                                    <Typography variant="h5" className={classes.blueBottoms} >Pulse</Typography>

                                </Grid>

                                <Grid item xs={5}>
                                    <Typography variant="h3" className={classes.blueHeadersNumbers} >120</Typography>
                                    <br></br>
                                    <Typography variant="h3" className={classes.blueHeadersNumbers} >120</Typography>
                                </Grid>

                                <Grid item xs={3}>
                                    <Typography variant="h5" className={classes.blueHeaders} >ST-III</Typography>
                                    <Typography variant="h5" className={classes.blueHeaders} >ST-aVR</Typography>
                                    <Typography variant="h5" className={classes.blueHeaders} >ST-aVL</Typography>
                                    <Typography variant="h5" className={classes.blueHeaders} >ST-aVF</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="h5" className={classes.blueHeaders} >?</Typography>
                                    <Typography variant="h5" className={classes.blueHeaders} >?</Typography>
                                    <Typography variant="h5" className={classes.blueHeaders} >?</Typography>
                                    <Typography variant="h5" className={classes.blueHeaders} >?</Typography>
                                </Grid>

                            </Grid>


                            <Grid xl={12} className={classes.bottomGraphs} container spacing={3}>
                                <Grid item xl={1}>
                                    <ArrowLeftIcon className={classes.arrowIcon}></ArrowLeftIcon>
                                </Grid>
                                <Grid item xl={4} style={{ maxWidth: '360px', }} >
                                    <Chart />
                                </Grid>
                                <Grid item xl={4} style={{ maxWidth: '360px', }}>
                                    <Chart />
                                </Grid>
                                <Grid item xl={4} style={{ maxWidth: '360px', }}>
                                    <Chart />
                                </Grid>
                                <Grid item xl={4} style={{ maxWidth: '360px', }}>
                                    <Chart />
                                </Grid>
                                <Grid item xl={1}>
                                    <ArrowRightIcon className={classes.arrowIcon}></ArrowRightIcon>
                                </Grid>

                            </Grid>




                        </Grid>


                    </div>
                </div>


            </div>
        </>
    )
}

export default Patient
