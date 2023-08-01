/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from 'react'
import { login } from '../api/api'

export default function Login() {
    const [loginData, setLoginData] = useState({});
  const handleInputChange = (e: {
    target: {
      name: any;
      value: any;
    };
  }) => {
    
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
    console.log(loginData);
  };


  const handlelogin = async (e: { preventDefault: () => void; })=>{
    e.preventDefault();
    
    const loginResponse = await login(loginData);
    if(loginResponse !== undefined)
    console.log(loginResponse.data);
  }
  return (
    <div>
      <h1 className="logo">Login to Pages</h1>
      <div className="loginForm">
        <form onSubmit={handlelogin} >
          <input type="text" name="email" id="email" placeholder="email" onChange={handleInputChange}/>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange ={handleInputChange}
          />
          <br />
          <input type="submit" id="submit" />
          <br />
        </form>
      </div>
    </div>
 
  )
}
