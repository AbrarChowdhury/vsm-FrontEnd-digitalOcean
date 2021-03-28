import React, { useState, useEffect } from 'react'
import axios from "axios"
import Chart from '../../chart/chart.component'
import './card.styles.scss'
import { Typography } from '@material-ui/core'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import api from '../../../context/api.context'

const ENDPOINT = `http://${api}/`;
const wss = new WebSocket(`ws://${api}`);

function Card({ bed }) {
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
                setTemp(JSON.parse(message.data).temp)
                setHeartRate(JSON.parse(message.data).heartRate)
                setEcg(JSON.parse(message.data).ecg)
                setSpo2(JSON.parse(message.data).spo2)
            } 
        });
    },[]);

    return (
        <div className="Card">
        <div>
            <div className="info-grid">
                <div>
                    <Typography className="blue" variant="subtitle">Bed:</Typography><br/>
                    <Typography variant="subtitle">{bed}</Typography>
                </div>
                <div className="name">
                    <Typography className="blue" variant="subtitle">Name:</Typography><br/>
                    <Typography variant="subtitle">{patientData.name}</Typography>
                </div>
                <div>
                    <Typography className="blue" variant="subtitle">Age:</Typography><br/>
                    <Typography variant="subtitle">{patientData.age}</Typography>
                </div>
                <div>
                    <Typography className="blue" variant="subtitle">Sex:</Typography><br/>
                    <Typography variant="subtitle">{patientData.sex}</Typography>
                </div>
                <div>
                    <Typography className="blue" variant="subtitle">Temp:</Typography><br/>
                    <Typography variant="subtitle">{temp[temp.length-1]}</Typography>
                </div>
                <NotificationsActiveIcon className="bell"></NotificationsActiveIcon>
            </div>
            <div>
                <div className="chart-grid">    
                    <div className="heart-rate green hr-grid">
                        <Typography className="title" variant="p">H-R</Typography>
                        <Typography className="upper" variant="p">150</Typography>
                        <Typography className="lower" variant="p">50</Typography>
                        <Typography className="hr" variant="h2">{heartRate[heartRate.length-1]}</Typography>
                    </div>
                    <div className="ecg-chart">
                        <Chart bed={bed}/>
                        <br/>
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


    </div>
    )
}

export default Card
