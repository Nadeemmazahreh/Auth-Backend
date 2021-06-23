'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const server = express();
const mongoose = require('mongoose');
server.use(cors()); 
const PORT = process.env.PORT;

const  userModel = require('./model') 
const bookModel = require('./model')


mongoose.connect('mongodb://localhost:27017/userbooks', {useNewUrlParser: true, useUnifiedTopology: true});

server.get('/',homeHandler);

function homeHandler(req,res){
    res.send('Home route')
}


function seedUserCollection (){
    const nadeemBooks = new userModel({
        email : 'nadeemmazahreh97@hotmail.com',
        books: [{
            name: 'The Stranger',
            description: " The Stranger is a 1942 novella by French author Albert Camus. Its theme and outlook are often cited as examples of Camus' philosophy, absurdism coupled with existentialism, though Camus personally rejected the latter label.",
            status: 'Great',
        },{
            name: 'Rich Dad Poor Dad',
            description: "Rich Dad Poor Dad is a 1997 book written by Robert Kiyosaki and Sharon Lechter. It advocates the importance of financial literacy (financial education), financial independence and building wealth through investing in assets, real estate investing, starting and owning businesses, as well as increasing one's financial intelligence (financial IQ).",
            status: 'Not Available',
        }]
    })

    const fadiaBooks = new userModel({
        email : 'aldasouqif@gmail.com',
        books: [{
            name: 'The Da Vinci Code ',
            description: "The Da Vinci Code follows 'symbologist' Robert Langdon and cryptologist Sophie Neveu after a murder in the Louvre Museum in Paris causes them to become involved in a battle between the Priory of Sion and Opus Dei over the possibility of Jesus Christ and Mary Magdalene having had a child together.",
            status: 'Good',
        },{
            name: 'Inferno',
            description: "When a leather-clad assassin storms the hospital, Langdon is forced to flee with the beautiful doctor Sienna Brooks. Running from the assassin as well as the police, Langdon and Brooks are drawn into a devious plot that centers on one of the world's most mysterious literary masterpieces, Dante's Inferno.",
            status: 'But in local store',
        }]

    })

    nadeemBooks.save();
    fadiaBooks.save();
}

// seedUserCollection();


server.get('/books',booksHandler);
server.post('/addbooks',addBooksHandler); 


function booksHandler(req,res){
    let emailBooksRequest = req.query.email
    userModel.find({email: emailBooksRequest},function(err,booksData){
        if(err){
            console.log('something went wrong');
        }
        else
        {
            console.log(booksData,'hello ')
            res.send(booksData[0].books);
        }
    })
}

function addBooksHandler(req,res) {
    console.log(req.body);
    const {email,newBookName,newDescription,newStatus} = req.body;
    
    userModel.find({email: email},(error,booksData)=>{
        if(error)
        {
            res.send('something went wrong');
        }
        else
        {
            console.log(booksData[0].books);
            booksData[0].books.push({
                name : newBookName,
                description: newDescription,
                image: newStatus,
            })
            booksData[0].save();
            res.send(booksData[0].books);
        }
    })
}

server.listen(PORT, () => {
    console.log('hello')
})