import React, { useState } from 'react'
import axios from 'axios'
import Navbar from '../NavBar/Navbar'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core/'
import CardActionArea from '@material-ui/core/CardActionArea';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../../context/api.context'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  container: {
    margin: '20px 20px 0px 20px',
  },
  textHeader: {
    textAlign: 'center',
    color: '#64D7EB',
    justifyContent: 'center',
  },
  buttons: {
    alignSelf: 'center'
  },

  btn1: {
    background: '#707070',
    '&:hover': {
      backgroundColor: '#707070',
    },
    color: 'white',
    width: 140,

  },
  btn: {
    background: 'linear-gradient(45deg, #55D0B3 30%, #64D7EB 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    width: 140,

  },
  dialogHeader: {
    color: "#707070",
    textAlign: 'center',
  },
  text: {

    textAlign: 'center',

  },

})
)

function RemovePatientForm() {

  const classes = useStyles()

  const [name, setName] = useState('')
  const [open, setOpen] = useState(false);
  const [bedIndex, setBedIndex] = useState('');

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
    // axios.post('http://localhost:5000/patient', formData)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

  }

  const handleClickOpen = (index) => {
    setOpen(true);
    index = index + 1
    setBedIndex(index)
    axios.get(`http://${api}/patient/${index}`)
      .then((response)=>{
        console.log(response.data)
        setName(response.data.name)
      })
      .catch((error)=>console.log(error))
  };

  const handleClose = () => {
    setOpen(false);
    setBedIndex('')
  };

  return (
    <div className={classes.root}>

      <Navbar></Navbar>
      <div className={classes.container}>
        <Grid container spacing={3}>
          {data.map((elem, index) => (
            <Grid item xs={12} sm={6} md={3} xl={4} key={data.indexOf(elem)}>
              <Card >
                <CardActionArea onClick={()=>handleClickOpen(index)} style={{ height: '250px' }} >
                  <CardContent>
                    <Typography className={classes.textHeader} variant="h5" >
                      - Remove
                    </Typography>
                    <Typography className={classes.textHeader} variant="h5" >
                      BED {index + 1}
                    </Typography>

                  </CardContent>
                </CardActionArea>

              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      <Dialog open={open} onClose={handleClose} >
        <DialogTitle className={classes.dialogHeader} >Create a Patient</DialogTitle>
        <DialogContent>
          <Typography className={classes.text} >
            Do you wish to permanently remove bed {bedIndex}?
            </Typography>
            <Typography className={classes.text}>
            It is being occupied by Rafat Islam.
            </Typography>
        </DialogContent>
        <span className={classes.buttons}>
          <DialogActions>
            <Button className={classes.btn} onClick={handleClose} >
              No
          </Button>
            <Button className={classes.btn1} onClick={handleSubmit} color="primary">
              Yes
          </Button>
          </DialogActions>
        </span>
      </Dialog>

    </div>
  )
}

export default RemovePatientForm
