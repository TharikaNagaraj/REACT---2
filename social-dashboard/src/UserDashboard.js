import React,{useState,useEffect} from "react";
import axios from "axios";

const UserDashboard = (props) => 
{
    const state = props.location.state
    const [posts,setPosts] = useState([])
    const [user,setUser] = useState(state)
    console.log('dashboard data',state)
    const styleObj = {
        backGroundColor : "palegoldenrod",
        
    }
    useEffect(() => 
    {
        let id
        state.forEach(ele => 
            {   
                console.log('id',ele.id)
                id = ele.id   
            });
        const url = `https://jsonplaceholder.typicode.com/posts?userId=${id}`
        axios.get(url)
        .then((response) => 
        {
            const result = response.data
            console.log(result)
            setPosts(result)
        })
        .catch((err) => 
        {
            console.log(err.message)
        })
    },[])
    return(
        <div>
            {(user.map((ele) => {
                return (
                    <div key={ele.id}>
                     <p style={{backgroundColor:"paleturquoise"}} key={ele.id}>NAME - {ele.name}<br />
                        email - {ele.email}<br />
                        phone - {ele.phone}</p>
                    <p style={{backgroundColor:"paleturquoise"}}>
                        COMPANY NAME - {ele.company.name}<br />
                        company - {ele.company.bs}<br />
                        catch phrase - {ele.company.catchPhrase}
                    </p>
                    </div>
                   )
            }))}
            {(posts.map((ele) => 
            {
                return (
                    <div key={ele.id}>
                    <p style={{backgroundColor:"palegoldenrod",color:"brown"}}>Post Title - {ele.title}<br />
                    Body- {ele.body}</p>
                    </div>
                )
            }))}
        </div>
    )
}
export default UserDashboard