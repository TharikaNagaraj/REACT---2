import React,{useState,useEffect} from "react";
import axios from "axios";
import * as EmailValidator from 'email-validator'
import {Redirect} from 'react-router-dom'


const UserAuthRegister = (props) =>
{
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [pwd,setPwd] = useState('')
    const [errMsg,setErrMsg] = useState({})
    const [formSubmitData,setFormSubmitData] = useState({})
    const [serverResponse,setServerResponse] = useState([])    
    let errObj = {}
    let formData = {}
    const handleChange = (e) => 
    {
       const inputName = e.target.name
       if(inputName == "userName")
       {
            setName(e.target.value)
       }
       else if(inputName == "userEmail")
       {
            setEmail(e.target.value)
       }
       else
       {
            setPwd(e.target.value)
       }
    }
    const validations = () => 
    {
        console.log('name',name)
        console.log('email',email)
        console.log('pwd',pwd)
        if (!name)
        {
            errObj = {...errObj,nameErr:`name cannot be blank`}
            console.log('errObj-name',errObj)
        }
        else
        {   
            errObj = {}
        }
        if(!email)
        {
            errObj = {...errObj,emailErr:`Email cannot be blank`}
            console.log('errObj-email',errObj)
        }
        else if (!EmailValidator.validate(email))
        {
            errObj = {...errObj,emailErr:`email format not proper`}
            console.log('errObj-email',errObj)
        }
        if (!pwd)
        {
            errObj = {...errObj,pwdErr:`password cannot be blank`}
            console.log('errObj-pwd',errObj)
        }
        else if  (!((pwd.length >= 8) && (pwd.length <= 128)))
        {
            errObj = {...errObj,pwdErr:`password length should be between 8 and 128 characters`}
            console.log('errObj-pwd',errObj)
        }
        console.log('errObjValues',Object.values(errObj))
        console.log('errorObjValueslength',Object.values(errObj).length)
    }
    
    
    const handleSubmit = (e) => 
    {
        e.preventDefault()
        validations()
        if(Object.values(errObj).length == 0)
        {
            formData = {
            username : name,
            email : email,
            password : pwd
            }
            console.log('formData',formData)
            setFormSubmitData(formData)
            setName('')
            setEmail('')
            setPwd('')
            errObj = {}
            setErrMsg(errObj)
        }
        else
        {
            setErrMsg(errObj)
            // setName('')
            // setEmail('')
            // setPwd('')
        }
        
    }

    const handleCancel = (e) => 
    {
        setName('')
        setEmail('')
        setPwd('')
        errObj = {}
        setErrMsg(errObj)
    }
    
    useEffect(() => 
    {
        console.log(`hi`)
        const url = `https://dct-user-auth.herokuapp.com/users/register`
        axios.post(url,formSubmitData)
        .then((ele) => 
        {
            console.log(ele.data)
            const result = ele.data
            if(result.hasOwnProperty('errors')) //This is a status 200 OK message which fails.THis has to be handles by .then
                                                //and not .catch(.catch will not catch this promise because it is OK status but 
                                                //failed and has errors object in it.THis is why it is very essential to console.log
                                                //the data before doing a state update.)
            {
                alert(result.message)
            }
            else
            {
                alert('Your account has been successfully created.You can now login to your account')
                //props.history.push('/login')
                //The above method can be used instead of Redirect.Both are the same.
                setServerResponse(result) 
            }
            
                   
        })
        .catch((err) => 
        {
            console.log(err.message)
        })
    },[formSubmitData])

   
    
    return(
        <div>
            <h2>Register with us</h2>
            <form onSubmit = {handleSubmit}>
                <input type="text" placeholder="Enter username" name="userName" value={name} onChange={handleChange} /><br /><br />
                {/*  */}{(errMsg.nameErr) && (<h3 style={{color:'red'}}>{errMsg.nameErr}</h3>)}
                <input type="text" placeholder="Enter email" name="userEmail" value={email} onChange={handleChange}/><br /><br />
                {/*  */}{(errMsg.emailErr) && (<h3 style={{color:'red'}}>{errMsg.emailErr}</h3>)}  
                <input type="text" placeholder="Enter password" name="userPwd" value={pwd} onChange={handleChange}/><br /><br />
                {/*   */}{(errMsg.pwdErr) && (<h3 style={{color:'red'}}>{errMsg.pwdErr}</h3>)} 
                <input type="submit"/> {"   "} <button onClick={handleCancel} type="button">Cancel</button>
            </form>
            {(serverResponse._id) && (
                <div>
                    <Redirect to='/login'/>
                </div>)}
        </div>
    )
}
export default UserAuthRegister