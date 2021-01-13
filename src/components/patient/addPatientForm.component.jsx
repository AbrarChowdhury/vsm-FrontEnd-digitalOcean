import React, {useState} from 'react'
import axios from 'axios'
import Navbar from '../NavBar/Navbar'

function AddPatientForm() {
    const initialState={name: '', bed: '', age: '', sex: ''}
    const [formData, setFormData] = useState(initialState)
    const handleSubmit = (e)=>{
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
    const handleChange = (e)=>{
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    return (
        <div>

        <Navbar></Navbar>

        <h1>Add new Patient</h1>
           <form onSubmit={handleSubmit}>
            <input type="text" name="bed" placeholder="bed number" value={formData.bed} onChange={handleChange}/>
            <input type="text" name="name" placeholder="name" value={formData.name} onChange={handleChange}/>
            <input type="text" name="age" placeholder="age" value={formData.age} onChange={handleChange}/>
            <input type="text" name="sex" placeholder="sex" value={formData.sex} onChange={handleChange}/>
            <input type="submit" name="button"/>
            </form> 
        </div>
    )
}

export default AddPatientForm
