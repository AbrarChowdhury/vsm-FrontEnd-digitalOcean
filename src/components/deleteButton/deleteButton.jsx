import React from 'react'
import axios from 'axios'
function DeleteButton({bed}) {
    const handleClick=()=>{
        axios.delete(`http://localhost:5000/patient/${bed}`, {
            data: { bed: bed }
           })
    }
    return (
        <div>
            <button onClick={handleClick}>Discharge</button>
        </div>
    )
}

export default DeleteButton
