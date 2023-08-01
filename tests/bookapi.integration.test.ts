import express from 'express';
import request from 'supertest';
import fs from 'fs';
import path from 'path'

import BookModel from '../src/Model/Book';
import UserModel from '../src/Model/User';

const bookRouter = require('../src/routes/index');
const userRouter = require('../src/routes/users');



const app = express();
app.use(express.json());
app.use('/api/test/', bookRouter);
app.use('/api/userstests', userRouter);

try{

describe('test for book api', ()=>{
    test('GET all books', async ()=>{
        const {body, statusCode} = await request(app).get('/api/test/getallbooks')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.ZW1tYW51ZWxrZW50QGdtYWlsLmNvbQ.eyngEVvTbZ2_GqdDEtpjtcenKv_7FcFL5QzSMR4BE2o');

        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    title: expect.any(String),
                    author: expect.any(String),
                    datePublished: expect.any(String),
                    description: expect.any(String),
                    pageCount: expect.any(Number),
                    genre: expect.any(String),
                    bookId: expect.any(Number),
                    publisher: expect.any(String)    
                })
            ])
        )

        expect(statusCode).toBe(200);
    });


    test("GET one book", async()=>{
        const {body, statusCode} = await request(app).get('/api/test/getbook/A Promised Land')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.ZW1tYW51ZWxrZW50QGdtYWlsLmNvbQ.eyngEVvTbZ2_GqdDEtpjtcenKv_7FcFL5QzSMR4BE2o');

        expect(body).toEqual(expect.objectContaining({
            title: expect.any(String),
            author: expect.any(String),
            datePublished: expect.any(String),
            description: expect.any(String),
            pageCount: expect.any(Number),
            genre: expect.any(String),
            bookId: expect.any(Number),
            publisher: expect.any(String)    
        }))

        expect(statusCode).toBe(200);

    })


    test("POST one book", async()=>{
        const {body, statusCode} = await request(app).post('/api/test/addbook').send({
        title: "test 52222",
		author: "Obama",
		datePublished: "2020-0-12T19:0455.455z",
		description: "A Promised Land is a memoir by Barack Obama, the 44th President of the United States from 2009 to 2017 Published on November 17, 2020, it is the first of a planned two-volume series",
		pageCount: 400000,
		genre: "autobio",
		bookId: 0,
		publisher: "kingCrown"
        })
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.ZW1tYW51ZWxrZW50QGdtYWlsLmNvbQ.eyngEVvTbZ2_GqdDEtpjtcenKv_7FcFL5QzSMR4BE2o');

        expect(statusCode).toBe(200);
        expect(body).toEqual({added: {
            "title": "test 52222",
		"author": "Obama",
		"datePublished": "2020-0-12T19:0455.455z",
		"description": "A Promised Land is a memoir by Barack Obama, the 44th President of the United States from 2009 to 2017 Published on November 17, 2020, it is the first of a planned two-volume series",
		"pageCount": 400000,
		"genre": "autobio",
		"bookId": expect.any(Number),
		"publisher": "kingCrown"
        }})

        
        


    })


    test('PUT update a book', async()=>{
        
        const {body, statusCode} = await request(app).put(`/api/test/updatebook/test 52222`).send({
            "pageCount": 800,
		    "genre": "action",
        })
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.ZW1tYW51ZWxrZW50QGdtYWlsLmNvbQ.eyngEVvTbZ2_GqdDEtpjtcenKv_7FcFL5QzSMR4BE2o');

        expect(statusCode).toBe(200);
        expect(body).toEqual({
            update:{

		"title": expect.any(String),
		"author": expect.any(String),
		"datePublished": expect.any(String),
		"description": expect.any(String),
		"pageCount": 800,
		"genre": "action",
		"bookId": expect.any(Number),
		"publisher": expect.any(String)
            }
        })
        })

        test('DELETE one book', async()=>{
            const {body, statusCode} = await request(app).delete(`/api/test/deletebook/test 52222`)
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.ZW1tYW51ZWxrZW50QGdtYWlsLmNvbQ.eyngEVvTbZ2_GqdDEtpjtcenKv_7FcFL5QzSMR4BE2o');
            
            expect(statusCode).toBe(200);
            expect(body).toEqual({
                deleted:[{
            "title": expect.any(String),
            "author": expect.any(String),
            "datePublished": expect.any(String),
            "description": expect.any(String),
            "pageCount": expect.any(Number),
            "genre": expect.any(String),
            "bookId": expect.any(Number),
            "publisher": expect.any(String)
                }]
            }) 

    

        })

        describe('incorrect input errors on POST', ()=>{
            test('input field without book title', async()=>{
                const {body, statusCode} = await request(app).post('/api/test/addbook').send({
                    
                    author: "Obama",
                    datePublished: "2020-0-12T19:0455.455z",
                    description: "A Promised Land is a memoir by Barack Obama, the 44th President of the United States from 2009 to 2017 Published on November 17, 2020, it is the first of a planned two-volume series",
                    pageCount: 400000,
                    genre: "autobio",
                    bookId: 0,
                    publisher: "kingCrown"
                    })
                    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.ZW1tYW51ZWxrZW50QGdtYWlsLmNvbQ.eyngEVvTbZ2_GqdDEtpjtcenKv_7FcFL5QzSMR4BE2o'); 
            
            
                    expect(statusCode).toBe(400);
                    expect(body).toEqual({
                    error: "input book title"
                })
            
            })


            test('input field without book author', async()=>{
                const {body, statusCode} = await request(app).post('/api/test/addbook').send({
                    title: " A Book",

                    datePublished: "2020-0-12T19:0455.455z",
                    description: "A Promised Land is a memoir by Barack Obama, the 44th President of the United States from 2009 to 2017 Published on November 17, 2020, it is the first of a planned two-volume series",
                    pageCount: 400000,
                    genre: "autobio",
                    bookId: 0,
                    publisher: "kingCrown"
                    })
                    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.ZW1tYW51ZWxrZW50QGdtYWlsLmNvbQ.eyngEVvTbZ2_GqdDEtpjtcenKv_7FcFL5QzSMR4BE2o'); 
            
            
                    expect(statusCode).toBe(400);
                    expect(body).toEqual({
                    error: "input book author"
                })
            
            })  

            
            test('input field without book description', async()=>{
                const {body, statusCode} = await request(app).post('/api/test/addbook').send({
                    title: "A Book",
                    author: "Obama",
                    datePublished: "2020-0-12T19:0455.455z",
                    
                    pageCount: 400000,
                    genre: "autobio",
                    bookId: 0,
                    publisher: "kingCrown"
                    })
                    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.ZW1tYW51ZWxrZW50QGdtYWlsLmNvbQ.eyngEVvTbZ2_GqdDEtpjtcenKv_7FcFL5QzSMR4BE2o'); 
            
            
                    expect(statusCode).toBe(400);
                    expect(body).toEqual({
                    error: "input book description"
                })
            
            })


        })
})


