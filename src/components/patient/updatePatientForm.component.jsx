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

    width: '100px',
    margin: '10px 10px 0px 0px',
    // marginRight: '60px',
    // padding: '05px 20px 05px 20px',
    backgroundColor: "#FFFFFF",
    color: '#64D7EB',
  },
  buttonCancel: {
    background: '#91989A',
    '&:hover': {
      backgroundColor: '#91989A',
    },
    color: 'white',
    width: '100px',
    margin: '10px 10px 0px 0px',
    // marginRight: '60px',
    // padding: '05px 20px 05px 20px',

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
  },
  input: {
    width: '140px',
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

  useEffect(() => {
    socket.on('message', (message) => {
      console.log(message)
    })
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
                <Button variant="contained" className={classes.button} >Save </Button>
              </Link>
              <Link style={{ textDecoration: 'none' }} to={'/' + patient.bed}>
                <Button variant="contained" className={classes.buttonCancel} >Cancel </Button>
              </Link>


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
    // <div>
    //   <h1>Update patient info on bed {bed}</h1>
    //   <form onSubmit={handleSubmit}>
    //     <input type="text" name="name"  value={formData.name} onChange={handleChange}/>
    //     <input type="text" name="age"  value={formData.age} onChange={handleChange}/>
    //     <input type="text" name="sex"  value={formData.sex} onChange={handleChange}/>
    //     <input type="submit" name="button"/>
    //   </form> 
    // </div>
  )
}

export default UpdatePatientForm
