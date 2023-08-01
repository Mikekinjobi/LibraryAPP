import express, {Request, Response, NextFunction} from 'express';
import {addBook, getAllBooks, getBook, updateBook, deleteBook, getBooksByPage} from '../controllers/bookControllers'
import { auth } from '../middleware/auth';


const router = express.Router();


// post book
router.post('/addbook', auth,  (req: Request, res: Response)=>{
  addBook(req, res);
})


// get all books
router.get('/getallbooks', auth, function(req: Request, res: Response, next: NextFunction) {
  getAllBooks(req, res);
});

// get all books in pages
router.get('/getallbooks/:page', auth, function(req: Request, res: Response, next: NextFunction) {
  getBooksByPage(req, res);
});

// get book
router.get('/getbook/:id', auth,  function(req: Request, res: Response, next: NextFunction) {
  getBook(req, res); 
});

// update book
router.put('/updatebook/:id', auth,  (req: Request, res: Response,)=>{
  updateBook(req, res);
});

// delete book
router.delete('/deletebook/:id', auth , (req: Request, res: Response,)=>{
  deleteBook(req, res);
});




module.exports = router;



