import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  const navigate = useNavigate()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [showpassword, setshowpassword] = useState(false)

  const handlechange = (e) => {
    let name = e.target.name
    let value = e.target.value
    if (name === "email") setemail(value)
    if (name === "password") setpassword(value)
  }

  const toggle = () => setshowpassword((s) => !s)

  const handlesubmit = async (e) => {
    e.preventDefault()
    const user = { email, password }
    
    console.log("Login payload:", user)

    try {
      const response = await axios.post("http://localhost:1000/login", user, {
        headers: { "Content-Type": "application/json" }
      })

      if (response.status === 200) {
        alert("Login successful!")
        localStorage.setItem("token", response.data.token)
        navigate("/")
      } else {
        alert(response.data?.message || "Login failed.")
      }
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || "Login failed")
    }
  }

  return (
    <div>
      <h1>login</h1>
      <form onSubmit={handlesubmit}>
        <input type="text" name="email" placeholder='email' value={email} onChange={handlechange} />
        <input type={showpassword ? "text" : "password"} name="password" placeholder='password' value={password} onChange={handlechange} />
        <button type="button" onClick={toggle} aria-label={showpassword ? "Hide password" : "Show password"}>
          {showpassword ? "Hide" : "Show"}
        </button>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
