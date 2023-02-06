import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Redirect, Route } from "react-router-dom";
import UserAuthHome from "./UserAuthHome";

const UserAuthLogin = (props) => 
{
    const {userAuth} = props
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [formData,setFormData] = useState({})
    const [err,setErr] = useState({})
    localStorage.clear()
    let errObj = {}
    const handleChange = (e) => 
    {
        const input = e.target.name
        if(input == "email")
        {
            setEmail(e.target.value)
        }
        if (input == "password")
        {
            setPassword(e.target.value)
        }
    }
    const validations = () => 
    {
        console.log('email',email)
        console.log('password',password)
        if (!email)
        {            
            errObj = {...errObj,email:`email cannot be blank`}
            //console.log(errObj)
        }
        if(!password)
        {            
            errObj = {...errObj,password:`password cannot be blank`}
            //console.log(errObj)
        }
        //console.log('errObj',errObj)
    }
    const handleSubmit = (e) => 
    {
        e.preventDefault()
        validations()
        if (Object.values(errObj).length != 0)
        {
            setErr(errObj)
        }
        else
        {
            let dataObj = {
                email:email,
                password : password
            }
            //console.log('dataObj',dataObj)
            setFormData(dataObj)         
            let errObj = {}
            setErr(errObj)  
            setEmail('')
            setPassword('')            
        }              
    }
    
    useEffect(() => 
    {   
        //console.log(formData)
        const url = `https://dct-user-auth.herokuapp.com/users/login`
        axios.post(url,formData)
        .then((values) => 
        {
            const result = values.data
            console.log(result)
            if(!(result.hasOwnProperty('errors')))
            { 
                alert('Successfully logged in')
                localStorage.setItem('token',values.data.token)
                userAuth()
                props.history.push('/')
            }
        })
        .catch((err) => 
        {
            console.log(err.message)
        })

    },[formData])
    return(
        <div>
           <h2>Login to your account</h2>
           <form onSubmit={handleSubmit}>
                <input type="text" placeholder="email" name="email" onChange={handleChange} value={email}/><br /><br />
                {(err.email) && (<h3 style={{color:'red'}}>{err.email}</h3>)}
                <input type="text" placeholder="password" name="password" onChange={handleChange} value={password}/><br /><br />
                {(err.password) && (<h3 style={{color:'red'}}>{err.password}</h3>)}
                <input type="submit" value="Login"/>{"  "}<button type="button">Cancel</button>
           </form>
           {/* {(tokenData) && (
                            <div>
                                <Redirect to={`/:${tokenData}`}/>    
                            </div>)}  Because we are doing history.push,the redirect method is commented.*/}  
           
           {/*  {(tokenData) && (<Redirect to={{
            pathname : '/',
            state:{data : tokenData}
           }}
           />)}*/}
           
           
            
        </div>
    )
}
export default UserAuthLogin