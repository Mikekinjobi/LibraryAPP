/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "./axios"
let loginToken = '';
export const signUp = async(data: any)=>{
    try{
        const response = await axios.post('/users/usersignup', JSON.stringify(data),{
            headers:{
                "Content-Type": "application/json"
            }
        })
        return response;
    }catch(err){
        console.error(err);
    }
}

export const login = async(data: any)=>{
    try{
        const response = await axios.post('/users/userlogin', JSON.stringify(data), {
            headers:{
                "Content-Type": "application/json"
            }
        })
        loginToken = response.data.token;

        return response;
    }catch(err){
        console.error(err);
    }

    
}