import React,{useState,useEffect} from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'

const UserShow = (props) => 
{
    const {id} = props.match.params
    const [uId,setUid] = useState(id)
    const [name,setName] = useState('')
    console.log(id)
    const [posts,setPosts] = useState([])
    useEffect((ele) => 
    {
        const url = `https://jsonplaceholder.typicode.com/posts?userId=${id}`
        axios.get(url)
        .then((values) => 
        {
            //console.log(`posts of userid -${id}`,values.data)
            const result = values.data
            setPosts(result)
        })
        .catch((err) => 
        {
            console.log(err.message)
        })
    },[])
    useEffect((ele) => 
    {
        const url = `https://jsonplaceholder.typicode.com/users/${id}`
        axios.get(url)
        .then((value) => 
        {
            //console.log('userShow',value.data.name)
            const result = value.data.name
            setName(result)
        })
        .catch((err) => 
        {
            console.log(err.message)
        })
    },[uId])

    return(
        <div>
            <h1>USER NAME - {name}</h1>
            <h2>POSTS WRITTEN BY USER - {posts.length}</h2>
            <ul>
                {posts.map((ele) => 
                {
                    return(<li key={ele.id}><Link to={`/userpostshow/${ele.id}`}>{ele.title}</Link></li>)
                })}
            </ul>
            <Link to='/back'><h3>Back to Users</h3></Link>
        </div>
    )
}
export default UserShow