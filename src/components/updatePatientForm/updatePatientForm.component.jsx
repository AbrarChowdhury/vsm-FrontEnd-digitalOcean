import React, {useState} from 'react'
import axios from 'axios'

function UpdatePatientForm({bed, name, age, sex}) {
    const initialState={name: name, bed: bed, age: age, sex: sex}
    
    const [formData, setFormData] = useState(initialState)    
    
    const handleSubmit = (e)=>{
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
    
    const handleChange = (e)=>{
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }
    
    return (
      <div>
        <h1>Update patient info on bed {bed}</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name"  value={formData.name} onChange={handleChange}/>
          <input type="text" name="age"  value={formData.age} onChange={handleChange}/>
          <input type="text" name="sex"  value={formData.sex} onChange={handleChange}/>
          <input type="submit" name="button"/>
        </form> 
      </div>
    )
}

export default UpdatePatientForm
