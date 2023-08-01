/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { signUp } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [signUpData, setSignUpData] = useState({});
  const navigate = useNavigate();
  const handleInputChange = (e: {
    target: {
      name: any;
      value: any;
    };
  }) => {
    
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
    console.log(signUpData);
  };


  const handleSignUp = async (e: { preventDefault: () => void; })=>{
    e.preventDefault();
    
    const signUpResponse = await signUp(signUpData);
    if(signUpResponse !== undefined){
        if([signUpResponse.data.added]){
    console.log(signUpResponse.data);
      navigate('/login')
        }

        if([!signUpResponse.data.added]){
          console.log(signUpResponse.data);
            
              }
    }
  }
  return (
    <div>
      <h1 className="logo">
        Sign-up for Pages <span>!</span>
      </h1>
      <div className="signUpForm">
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            name="name"
            id="fullName"
            placeholder="full-name"
            onChange={handleInputChange}
          />
          <br />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email"
            onChange={handleInputChange}
          />
          <br />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={handleInputChange}
          />
          <br />
          <input type="submit" id="submit" />
          <br />
        </form>
      </div>
    </div>
  );
}
