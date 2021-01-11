import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import Grid from '@material-ui/core/Grid'
import UpdatePatientForm from '../updatePatientForm/updatePatientForm.component'
import io from "socket.io-client";
import DeleteButton from "../deleteButton/deleteButton"
import './patient.styles.scss'
import Chart from '../chart/chart.component'
import axios from 'axios'

const ENDPOINT = 'http://localhost:5000/';
let socket;


function Patient() {
    let { bed } = useParams();
    const [patient, setPatient]=useState({})
    const [inputValue, setInputValue] = useState('')
    const [vsmData, setVsmData] = useState('')
    
    
    const handleChange = (e)=>{
        setInputValue(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault() 
        console.log("the value",inputValue)
        socket.emit('vsm', {inputValue})          
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
    },[])

    useEffect(()=>{
        socket.on('message',(message)=>{
            console.log( message )
        })
    },[])
    return (
        <div>
            <div className="info-grid">
            <Grid container>
                <Grid item xs={3}>
                    <h1>Bed: {patient.bed}</h1>
                </Grid>
                <Grid item xs={3}>
                    <h2>Name: {patient.name}</h2>    
                </Grid>
                <Grid item xs={3}>
                    <h2>Age: {patient.age}</h2>    
                </Grid>
                <Grid item xs={3}>
                    <h2>Sex: {patient.sex}</h2>
                </Grid>
                <Grid item xs={6}>
                    <UpdatePatientForm name={patient.name} age={patient.age} sex={patient.sex} bed= {patient.bed}/>
                </Grid>
                <Grid item xs={6}>
                    <DeleteButton bed={bed}/>
                </Grid>
                <Grid item xs={6}>
                    <h2>Admission-date: {"22/12/2020"}</h2>
                </Grid>
                <Grid item xs={6}>
                    <h2>Sex: {patient.sex}</h2>
                </Grid>
            </Grid>
            </div>
            
            
            
            
            <div className="chart-container">
                <Chart/>            
            </div>

            <form onSubmit={handleSubmit}>
            <input type="text" name="input" value={inputValue} onChange={handleChange}/>
            <input type="submit" name="button"/>
            </form>

            <h1>Data: {vsmData}</h1>
        </div>
    )
}

export default Patient
