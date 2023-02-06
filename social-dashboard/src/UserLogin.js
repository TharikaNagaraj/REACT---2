import React, { useEffect, useState } from 'react'
import * as EmailValidator from 'email-validator'
import axios from 'axios'
import { Link,Route} from 'react-router-dom'
import UserDashboard from './UserDashboard'

const UserLogin = (props) => 
{
    const [email,setEmail] = useState("")
    const [loginData,setLoginData] = useState("")
    const [errors,setErrors] = useState("")
    const {userAuth} = props
    //console.log('loggedin',loggedIn)

    useEffect(() => 
    {
        const url = 'https://jsonplaceholder.typicode.com/users'
        if(loginData)
        {
            axios.get(url)
        .then((response) => 
        {
            const data = response.data
            console.log(data)
            const result = data.filter((ele) => 
            {
                return(ele.email == email)
            })
            console.log('result',result)
            console.log('object',Object.keys(result).length)
            if(Object.keys(result).length == 0)
            {
                setErrors(`Email doesn't exist`)
            }
            else
            {
                let userObj = {}
                result.forEach((ele) => 
                {
                    Object.assign(userObj,ele)
                })
                console.log('userObj',userObj)
                localStorage.setItem('user',JSON.stringify(userObj))
                userAuth()
                alert(`Login Successfull !`)
                props.history.push({
                    pathname:"/dashboard",
                    state : result
                })
            }
            
        })
        .catch((err) => 
        {
            console.log(err.message)
        })
        }
        
    },[loginData])
    const handleEmail = (e) => 
    {
        setEmail(e.target.value)
        console.log(e.target.value)
    }
    const handleSubmit = (e) => 
    {
        e.preventDefault()
        if(!email)
        {
            setErrors(`Email cannot be blank`)
        }
        else if(!EmailValidator.validate(email))
        {
            setErrors(`Email format not proper`)
        }
        else
        {
            setLoginData(email)
            setErrors("")
        }       
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='login'><h2>Login</h2></label>
                <input type="text" placeholder='Email Id' id='login' name="login" value={email} onChange={handleEmail}/><br /><br />
                {(errors) && (<h3 style={{color:"orangered"}}>{errors}</h3>)}
                <input type="submit" value="Enter"/>
            </form>

        </div>
    )
}
export default UserLogin