describe('test for users api', ()=>{

        test('POST signing up a user', async()=>{
            const {body, statusCode} = await request(app).post('/api/userstests/usersignup').send({
                name: "testuser111",
                email: "testuser111@mail.com",
                password: "testpassword" 
            });

            expect(statusCode).toBe(200);
            expect(body).toEqual({
                added:{
                    name: "testuser111",
                    email: "testuser111@mail.com",
                    password: "testpassword",
                    id: expect.any(Number)
                }
            })
            
            
        });

       test('POST user login', async()=>{
        const {body, statusCode} = await request(app).post('/api/userstests/userlogin').send({
            email: "testuser111@mail.com",
            password: "testpassword" 
        });

        expect(statusCode).toBe(200);
        expect(body).toEqual({
            "prompt": "login Successful",
            "email": "testuser111@mail.com",
            "token": expect.any(String) 
        })

            UserModel.deleteOne({name: "testuser111"});


       })


       describe('incorrect input errors on user sign-up and login', ()=>{
        
        test('must input username on signing up a user', async()=>{
            const {body, statusCode} = await request(app).post('/api/userstests/usersignup').send({
                
                email: "testuser111@mail.com",
                password: "testpassword" 
            });

            expect(statusCode).toBe(400);
            expect(body).toEqual({
               error: "name is required"
            })
            
            
        });


        test('must input email on signing up a user', async()=>{
            const {body, statusCode} = await request(app).post('/api/userstests/usersignup').send({
                name: 'testuser111',
                
                password: "testpassword" 
            });

            expect(statusCode).toBe(400);
            expect(body).toEqual({
               error: "valid email is required"
            })
            
            
        });


        test('must input well formatted email on signing up a user', async()=>{
            const {body, statusCode} = await request(app).post('/api/userstests/usersignup').send({
                name: 'testuser111',
                email: "testuser111mail.com",
                password: "testpassword" 
            });

            expect(statusCode).toBe(400);
            expect(body).toEqual({
               error: "Invalid email"
            })
            
            
        });



        test('must input password on signing up a user', async()=>{
            const {body, statusCode} = await request(app).post('/api/userstests/usersignup').send({
                name: 'testuser111',
                email: "testuser111@mail.com",
                 
            });

            expect(statusCode).toBe(400);
            expect(body).toEqual({
               error: "input password"
            })
            
            
        });



        test('must input email on logging in a user', async()=>{
            const {body, statusCode} = await request(app).post('/api/userstests/userlogin').send({
                name: 'testuser111',
                
                password: "testpassword" 
            });

            expect(statusCode).toBe(400);
            expect(body).toEqual({
               error: "valid email required"
            })
            
            
        });


        test('must input well formatted email on logging in a user', async()=>{
            const {body, statusCode} = await request(app).post('/api/userstests/userlogin').send({
                name: 'testuser111',
                email: "testuser111mail.com",
                password: "testpassword" 
            });

            expect(statusCode).toBe(400);
            expect(body).toEqual({
               error: "Invalid email"
            })
            
            
        });



        test('must input password on logging a user', async()=>{
            const {body, statusCode} = await request(app).post('/api/userstests/userlogin').send({
                name: 'testuser111',
                email: "testuser111@mail.com",
                 
            });

            expect(statusCode).toBe(400);
            expect(body).toEqual({
               error: "input password"
            })
            
            
        });




       })
        
})

}catch(error){
    console.error('a file is yet to be created ?', error);
}