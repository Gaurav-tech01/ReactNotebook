import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup(props) {
  let navigate = useNavigate();
  const [signup, setsignup] = useState({ name: "", email: "", password: "" })
  const onChange = (e) => {
    setsignup({ ...signup, [e.target.name]: e.target.value })
  }
  const host = "http://localhost:5000"
  const handleClick = async (e) => {
    e.preventDefault()
    const response = await fetch(`${host}/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: signup.email, email: signup.email, password: signup.password }),
    });
    const json = await response.json()
    console.log(json)
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem('token', json.authToken)
      navigate("/")
      props.showAlert("Account Created Successfully", "success")
    }
    else {
      props.showAlert("Invalid Credentials", "danger")
    }
  }
  return (
    <div className='mt-3'>
      <h2>SignUp To Notebook</h2>
      <form onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="name" className="form-control" id="name" name="name" value={signup.name} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={signup.email} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={signup.password} name="password" onChange={onChange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
