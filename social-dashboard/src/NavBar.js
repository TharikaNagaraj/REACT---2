import React,{useState,useEffect} from "react";
import UserDashboard from './UserDashboard'
import UserLogin from './UserLogin'
import {Link,Route,withRouter} from 'react-router-dom'

const NavBar = (props) => 
{
  const [loggedIn,setLoggedIn] = useState(false)
  const userAuth = () => 
  {
    setLoggedIn(!loggedIn)
  }
  useEffect(() => 
  {
    if(localStorage.getItem('user'))
    {
        userAuth()
    }
  },[])
  const handleLogout =() => 
  {
    userAuth()
    localStorage.clear('user')
    props.history.push("/")
    
  }
  return(
    <div>
      <h1>Social Dashboard</h1>
        {(loggedIn) ? 
        (<>
        <Link to={"/logout"} onClick={handleLogout}>Logout</Link>
        </>)
        :
        (<>
        <Link to="/login">Login</Link>
        </>
        )}
        
        
        <Route path={"/login"} render={ (props) => {
            return <UserLogin {...props}
                            userAuth = {userAuth}/>
        }} 
        exact={true}
        />
        <Route path={"/dashboard"} component={UserDashboard}/>

    </div>
  )
}
export default withRouter(NavBar)