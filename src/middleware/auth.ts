import Express, {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';


export const auth = async (req: Request, res: Response, next: NextFunction)=>{
    const authorization = req.headers.authorization;
try{
    if(authorization === undefined){
        res.status(401).send({
            "response": "invalid token",
            "method": req.method
            
        })
        return
    }
    const token = authorization.split(' ')[1];
    

    if(!token || token === ''){
        res.status(401).send({
            response: "invalid token",
            method: req.method
        })
        return
    }

    const decode = jwt.verify(token, 'appSecret');
    if(decode){ req.body.user = decode; return next()}
    else{
        res.status(401).send({
            response: "invalid token",
            method: req.method
        })
    }
}catch(error){
    console.log(error);
    res.send({error: error})
}

}