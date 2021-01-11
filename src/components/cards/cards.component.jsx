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
    padding:'20px',
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

  const [data, setData] = useState([{ bed: 1 }, { bed: 2 }, { bed: 3 }, { bed: 4 }, { bed: 5 }, { bed: 6 }, { bed: 7 }, { bed: 8 }, { bed: 9 },])
  

  useEffect(() => {
    axios.get(`http://localhost:5000/patient`)
      .then(function (response) {
      

        let arr = data

        console.log(response.data)

        response.data.map((responseData,index)=>{

          data.map((item,index)=>{

            if(responseData.bed==item.bed){
              arr[Number(item.bed)-1]=responseData
              setData(arr)
            }
          })
        })
        // console.log(responseData)
      })
      .catch(function (error) {
        console.log(error.data);
      })
  }, [data])

  return (

    <div className={classes.root}>
     
          <Grid container>
            {data.map(data =>
              <Grid item xs={4}>
                <Card bed={data.bed} name={data.name} age={data.age} sex={data.sex} />
              </Grid>
            )}
          </Grid>
      
    </div>
  )
}

export default Cards
