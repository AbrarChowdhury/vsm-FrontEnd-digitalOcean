import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from './card/card.component'
import Grid from '@material-ui/core/Grid'
// import data from '../../data'
import axios from 'axios'
import './cards.styles.scss'
function Cards() {
  const [text, setText] = useState('')
  const onChange = (q) => {
    setText(q.toLowerCase())
    console.log(text)
  }
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:5000/patient`)
      .then(function (response) {
        const responseData = response.data;
        setData(responseData)
        console.log(responseData)
      })
      .catch(function (error) {
        console.log(error.data);
      })
  }, [])
  return (
    data.length > 0 ?
      <div className="Cards">
        <h1>VSM Dashboard</h1>
        <Link to="/add-patient">Add Patient</Link>

        <br />
        <Grid container>
          {data.map(data =>
            <Grid item xs={4}>
              <Card bed={data.bed} name={data.name} age={data.age} sex={data.sex} />
            </Grid>
          )}
        </Grid>


      </div>
      :
      <div>
        <h1>No Patients</h1>
        <Link to="/add-patient">Add Patient</Link>
      </div>
  )
}

export default Cards
