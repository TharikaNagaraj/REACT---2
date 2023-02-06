import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Users = (props) => 
{
    const [users,setUsers] = useState([])
    useEffect((ele) => 
    {
        const url = 'https://jsonplaceholder.typicode.com/users'
        axios.get(url)
        .then((values) => 
        {
            //console.log('users',values.data)
            const result = values.data
            setUsers(result)

        })
        .catch((err) => 
        {
            console.log(err.message)
        })

    },[])

    return(
        <div>
            <h1>Users - {users.length}</h1>
            <ul>
                {users.map((ele) => 
                {
                    return(<li key={ele.id}><Link to={`/users/${ele.id}`}>{ele.name}</Link></li>)

                })}
            </ul>
            
        </div>
    )
}
export default Users