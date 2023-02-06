import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


const UserPostShow = (props) => 
{
    const {id} = props.match.params
    console.log(id)
    const [uName,setUname] = useState([])
    const [post,setPost] = useState([])
    const [uId,setUid] = useState([])
    const [comments,setComments] = useState([])
    useEffect((ele) => 
    {
        const url = `https://jsonplaceholder.typicode.com/posts/${id}`
        axios.get(url) 
        .then((user) => 
        {
            //console.log('Post show',user.data)
            const result = user.data
            const userId = user.data.userId
            console.log('userId',userId)
            //console.log('userId-postshow',userId)
            setPost(result)
            setUid(userId)
            
        })
    },[])
    useEffect((ele) => 
    {
        const url = `https://jsonplaceholder.typicode.com/users/${uId}`
        axios.get(url)
        .then((ele) => 
        {
            console.log('ele',ele)
            const output = ele.data.name
            setUname(output)
        })
        .catch((err) => 
        {
            console.log(err.message)
        })
    },[post])
    useEffect((ele) => 
    {
        const url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        axios.get(url) 
        .then((ele) => 
        {
            const result = ele.data
            console.log('comments',result)
            setComments(result)
        })
        .catch((err) => 
        {
            console.log(err.message)
        })
    },[post])
    return(
        <div>
            <h2>USER NAME : {uName}</h2>
            <h2>TITLE : {post.title}</h2>
            <h4>BODY :</h4>
            <h4>{post.body}</h4>
            <hr />
            <h4>COMMENTS</h4>
            {comments.map((ele) => 
            {
                return(<li key={ele.id}>{ele.body}</li>)
            })}
            <br />
            <Link to={`/usershow/${uId}`}>Back to {uName}'s posts</Link>
                
           
        </div>
    )
}
export default UserPostShow