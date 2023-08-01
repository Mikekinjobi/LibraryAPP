import jwt  from "jsonwebtoken";


export const generateToken = (data: any)=>{
    const token = jwt.sign(data, 'appSecret');
    return token 
}

export const decodeToken = async (bearer: any)=>{
    // const token =  bearer.split(' ')[1];
    const decoded = await jwt.verify(bearer, 'appSecret')
    if(!decoded)return
    return new Promise((resolve)=> resolve(decoded) ) 
}




const contextObject = async (req :any ) => {
    const values = req.headers.authorization.split(' ');
    let verified = null;

    try {
        verified = await jwt.verify(values[1], 'appSecret');


    }
    catch (err) {
        console.log(err);
        
    }

    return {
        email: verified
    };
}




