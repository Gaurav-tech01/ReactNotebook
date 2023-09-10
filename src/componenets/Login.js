import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Login(props) {
    let navigate = useNavigate();
    const [login, setlogin] = useState({ email: "", password: ""})
    const onChange = (e) => {
        setlogin({ ...login, [e.target.name]: e.target.value })
    }
    const host = "http://localhost:5000"
    const handleClick = async (e)=>{
        e.preventDefault()
        const response = await fetch(`${host}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: login.email,password: login.password }),
        });
        const json = await response.json()
        console.log(json)
        if(json.success) {
            //Save the auth token and redirect
            localStorage.setItem('token', json.authToken)
            navigate("/")
            props.showAlert("Logged In Successfully", "success")
        }
        else {
            props.showAlert("Wrong Credentials", "danger")
        }
    }
    return (
        <div className='mt-3'>
            <h2>Login To Notebook</h2>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email"value={login.email} aria-describedby="emailHelp" onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={login.password} name="password" onChange={onChange} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
