import createError, {HttpError} from 'http-errors';
import express, {Request, Response, NextFunction}  from 'express';
import cors from 'cors'
import path from 'path';
import cookieParser  from 'cookie-parser';
import logger from 'morgan';
import expressGraphQL from 'express-graphql'
import { graphqlHTTP } from 'express-graphql';
import graphql from 'graphql'
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from "graphql"
import BookSchemaQL  from './Model/graphqlSchemas';
import mongoose from 'mongoose';
import BookModel from './Model/Book'
import UserModel from './Model/User'
import { decodeToken } from './utils/authorization';

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const connectDB = require('./config/dbConn');
require('dotenv').config();
connectDB();

const app = express();

const port = 3000;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/graphql', graphqlHTTP((req)=>{ 
  console.log(req.headers.token)
  const token = req.headers.token
  return {
  schema: BookSchemaQL,
  graphiql: { headerEditorEnabled: true },
  context: {token}
}}))

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




// mongoose.connection.once('open', ()=>{
//   console.log('Connected to Database');
//   app.listen(port, ()=>{console.log(`listening on ${port}`)});
// })

export default app;
