import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer, toast} from "react-toastify";
import axios from 'axios';
function Register() {
    const navigate = useNavigate();
    const [values,setValues] = useState({
        email:"",
        password:"",
    });
   const generateError = (err)=>toast.error(err,{
    position:"bottom-right",

   })
    const handleSubmit =async (e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.post("http://localhost:4000/register",{
               ...values,
            })
            console.log(data)
            if (data){
                if (data.errors){
                  generateError(data.msg)
                    
                }
                else{
                    navigate("/")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (

    <div className="container">
        <h2>Register Account</h2>
        <form onSubmit={(e)=>handleSubmit(e)} >
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Write your email" onChange={(e)=>
                setValues({...values,[e.target.name]:e.target.value})
                }/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Enter your password" onChange={(e)=>
                setValues({...values,[e.target.name]:e.target.value})
                }/>
            </div>
            <button type="submit">Submit</button>
            <span>Already have an account? <Link to='/login'>Login</Link></span>
        </form>
        <ToastContainer>
        </ToastContainer>
        </div>
        
  )
}

export default Register