import React from 'react'
import UserAuthHome from './UserAuthHome'
import UserAuthRegister from './UserAuthRegister'
import UserAuthLogin from './UserAuthLogin'
import UserAuthAccount from './UserAuthAccount'
import UserNotes from './UserNotes'
import {Link,Route} from 'react-router-dom'
//import {Link,Route,withRouter} from 'react-router-dom'
//Sir has created a different component called navBar because he had previously written all the links and routes in App.js.I have used'
//App.js only to render the UserAuthContainer.js,and have never written the links and routes in it.All of these have been written in 
//UserAuthContainer.js file.So,i didn't have to create navBar.


const UserAuthContainer = (props) => 
{
    const {userLoggedIn,userAuth} = props
    const handleClick = () =>
    {
        userAuth()
        localStorage.removeItem('token')
        alert('Successfully logged out')
        //props.history.push('/') 
        //if i hadn't defined the component for logout in Route,then i can use props.history.push but it will throw an error because
        //the UserAuthContainer is not rendered by any Route component,so it will not have access to location,history and other 
        //such properties.When we use withRouter(UserAuthContainer) in the export statement,the withRouter component will 
        //inject all these properties(history,location etc) into it.After which props.history.push('/') will not throw
        //am error because now we have access to the history object thanks to withRouter.
        // I have commented out because i have defined the compoennt for logout in Route.
    }
    return(
        <div>
            <h1>USER AUTH</h1>
            <Link to={"/"}>Home</Link>{" "}  
            {
                (userLoggedIn) ? 
                (<>
                    <Link to={"/account"}>Account</Link>{" "}
                    <Link to={"/mynotes"}>My Notes</Link>{" "}
                    <Link onClick={handleClick} to={"/logout"}>Logout</Link>  {"    "}<br /><br />
                </>)
                :
                (<>
                    <Link to={"/register"}>Register</Link>{" "}
                    <Link to={"/login"}>Login</Link>  {"    "}<br /><br />
                </>)
            }
            

            <Route path={"/"} component={UserAuthHome} exact={true}/>
            <Route path={"/register"} component={UserAuthRegister} />
            <Route path={"/login"} render = {(props) => {
                return <UserAuthLogin 
                    {...props}
                    userAuth={userAuth}
                    />
            }}/>  
            <Route path={"/account"} component={UserAuthAccount}/>
            <Route path={"/logout"} component={UserAuthHome}/>
            <Route path={"/mynotes"} component={UserNotes}/>
            
        </div>
    )
}
export default UserAuthContainer
//export default withRouter(UserAuthContainer)
//withRouter is a higher order component (A component that takes another component as it's argument or returns a component)
//that is taking UserAuthConatiner as it's argument and is injecting it with the desired proerties like history,location etc,
//so that we can make use of those properties in our code,and compiltaion will not throw an error.