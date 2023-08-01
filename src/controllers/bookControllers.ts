import express, {Request, Response} from 'express';
import BookModel from '../Model/Book'
import UserModel from '../Model/User'
import fs from 'fs';
import path from 'path'
import z from 'zod'



interface book {
    title: string;
    author: string;
    datePublished: string;
    description:  string;
    pageCount: number;
    genre: string;
    bookId: number;
    publisher: string;

}

const addBookSchema = z.object({
  title: z.string({
    required_error: "input book title"
  }),
    author: z.string({
      required_error: "input book author"
    }),
    description:  z.string({
      required_error: "input book description"
    })
});



const usersJSON = fs.readFileSync(path.join(__dirname,'../../database/usersDatabase.json'), 'utf-8')
const allValidUsers = JSON.parse(usersJSON);





export const addBook = async (request: Request, response: Response)=>{

    request.on('error', (error)=>{
    response.status(500).send(error);
    })
    
    let newBook: book = request.body
    const error = addBookSchema.safeParse(newBook);
    if(error.success === false){
      response.status(400).send({
        error: error.error.issues[0].message
      });
      return;
    }

    const validUser = await UserModel.findOne({ email: request.body.user}).exec();

    if(!validUser){
      response.status(401).send('unauthorized user');
      return;
    }
    delete request.body.user

    

    

    const duplicate = await BookModel.findOne({ title: newBook.title}).exec();
    if(duplicate) return response.sendStatus(409);

    try{

      const result = await BookModel.create({
        "title": newBook.title,
        "author": newBook.author,
        "datePublished": newBook.datePublished,
        "description": newBook.description,
        "pageCount": newBook.pageCount,
        "genre": newBook.genre,
        "publisher": newBook.publisher

      })

      console.log(result);

      response.status(201).json({added: newBook});

    }catch(err){
      console.error(error);
      response.status(500).json(err)
    }
  
}
  
  
  
  export const getAllBooks = async (request: Request, response: Response,)=>{
    request.on('error', (error)=>{
      response.status(500).send(error);
    })

    const validUser = await UserModel.findOne({ email: request.body.user}).exec();

    if(!validUser){
      response.status(401).send('unauthorized user');
      return;
    }

    try{
      const allBooks = await BookModel.find({});
      response.status(200).json(allBooks);
    }catch(error){
      response.status(500).json(error);
    }
  }


  export const getBooksByPage = async (request: Request, response: Response,)=>{
    request.on('error', (error)=>{
      response.status(500).send(error);
    })

    const validUser = await UserModel.findOne({ email: request.body.user}).exec();

    if(!validUser){
      response.status(401).send('unauthorized user');
      return;
    }

    try{
      let page = Number(request.params.page);
      const limit = 5;
      const skip = 5;
        const allBooks = await BookModel.find({}).skip(skip * (page-1)).limit(limit);
        if(allBooks.length == 0) return response.status(404).send("page not found");
        response.status(200).json(allBooks);
        return; 

    }catch(error){
      response.status(500).json(error);
    }
  }

  
  
    export const getBook = async (request: Request, response: Response,)=>{
      request.on('error', (error)=>{
        response.status(500).send(error);
      })

      const validUser = await UserModel.findOne({ email: request.body.user}).exec();

      if(!validUser){
        response.status(401).send('unauthorized user');
        return;
      }

      const book = await BookModel.findOne({ title: request.params.id}).exec();
      response.status(200).json(book);
    }
  
  
    export const updateBook = async(request: Request, response: Response)=>{
     
      request.on('error', (error)=>{
        response.status(500).send(error);
      })

      const validUser = await UserModel.findOne({ email: request.body.user}).exec();

      if(!validUser){
        response.status(401).send('unauthorized user');
        return;
      }
      delete request.body.user;
      

  
      const bookToUpdate = request.params.id;
              
            let newUpdate = request.body;


            await BookModel.updateOne({title: [bookToUpdate]}, 
              newUpdate).then(result => {
                response.status(200).json(result);
              });
        }
  
  
  
  export const deleteBook = async (request: Request, response: Response)=>{
  
  request.on('error', (error)=>{
    response.status(500).send(error);
  })


    const validUser = await UserModel.findOne({ email: request.body.user}).exec();

      if(!validUser){
      response.status(401).send('unauthorized user');
      return;
      }
  
      const bookToDelete = request.params.id
      try{
      BookModel.deleteOne({ title: bookToDelete }).then(result=>{
        response.status(200).json(result);
      })
      }catch(error){
        console.error(error);
        response.json(error)
      }
      
  }
  