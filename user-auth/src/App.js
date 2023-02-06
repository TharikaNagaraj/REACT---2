import React,{useState,useEffect} from 'react'
import UserAuthContainer from './UserAuthContainer'

const App = (props) => 
{ 
  const [userLoggedIn,setUserLoggedIn] = useState(false)
  const userAuth = () => 
  {
    setUserLoggedIn(!userLoggedIn)
  }
  useEffect(() => 
  {
    if(localStorage.getItem('token'))
    {
      userAuth()
    }
  },[])
  return(
    <div>
      <UserAuthContainer userLoggedIn={userLoggedIn} userAuth={userAuth}/>
    </div>
  )
}
export default App