import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken'
import z from 'zod';

import UserModel from '../Model/User'

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


   const userSignUpSchema = z.object({
      name: z.string({
        required_error: "name is required"
      }),
      email: z.string({
        required_error: "valid email is required"
      }).email(),
      password: z.string({
        required_error: "input password"
      })
  });

   const userLoginSchema = z.object({
    email: z.string({
      required_error: "valid email required"
    }).email(),
    password: z.string({
      required_error: "input password"
    })
});








export const userSignUp = async(req: Request, res: Response)=>{
    try{
    let newUser: user = req.body;

    const error = userSignUpSchema.safeParse(newUser);
    if(error.success === false){
      res.status(400).send({
        error: error.error.issues[0].message
      });
      return;
    }

    const duplicate = await UserModel.findOne({ title: newUser.email}).exec();
    if(duplicate) return res.sendStatus(409);
    
    const result = await UserModel.create({
      'name': newUser.name,
      'email': newUser.email,
      'password': newUser.password
    })

    console.log(result);
    return res.status(200).json({added: newUser});
  
    
  }catch(error){
    console.error('invalid user format')
    console.log(error);
    res.status(500).json(error);
  }
  }
  
  export const userLogin = async(req: Request ,res: Response)=>{
  let allUsersJSON = fs.readFileSync(path.join(__dirname, '../../database/usersDatabase.json'), 'utf8');
  const allUsers: user[]= JSON.parse(allUsersJSON);
  const user: userLogin = req.body;

  const error = userLoginSchema.safeParse(user);
    if(error.success === false){
      res.status(400).send({
        error: error.error.issues[0].message
      });
      return;
    }
  
  const databaseUser = await UserModel.findOne({ email: user.email, password: user.password}).exec()
  
  if(!databaseUser) {
    return res.status(400).send("invalid request");
  }
  if(databaseUser){
      const token = jwt.sign(databaseUser.email, 'appSecret');
      return res.status(200).json({
        "prompt": "login Successful",
        "email": databaseUser.email,
        token
      }
      )
  }
  }
  