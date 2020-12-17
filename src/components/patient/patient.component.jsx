import React from 'react'
import { useParams } from "react-router-dom";
import data from '../../data'
import './patient.styles.scss'
import Chart from '../chart/chart.component'
function Patient() {
    let { bed } = useParams();
    const patient = data.find(patient => patient.bed === parseInt(bed))
    return (
        <div>
            <h1>Bed: {patient.bed}</h1>
            <h2>Name: {patient.name}</h2>
            <h2>Age: {patient.age}</h2>
            <h2>Sex: {patient.sex}</h2>
            <div className="chart-container">
                <Chart/>            
            </div>
        </div>
    )
}

export default Patient
