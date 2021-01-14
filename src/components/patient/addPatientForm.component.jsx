import React, { useState } from 'react'
import axios from 'axios'
import Navbar from '../NavBar/Navbar'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
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
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#64D7EB"
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
  textField: {

    marginBottom: '20px',

  },
  dialogHeader: {
    color:"#707070",
    textAlign: 'center',
  },
  buttons: {
    alignSelf: 'center',
  }

})
)

function AddPatientForm() {

  const classes = useStyles()

  const [bedIndex, setBedIndex] = useState();
  const initialState = { name: '', bed: '', age: '', sex: '' }
  const [formData, setFormData] = useState(initialState)
  const [open, setOpen] = useState(false);



  const [values, setValues] = useState({
    bed: '',
    Name: '',
    Age: '',
    Sex: '',
  })

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

    const newPatient = {
      bed: bedIndex || undefined,
      name: values.Name || undefined,
      age: values.Age || undefined,
      sex: values.Sex || undefined,

    }


    console.log("formData: ", values)



    axios.post('http://localhost:5000/patient', newPatient)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setFormData(initialState)

  }
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  // const handleChange = (e) => {
  //   const { name, value } = e.target
  //   setFormData({ ...formData, [name]: value })
  // }
  const handleClickOpen = (index) => {
    setOpen(true);
    index = index + 1
    setBedIndex(index)
    console.log(index);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>

      <Navbar></Navbar>
      <div className={classes.container}>
        <Grid container spacing={3}>
          {data.map((elem, index) => (
            <Grid item xs={12} sm={6} md={3} xl={4} key={data.indexOf(elem)}>
              <Card >
                <CardActionArea onClick={() => handleClickOpen(index)} style={{ height: '250px' }} >
                  <CardContent>
                    <Typography className={classes.textHeader} variant="h5" >
                      + ADD
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
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle className={classes.dialogHeader} >Create a Patient</DialogTitle>
        <DialogContent>
          <TextField autoFocus className={classes.textField} onChange={handleChange('Name')} fullWidth label="First Name" variant="outlined" InputProps={{ classes: { notchedOutline: classes.notchedOutline } }} />
          <TextField className={classes.textField} fullWidth label="Last Name" variant="outlined" InputProps={{ classes: { notchedOutline: classes.notchedOutline } }} />
          <TextField className={classes.textField} fullWidth onChange={handleChange('Age')} label="Age" variant="outlined" InputProps={{ classes: { notchedOutline: classes.notchedOutline } }} />
          <TextField className={classes.textField} fullWidth onChange={handleChange('Sex')} label="Sex" variant="outlined" InputProps={{ classes: { notchedOutline: classes.notchedOutline } }} />
          <TextField className={classes.textField} fullWidth label="Diagnosis" variant="outlined" InputProps={{ classes: { notchedOutline: classes.notchedOutline } }} />
          <TextField className={classes.textField} fullWidth label="Admission Date" variant="outlined" InputProps={{ classes: { notchedOutline: classes.notchedOutline } }} />
          <TextField className={classes.textField} fullWidth label="Consultant, Department" variant="outlined" InputProps={{ classes: { notchedOutline: classes.notchedOutline } }} />
          <TextField className={classes.textField} fullWidth label="Duty Doctor" variant="outlined" InputProps={{ classes: { notchedOutline: classes.notchedOutline } }} />
        </DialogContent>
        <span className={classes.buttons}>
          <DialogActions>
            <Button className={classes.btn1} onClick={handleClose} >
              Cancel
          </Button>
            <Button className={classes.btn} onClick={handleSubmit} color="primary">
              Save
          </Button>
          </DialogActions>
        </span>
      </Dialog>

      {/* <h1>Add new Patient</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="bed" placeholder="bed number" value={formData.bed} onChange={handleChange} />
        <input type="text" name="name" placeholder="name" value={formData.name} onChange={handleChange} />
        <input type="text" name="age" placeholder="age" value={formData.age} onChange={handleChange} />
        <input type="text" name="sex" placeholder="sex" value={formData.sex} onChange={handleChange} />
        <input type="submit" name="button" />
      </form> */}
    </div>
  )
}

export default AddPatientForm
