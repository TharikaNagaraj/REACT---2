import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Posts = (props) => 
{
    const [posts,setPosts] = useState([])

    useEffect((ele) => 
    {
        const url = 'https://jsonplaceholder.typicode.com/posts'
        axios.get(url)
        .then((ele) => 
        {
            console.log('posts',ele.data)
            const result = ele.data
            setPosts(result)
        })
        .catch((err) => 
        {
            console.log(err.message)
        })
    },[])
    return(
        <div>
            <h1>Total Posts-{posts.length}</h1>
            <ul>
                {posts.map((ele) => 
                {
                    return(
                        <li key={ele.id}><Link to={`/postshow/${ele.id}`}>{ele.title}</Link></li>
                    )
                })}
            </ul>
            
        </div>
    )
}
export default Posts