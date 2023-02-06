import React,{useState,useEffect} from 'react'
import axios from 'axios'

const UserAuthAccount = (props) => 
{
    const [user,setUser] = useState({})

    useEffect(() => 
    {
        const url = 'https://dct-user-auth.herokuapp.com/users/account'
        axios.get(url,
            {
            headers : {
                "x-auth" : localStorage.getItem('token')
            }})
        .then((response) => 
        {
            console.log(response.data)
            const result = response.data
            setUser(result)
        })
        .catch((err) => 
        {
            console.log(err.message)
        })
    },[])
    return(
        <div>
            <h2>User Account</h2>
            <p>Name : {user.username}</p>
            <p>Email : {user.email}</p>
        </div>
    )
}
export default UserAuthAccount