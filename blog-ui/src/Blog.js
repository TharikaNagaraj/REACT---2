import React from "react";
import {Route,Link} from 'react-router-dom'
import Home from "./Home";
import Users from "./Users";
import Posts from "./Posts";
import UserShow from "./UserShow";
import UserPostShow from "./UserPostShow";
import PostShow from "./PostShow";

const Blog = (props) => 
{
    return(
        <div>
            <h3><Link to='/'>Home</Link></h3>
            <h3><Link to='/users'>Users</Link></h3>
            <h3><Link to='/posts'>Posts</Link></h3>

            <Route path={'/'} component={Home} exact={true}/>
            <Route path={'/users'} component={Users} exact={true}/>
            <Route path={'/posts'} component={Posts}/>
            <Route path={'/users/:id'} component={UserShow}/>
            <Route path={'/back'} component={Users}/>
            <Route path={'/userpostshow/:id'} component={UserPostShow}/>
            <Route path={`/usershow/:id`} component={UserShow}/>
            <Route path={'/postshow/:id'} component={PostShow}/>
            
        </div>
    )
}
export default Blog