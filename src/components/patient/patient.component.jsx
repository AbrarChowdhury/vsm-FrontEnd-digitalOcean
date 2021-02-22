import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
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
                    <div className="info-grid">
                        <div className="bed">
                            <Typography variant="p" className="responsive-float blue">Bed:</Typography>
                            <Typography variant="p" className="responsive-float">{patient.bed}</Typography>
                        </div>
                        <div className="name">
                            <Typography variant="p" className="responsive-float blue">Name:</Typography>
                            <Typography variant="p" className="responsive-float">{patient.name}</Typography>
                        </div>
                        <div className="temp">
                            <Typography variant="p" className="responsive-float blue">Temp:</Typography>
                            <Typography variant="p" className="responsive-float">{temp[temp.length-1]}</Typography>
                        </div>
                        <div className="edit-btn">
                            <Button variant="contained" onClick={() => history.push(`/updatePatient/${bed}`)} endIcon={<Edit/>}>
                                <Typography>Edit</Typography>
                            </Button>
                        </div>
                        <div className="age">
                            <Typography variant="p" className="responsive-float blue">Age:</Typography>
                            <Typography variant="p" className="responsive-float">{patient.age}</Typography>
                        </div>
                        <div className="sex" >
                            <Typography variant="p" className="responsive-float blue">Sex:</Typography>
                            <Typography variant="p" className="responsive-float">{patient.sex}</Typography>
                        </div>
                        <div className="admission" >
                            <Typography variant="p" className="responsive-float blue">Admission:</Typography>
                            <Typography variant="p" className="responsive-float">{"22/11/2020"}</Typography>
                        </div>
                        <div className="diagnosis">
                            <Typography variant="p" className="responsive-float blue">Diagnosis:</Typography>
                            <Typography variant="p" className="responsive-float">Dr.xyz</Typography>
                        </div>   
                    </div>
                    <div className="collapsible">
                        <Collapse in={checked}>
                            <div className="age-c">
                                <Typography variant="p" className="responsive-float blue">Age:</Typography>
                                <Typography variant="p" className="responsive-float">{patient.age}</Typography>
                            </div>
                            <div className="sex-c" >
                                <Typography variant="p" className="responsive-float blue">Sex:</Typography>
                                <Typography variant="p" className="responsive-float">{patient.sex}</Typography>
                            </div>
                            <div className="admission-c" >
                                <Typography variant="p" className="responsive-float blue">Admission:</Typography>
                                <Typography variant="p" className="responsive-float">{"22/11/2020"}</Typography>
                            </div>
                            <div className="diagnosis-c">
                                <Typography variant="p" className="responsive-float blue">Diagnosis:</Typography>
                                <Typography variant="p" className="responsive-float">Dr.xyz</Typography>
                            </div>   
                        </Collapse>
                        <div className="view-more">
                            <Typography onClick={handleChange} variant="p" className="responsive-float blue">View {checked?"less":"more"}...</Typography>
                        </div>
                    </div>
                    <div className="chart-grid">    
                        <div className="heart-rate green hr-grid">
                            <Typography className="title" variant="p">H-R</Typography>
                            <Typography className="upper" variant="p">150</Typography>
                            <Typography className="lower" variant="p">50</Typography>
                            <Typography className="hr" variant="h2">{heartRate[heartRate.length-1]}</Typography>
                        </div>
                        <div className="ecg-chart">
                            <Chart bed={bed}/>
                            <br/><br/><br/>
                        </div>
                        <div className="sp02 side-by-side blue">
                            <Typography variant="p">Sp02</Typography>
                            <Typography variant="h3">{spo2[spo2.length-1]}</Typography>
                        </div>
                        <div className="pulse side-by-side blue">    
                            <Typography variant="p">Pulse</Typography>
                            <Typography variant="h3">{ecg[ecg.length-1]}</Typography>
                        </div>
                        <div className="sp02-chart">
                            <Chart bed={bed}/>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Patient
