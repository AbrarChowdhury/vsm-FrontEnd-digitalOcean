import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Card from './card/card.component'
import Grid from '@material-ui/core/Grid'
// import data from '../../data'
import axios from 'axios'
import './cards.styles.scss'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
    flexGrow: 1,
  },



})

)

function Cards() {
  const classes = useStyles()
  const [text, setText] = useState('')
  const onChange = (q) => {
    setText(q.toLowerCase())
    console.log(text)
  }

  const [data, setData] = useState([{ bed: 1,_id:null }, { bed: 2 , _id:null }, { bed: 3, _id:null }, { bed: 4, _id:null }, { bed: 5, _id:null }, { bed: 6, _id:null }, { bed: 7, _id:null }, { bed: 8, _id:null }, { bed: 9, _id:null },])


  useEffect(() => {
   

    axios.get(`http://localhost:5000/patient`)
      .then(function (response) {

        let arr = data

        console.log(response.data)

        response.data.map((responseData, index) => {
          data.map((item, index) => {

            if (responseData.bed == item.bed) {
              arr[Number(item.bed) - 1] = responseData
              setData(arr)

            }
          })
        })
        console.log(data);
      })
      .catch(function (error) {
        console.log(error.data);
      })
  }, [])

  
  
  
  return (

    <div className={classes.root}>

      <Grid container spacing={1}>

        {data.map((data,index) =>

          <Grid key={index} item xs={4}>
            <Card data={data} />
          </Grid>
        )}

        
      </Grid>

    </div>
  )
}

export default Cards
