import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Card from './card/card.component'
import Grid from '@material-ui/core/Grid'
// import data from '../../data'
import './cards.styles.scss'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px',
    flexGrow: 1,
  },
}))

function Cards() {
  const classes = useStyles()
  const history = useHistory() 
  // const [data, setData] = useState([{ bed: 1, _id: null }, { bed: 2, _id: null }, { bed: 3, _id: null }, { bed: 4, _id: null }, { bed: 5, _id: null }, { bed: 6, _id: null }, { bed: 7, _id: null }, { bed: 8, _id: null }, { bed: 9, _id: null },])
  const data = [1,2,3,4,5,6,7,8,9]


  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {data.map((bed, index) =>
          <Grid onClick={() => history.push(`/${bed}`)} key={index} item xs={12} sm={12} md={6} lg={4} xl={4} >
            <Card bed= {bed}/>
          </Grid>
        )}
      </Grid>

    </div>
  )
}

export default Cards
