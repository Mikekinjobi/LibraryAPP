import express, { Request, Response, NextFunction } from 'express';
import {userSignUp, userLogin} from '../controllers/userControllers'


const router = express.Router();



interface user{
  name: string;
  email: string;
  password: string;
  id: number;
}

interface userLogin{
  email: string;
  password: string;
}

/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
});

// user sign up
router.post('/usersignup', (req: Request, res: Response)=>{
  userSignUp(req, res);
})

// user login
router.post('/userlogin', (req: Request, res: Response)=>{
  userLogin(req, res);
})




module.exports = router;
