import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Grid from '@material-ui/core/Grid'
import './patient.styles.scss'
import Chart from '../chart/chart.component'
import axios from 'axios'
import Navbar from '../NavBar/Navbar'
import { Typography } from '@material-ui/core'
import { Redirect, Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Edit from '@material-ui/icons/Edit'
import api from '../../context/api.context'
import { useHistory } from "react-router-dom";
const ENDPOINT = `http://${api}/`;
const wss = new WebSocket(`ws://${api}`);

function Patient() {
    let { bed } = useParams();
    const history = useHistory() 
    const [patient, setPatient] = useState({})
    const [inputValue, setInputValue] = useState('')
    const [vsmData, setVsmData] = useState('')
    const [redirectToUpdate, setRedirectToUpdate] = useState(false)
    
    const [patientData, setPatientData] = useState({})
    const [temp, setTemp]=useState([0])
    const [heartRate, setHeartRate]=useState([0])
    const [ecg, setEcg]=useState([0])
    const [spo2, setSpo2]=useState([0])

    useEffect(async () => {
        let result = await axios.get(
            `${ENDPOINT}patient/${bed}`,
        )
        setPatient(result.data);
        wss.addEventListener('message', (message) => {
            if(JSON.parse(message.data).bedNumber==bed){
                console.log("hoise: ", JSON.parse(message.data))
                setTemp(JSON.parse(message.data).temp)
                setHeartRate(JSON.parse(message.data).heartRate)
                setEcg(JSON.parse(message.data).ecg)
                setSpo2(JSON.parse(message.data).spo2)
                // console.log(temp)
            } 
        });
    },[]);
    return (
            <div className="Patient">
                {/*<Navbar>*/}
                <div>
                    <Grid container xs={12}>
                        <Grid  item xs={12}>
                            <Typography variant="h6" className="responsive-float">Name: </Typography>
                            <Typography variant="h6" className="responsive-float">{patient.name}</Typography>
                        </Grid>
                        <Grid  item xs={4}>
                            <Typography variant="h6" className="responsive-float">Bed: </Typography>
                            <Typography variant="h6" className="responsive-float">{patient.bed}</Typography>
                        </Grid>
                        <Grid  item xs={4}>
                            <Typography variant="h6" className="responsive-float">Temp:</Typography>
                            <Typography variant="h6" className="responsive-float">{temp[temp.length-1]}</Typography>
                        </Grid>
                        <Grid  item xs={4}>
                            <Typography variant="h6" className="responsive-float">Age:</Typography>
                            <Typography variant="h6" className="responsive-float">{patient.age}</Typography>
                        </Grid>
                        <Grid  item xs={4}>
                            <Typography variant="h6" className="responsive-float">Sex:</Typography>
                            <Typography variant="h6" className="responsive-float">{patient.sex}</Typography>
                        </Grid>
                        <Grid  item xs={8} >
                            <Typography variant="h6" className="responsive-float">Admission:</Typography>
                            <Typography variant="h6" className="responsive-float">{"22/11/2020"}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" className="responsive-float">Diagnosis:</Typography>
                            <Typography variant="h6" className="responsive-float">Dr.xyz</Typography>
                        </Grid>
                        <Grid  item xs={12}>
                            <Button className="full-width" variant="contained" onClick={() => history.push(`/updatePatient/${bed}`)} endIcon={<Edit/>}>
                                <Typography>Edit</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <div>
                        <Grid container xs={12}>
                            <Grid item>
                                {/*<Chart bed={bed}/>*/}
                                <Typography variant="h6" style={{ paddingTop: '30px', paddingBottom: "30px" }}>PLETH</Typography>
                                {/*<Chart bed={bed}/>*/}
                            </Grid>
                            
                                <div className="green hr-grid">
                                    <Typography className="title" variant="p">HR</Typography>
                                    <Typography className="upper" variant="p">150</Typography>
                                    <Typography className="lower" variant="p">50</Typography>
                                    <Typography className="hr" variant="h2">{heartRate[heartRate.length-1]}</Typography>
                                </div>
                                <div className="side-by-side blue">
                                    <Typography variant="h6">Sp02</Typography>
                                    <Typography variant="h3">{spo2[spo2.length-1]}</Typography>
                                </div>
                                <div className="side-by-side blue">    
                                    <Typography variant="h6">Pulse</Typography>
                                    <Typography variant="h3">{ecg[ecg.length-1]}</Typography>
                                </div>
                            
                        </Grid>
                    </div>
                </div>
            </div>
    )
}

export default Patient
