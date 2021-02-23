import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom";
import Grid from '@material-ui/core/Grid'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import DeleteButton from "../deleteButton/deleteButton"
import './patient.styles.scss'
import Chart from '../chart/chart.component'
import Navbar from '../NavBar/Navbar'
import { TextField, Typography } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { Redirect, Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Edit from '@material-ui/icons/Edit'
import { sizing } from '@material-ui/system';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import io from "socket.io-client";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  input: {
    width: '100%',
    color: "white",
    '& fieldset': {
      borderColor: '#64D7EB',
      borderWidth: "0.5px",
    },
  }
})
)

const ENDPOINT = 'http://localhost:5000';
let socket;


function UpdatePatientForm({ name, age, sex }) {

  const classes = useStyles()
  let { bed } = useParams();

  const initialState = { name: name,  age: age, sex: sex }
  const [formData, setFormData] = useState(initialState)
  const [patient, setPatient] = useState({})


  useEffect(() => {
    socket = io(ENDPOINT)
    console.log(bed)

    axios.get(`http://localhost:5000/patient/${bed}`)
      .then(function (response) {
        console.log("hello");
        console.log(response.data);
        setPatient(response.data);
      })
      .catch(function (error) {
        console.log("hello");
        console.log(error);
      });

  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("formData: ", formData)

    axios.put(`http://localhost:5000/patient/${bed}`, formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <>
      <div className={classes.root}>
        <Navbar></Navbar>
        <div className={classes.chartBox}>
          <div className={classes.chartText}>
            <Grid container xs={12}>
              <Grid item xs={1} className={classes.textHeader1}>
                <Typography variant="h6" className={classes.textHeader}>Bed No: </Typography>
                <TextField variant="outlined" InputProps={{ className: classes.input }} value={patient.bed}></TextField>
              </Grid>
              <Grid item xs={1} className={classes.textHeader1}>
                <Typography variant="h6" className={classes.textHeader}>Patient Name:</Typography>
                <TextField variant="outlined" InputProps={{ className: classes.input }} value={patient.name}></TextField>
              </Grid>
              <Grid item xs={1} className={classes.textHeader1}>
                <Typography variant="h6" className={classes.textHeader}>Age:</Typography>
                <TextField variant="outlined" InputProps={{ className: classes.input }} value={patient.age}></TextField>
              </Grid>
              <Grid item xs={1} className={classes.textHeader1}>
                <Typography variant="h6" className={classes.textHeader}>Sex:</Typography>
                <TextField variant="outlined" InputProps={{ className: classes.input }} value={patient.sex}></TextField>
              </Grid>
              <Grid item xs={1} className={classes.textHeader1}>
                <Typography variant="h6" className={classes.textHeader}>Temp:</Typography>
                <TextField variant="outlined" InputProps={{ className: classes.input }} value={patient.age}></TextField>
              </Grid>
              <Grid item xs={1} className={classes.textHeader1}>
                <Typography variant="h6" className={classes.textHeader}>Admission-date:</Typography>
                <TextField variant="outlined" InputProps={{ className: classes.input }} value={"22/11/2020"}></TextField>
              </Grid>
              <Grid item xs={1} style={{ maxWidth: '80px' }} className={classes.textHeader1}>
                <Typography variant="h6" className={classes.textHeader}>Diagnosis:</Typography>
                <TextField variant="outlined" InputProps={{ className: classes.input }} value={"22/11/2020"}></TextField>
              </Grid>
              <Link style={{ textDecoration: 'none' }} to={'/' + patient.bed}>
                <Button variant="contained" className={classes.button} >Save</Button>
              </Link>
              <Link style={{ textDecoration: 'none' }} to={'/' + patient.bed}>
                <Button variant="contained" className={classes.buttonCancel} >Cancel</Button>
              </Link>
            </Grid>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdatePatientForm
