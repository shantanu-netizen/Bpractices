import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const [fname, setfname] = useState("");
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [dob, setdob] = useState("");
  const Navigate = useNavigate()
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name == "fname") setfname(value);
    if (name == "email") setemail(value);
    if (name == "password") setpassword(value);
    if (name == "username") setusername(value);
    if (name == "dob") setdob(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      fname,
      email,
      password,
      username,
      dob,
    };
    console.log(user)
    try {
      const response = await axios.post(
        "http://localhost:1000/register", user, { headers: { "Content-Type": "application/json" } }
      )
      console.log(response.data)
      if (response.status === 201) {
        alert("sign up sucessfull")
        Navigate("/login")
      } else {
        console.log(response.data)
        alert(response.data.error)
      }
    } catch (error) {
      console.log(error)
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const [showpassword, setshowpassword] = useState(false)
  const toggle = () => setshowpassword((s) => !s)
  return (
    <div>
      <h1>sign up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fname"
          value={fname}
          placeholder="fname"
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          value={username}
          placeholder="username"
          onChange={handleChange}
        />
        <input
          type={showpassword ? "text" : "password"}
          name="password"
          value={password}
          placeholder="password"
          onChange={handleChange}
        />
        <button type="button" onClick={toggle} aria-label={showpassword ? "Hide password" : "Show password"}>{showpassword ? "Hide" : "Show"}</button>
        <input
          type="date"
          name="dob"
          value={dob}
          placeholder="dob"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
