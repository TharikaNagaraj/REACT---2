import React, { useState,useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

const UserNotes = (props) => 
{
    const [notes,setNotes] = useState([])
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [formData,setFormData] = useState([{}])
    const [formErrors,setFormErrors] = useState({})
    const [deleteId,setDeleteId] = useState("")
    const [noteId,setNoteId] = useState("")
    //const [editId,setEditId] = useState("")   Edit functionality to be completed later
    useEffect(() => 
    {
        const url = 'http://dct-user-auth.herokuapp.com/api/notes'
        axios.get(url,{
            headers:{
                "x-auth" : localStorage.getItem('token')
            }
        })
        .then((response) => 
        {
            console.log('useeffect1',response.data)
            const result = response.data
            setNotes(result)
        })
        .catch((err) => 
        {
            console.log(err.message)
        })
    },[])

    useEffect(() => 
    {
        const url = "http://dct-user-auth.herokuapp.com/api/notes"
        axios.post(url,formData,{
            headers : {
                "x-auth" : localStorage.getItem('token')
            }
        })
        .then((response) => 
        {
            //console.log(response.data)
            if(!(response.data.hasOwnProperty('_message')))
            {
                const result = [response.data]
                console.log('result',result)
                const newNotes = result.concat(notes)
                console.log('newNotes',newNotes)
                setNotes(newNotes)
            }
            
        })
        .catch((err) => 
        {
            console.log(err.message)
        })
    },[formData])

    useEffect(() => 
    {
        const url = `http://dct-user-auth.herokuapp.com/api/notes/${deleteId}`
        axios.delete(url,{
            headers : {
                "x-auth":localStorage.getItem('token')
            }
        })
        .then((response) => 
        {
            console.log('deleted data',response.data)
            const id = response.data._id
            const arr = notes.filter((ele) => 
            {
                return(ele._id != id)
            })
            setNotes(arr)
        })
        .catch((err) => 
        {
            console.log(err.message)
        })

    },[deleteId])

    useEffect(() => 
    {   
        const url = `http://dct-user-auth.herokuapp.com/api/notes/${noteId}`
        axios.get(url,{
            headers:{
                "x-auth" : localStorage.getItem('token')
            }
        })
        .then((response) => 
        {
            console.log('noteId response',response.data)
            swal(response.data.title,response.data.body)
        })
        .catch((err) => 
        {
            console.log(err.message)
        })

    },[noteId])

    const handleText = (e) => 
    {
        if(e.target.name == 'title')
        {
            //console.log(e.target.value)
            setTitle(e.target.value)
        }
        else
        {
            //console.log(e.target.value)
            setBody(e.target.value)
        }
    }
    const handleSubmit = (e) =>
    {
        e.preventDefault()
        if(title)
        {
            const formObj = {
                title : title,
                body : body
            }
            setFormData(formObj)
            //console.log(formObj)
            setFormErrors({})
            setTitle("")
            setBody("")
        }
        else
        {
            const errTitle = `Title cannot be blank`
            setFormErrors({...{errTitle}})
        }
        
    }

    const handleDelete = (id) => 
    {
        setDeleteId(id)
    }

    const handleClick = (id) => 
    {
        setNoteId(id)
    }
    

    return(
        <div>
            <h2>Add Note</h2>
            <form onSubmit = {handleSubmit}>
                <input type="text" placeholder='Title' name="title" value={title} onChange={handleText}/><br />
                <h5 style={{color:"red"}}>{(formErrors.hasOwnProperty('errTitle')) && (formErrors.errTitle)}</h5>
                <textarea placeholder='Body' name="body" value={body} onChange={handleText}/><br /><br />
                <input style={{backgroundColor:"LawnGreen"}} type="submit" value="Save"/>
            </form><br/><br/>
            {(notes.length > 0) ? 
            <ol>
            {(notes.map((ele,i) => 
            {
                return(
                    <li key={ele._id} onClick={(e) => {handleClick(ele._id)}}>{ele.title}{" "}<button onClick = {(e) => {handleDelete(ele._id)}}>Delete</button></li>
                )
            }))} 
            </ol>
            :
            (<p>No notes found.Add your first note.</p>)
            }       
        </div>
    )
}
export default UserNotes