import { graphqlHTTP } from "express-graphql";
import graphql, { GraphQLID } from 'graphql'
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from "graphql"
// import { getAllBooks, getBook, addBook, updateBook, deleteBook } from '../controllers/bookControllers';
import BookModel from "./Book"
import UserModel from "./User"
import { generateToken, decodeToken } from "../utils/authorization";

// const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: ()=> ({
        _id: { type: GraphQLID},
        title: { type: GraphQLString},
        author: { type: GraphQLString},
        datePublished: { type: GraphQLString},
        description: { type: GraphQLString},
        pageCount: { type: GraphQLInt},
        genre: { type: GraphQLString},
        publisher: { type: GraphQLString},
        // "__V": { type: GraphQLInt}
    })
})


const UserType = new GraphQLObjectType({
    name: "User",
    fields: ()=> ({
        _id: { type: GraphQLID},
        name: {type : GraphQLString},
        email: {type : GraphQLString},
        password: { type : GraphQLString}
        
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllBooks: {
            type : new GraphQLList(BookType),
            resolve: async (parent, args, context)=>{ 
                const email = await decodeToken(context.token);
                if(!email) return
                return await BookModel.find({})}
            
            
        },

        getbook: {
            type : BookType,
            args:{
                _id :{type: GraphQLID}
            },
            resolve: async (parent, args, context)=>{ 
                const email = await decodeToken(context.token);
                if(!email) return
                return await BookModel.findOne({_id: args._id})}
            
            
        },

        getAllUsers: {
            type : new GraphQLList(UserType),
            resolve: async (parent,args,context)=> {
                const email = await decodeToken(context.token);
                if(!email) return
                return await UserModel.find({})

        
            }
        },

        getUser: {
            type : UserType,
            args:{
                _id :{type: GraphQLID}
            },
            resolve: async (parent,args,context)=> {
                const email = await decodeToken(context.token);
                if(!email) return
                return await UserModel.findOne({_id: args._id});

        
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addBook: {
            type : BookType,
            args: {
                title: { type: GraphQLString},
                author: { type: GraphQLString},
                datePublished: { type: GraphQLString},
                description: { type: GraphQLString},
                pageCount: { type: GraphQLInt},
                genre: { type: GraphQLString},
                publisher: { type: GraphQLString}
            },
            resolve: async (parent, args, context)=> {
                const email = await decodeToken(context.token);
                if(!email) return
                const duplicate = await BookModel.findOne({ title: args.title}).exec();
            if(duplicate) return ;

        try{

        await BookModel.create({
        "title": args.title,
        "author": args.author,
        "datePublished": args.datePublished,
        "description": args.description,
        "pageCount": args.pageCount,
        "genre": args.genre,
        "publisher": args.publisher
        
      })
        // console.log(args);
        return args;

    //   response.status(201).json({added: newBook});

    }catch(err){
      console.error(err);
    //   b
    }
            }
        },
        updateBook: {
            type : BookType,
            args: {
                _id: {type: GraphQLID},
                author: { type: GraphQLString},
                datePublished: { type: GraphQLString},
                description: { type: GraphQLString},
                pageCount: { type: GraphQLInt},
                genre: { type: GraphQLString},
                publisher: { type: GraphQLString}
            },
            resolve: async (parent, args, context)=> {
                const email = await decodeToken(context.token);
                if(!email) return

            

        try{

        await BookModel.updateOne({
        _id: args._id,
        
    }, {author: args.author,
    datePublished: args.datePublished,
    description: args.description,
    pageCount: args.pageCount,
    genre: args.genre,
    publisher: args.publisher})
        // console.log(args);
        return args;

    //   response.status(201).json({added: newBook});

    }catch(err){
      console.error(err);
    
    }
            }
        },
        deleteBook: {
            type : BookType,
            args: {
                _id: { type: GraphQLID},
            },
            resolve: async (parent, args, context)=> {
                const email = await decodeToken(context.token);
                if(!email) return

        try{

        await BookModel.deleteOne({
        _id: args._id,
        
    })
        // console.log(args);
        return args;

    //   response.status(201).json({added: newBook});

    }catch(err){
      console.error(err);
    
    }
            }
        },

        addUser: {
            type : UserType,
            args: {
                name: { type: GraphQLString},
                email: { type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve: async (parent, args)=> {
                const duplicate = await UserModel.findOne({ email: args.email}).exec();
                if(duplicate) return ;

        try{

        await UserModel.create({
        name: args.name,
        email: args.email,
        password: args.password    
    })
        
        return args;

    }catch(err){
      console.error(err);
    
    }
            }
        },


        loginUser: {
            type : GraphQLString,
            args: {
                email: { type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve: async (parent, args)=> {
                const validUser = await UserModel.findOne({ email: args.email, password: args.password}).exec();
                if(!validUser) return ;

                const token = generateToken(validUser.email);
                return token;
            }
        }


    }
})

export default new GraphQLSchema({query: RootQuery , mutation: Mutation }) 