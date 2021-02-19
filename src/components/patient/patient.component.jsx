import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Grid from '@material-ui/core/Grid'
import Collapse from '@material-ui/core/Collapse'
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

    const [checked, setChecked] = useState(false);
    const handleChange = () => {
        setChecked((prev) => !prev);
    };


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
            <div>
                <Navbar/>
                <div className="Patient">
                    <Grid container xs={12}>
                        <Grid  item xs={12}>
                            <Typography variant="p" className="responsive-float">Name: </Typography>
                            <Typography variant="p" className="responsive-float">{patient.name}</Typography>
                        </Grid>
                        <Grid  item xs={6}>
                            <Typography variant="p" className="responsive-float">Bed: </Typography>
                            <Typography variant="p" className="responsive-float">{patient.bed}</Typography>
                        </Grid>
                        <Grid  item xs={6}>
                            <Typography variant="p" className="responsive-float">Temp:</Typography>
                            <Typography variant="p" className="responsive-float">{temp[temp.length-1]}</Typography>
                        </Grid>
                        <Grid  item xs={12}><br/></Grid>
                        <Grid  item xs={6}>
                            <Typography onClick={handleChange} variant="p" className="responsive-float">View {checked?"less":"more"}...</Typography>
                        </Grid>
                        <Grid  item xs={6}>
                            <Button variant="contained" onClick={() => history.push(`/updatePatient/${bed}`)} endIcon={<Edit/>}>
                                <Typography>Edit</Typography>
                            </Button>
                        </Grid>
                            <Collapse in={checked}>
                                <br/>
                                <Grid  item xs={12}>
                                    <Typography variant="p" className="responsive-float">Age:</Typography>
                                    <Typography variant="p" className="responsive-float">{patient.age}</Typography>
                                </Grid>
                                <Grid  item xs={12}>
                                    <Typography variant="p" className="responsive-float">Sex:</Typography>
                                    <Typography variant="p" className="responsive-float">{patient.sex}</Typography>
                                </Grid>
                                <Grid  item xs={12} >
                                    <Typography variant="p" className="responsive-float">Admission:</Typography>
                                    <Typography variant="p" className="responsive-float">{"22/11/2020"}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="p" className="responsive-float">Diagnosis:</Typography>
                                    <Typography variant="p" className="responsive-float">Dr.xyz</Typography>
                                </Grid>
                            </Collapse>
                    </Grid>

                    <div>    
                        <div className="green hr-grid">
                            <Typography className="title" variant="p">H-R</Typography>
                            <Typography className="upper" variant="p">150</Typography>
                            <Typography className="lower" variant="p">50</Typography>
                            <Typography className="hr" variant="h2">{heartRate[heartRate.length-1]}</Typography>
                        </div>
                        <div className="ecg-chart">
                            <Chart bed={bed}/>
                        </div>
                        <div className="side-by-side blue">
                            <Typography variant="p">Sp02</Typography>
                            <Typography variant="h3">{spo2[spo2.length-1]}</Typography>
                        </div>
                        <div className="side-by-side blue">    
                            <Typography variant="p">Pulse</Typography>
                            <Typography variant="h3">{ecg[ecg.length-1]}</Typography>
                        </div>
                        <div className="spo2-chart">
                            <Chart bed={bed}/>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Patient
