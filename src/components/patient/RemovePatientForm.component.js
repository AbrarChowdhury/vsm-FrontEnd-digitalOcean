import React, { useState } from 'react'
import axios from 'axios'
import Navbar from '../NavBar/Navbar'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core/'
import GridList from '@material-ui/core/GridList';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  container:{
    margin: '20px 20px 0px 20px',
  },
  textHeader: {
    textAlign:'center',
    color: '#64D7EB',
    justifyContent:'center',
},

})
)

function RemovePatientForm() {

  const classes = useStyles()

  const initialState = { name: '', bed: '', age: '', sex: '' }
  const [formData, setFormData] = useState(initialState)
  const bull = <span className={classes.bullet}>•</span>;
  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
    { quarter: 5, earnings: 19000 },
    { quarter: 6, earnings: 19000 },
    { quarter: 7, earnings: 19000 },
    { quarter: 8, earnings: 19000 },
    { quarter: 9, earnings: 19000 },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("formData: ", formData)

    axios.post('http://localhost:5000/patient', formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setFormData(initialState)

  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div className={classes.root}>

      <Navbar></Navbar>
      <div className={classes.container}>
        <Grid container spacing={3}>
          {data.map((elem,index) => (
            <Grid item xs={12} sm={6} md={3} xl={4} key={data.indexOf(elem)}>
              <Card >
                <CardActionArea onClick={()=>{console.log("hello");}} style={{height:'250px'}} >
                  <CardContent>
                    <Typography className={classes.textHeader} variant="h5" >
                      - Remove
                    </Typography>
                    <Typography className={classes.textHeader} variant="h5" >
                      BED {index+1}
                    </Typography>

                  </CardContent>
                </CardActionArea>

              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
     
    </div>
  )
}

export default RemovePatientForm
