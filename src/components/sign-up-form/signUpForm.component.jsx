import React from 'react'
import {useHistory} from 'react-router-dom';
import { useForm } from "react-hook-form";
function SignUpForm() {
    const { register, handleSubmit, reset, errors } = useForm();
    const history=useHistory()
    const onSubmit = data => {
        reset() 
        console.log(data)
        const { username, password } = data
        if(username==='admin' && password==='admin123'){
            history.push("dashboard")
        }
    }
    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="username" type="text" ref={register} />
            {errors.name && <span>Please insert the correct password</span>}
            <br></br>
            <input name="password" type="password" ref={register({ required: true })} />
            {errors.password && <span>Please insert the correct password</span>}
            <br></br>
            <input type="submit" />
        </form>
        </div>
    )
}

export default SignUpForm
