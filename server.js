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


// function seedbooksCollection (){
//     const book1 = new bookModel({
//         name: 'The Stranger',
//         description: " The Stranger is a 1942 novella by French author Albert Camus. Its theme and outlook are often cited as examples of Camus' philosophy, absurdism coupled with existentialism, though Camus personally rejected the latter label.",
//         status: 'available',
//     })

//     const book2 = new bookModel({
//         name: 'Rich Dad Poor Dad',
//         description: "Rich Dad Poor Dad is a 1997 book written by Robert Kiyosaki and Sharon Lechter. It advocates the importance of financial literacy (financial education), financial independence and building wealth through investing in assets, real estate investing, starting and owning businesses, as well as increasing one's financial intelligence (financial IQ).",
//         status: 'availabe',
//     })

//     const book3 = new bookModel({
//         name: 'The Da Vinci Code ',
//         description: "The Da Vinci Code follows 'symbologist' Robert Langdon and cryptologist Sophie Neveu after a murder in the Louvre Museum in Paris causes them to become involved in a battle between the Priory of Sion and Opus Dei over the possibility of Jesus Christ and Mary Magdalene having had a child together.",
//         status: 'availabe',
//     })

//     const book4 = new bookModel({
//         name: 'Inferno',
//         description: "When a leather-clad assassin storms the hospital, Langdon is forced to flee with the beautiful doctor Sienna Brooks. Running from the assassin as well as the police, Langdon and Brooks are drawn into a devious plot that centers on one of the world's most mysterious literary masterpieces, Dante's Inferno.",
//         status: 'not availabe',
//     })


//     console.log(book1);
//     console.log(book2);

//     book1.save();
//     book2.save();
//     book3.save();
//     book4.save();
// }

function seedUserCollection (){
    const nadeemBooks = new userModel({
        email : 'nadeemmazahreh97@hotmail.com',
        books: [{
            name: 'The Stranger',
            description: " The Stranger is a 1942 novella by French author Albert Camus. Its theme and outlook are often cited as examples of Camus' philosophy, absurdism coupled with existentialism, though Camus personally rejected the latter label.",
            image: 'https://images-na.ssl-images-amazon.com/images/I/51L54hW47kS._SX322_BO1,204,203,200_.jpg',
        },{
            name: 'Rich Dad Poor Dad',
            description: "Rich Dad Poor Dad is a 1997 book written by Robert Kiyosaki and Sharon Lechter. It advocates the importance of financial literacy (financial education), financial independence and building wealth through investing in assets, real estate investing, starting and owning businesses, as well as increasing one's financial intelligence (financial IQ).",
            image: 'https://images-na.ssl-images-amazon.com/images/I/51wOOMQ+F3L._SY344_BO1,204,203,200_.jpg',
        }]
    })

    const fadiaBooks = new userModel({
        email : 'aldasouqif@gmail.com',
        books: [{
            name: 'The Da Vinci Code ',
            description: "The Da Vinci Code follows 'symbologist' Robert Langdon and cryptologist Sophie Neveu after a murder in the Louvre Museum in Paris causes them to become involved in a battle between the Priory of Sion and Opus Dei over the possibility of Jesus Christ and Mary Magdalene having had a child together.",
            image: 'https://images-na.ssl-images-amazon.com/images/I/91Q5dCjc2KL.jpg',
        },{
            name: 'Inferno',
            description: "When a leather-clad assassin storms the hospital, Langdon is forced to flee with the beautiful doctor Sienna Brooks. Running from the assassin as well as the police, Langdon and Brooks are drawn into a devious plot that centers on one of the world's most mysterious literary masterpieces, Dante's Inferno.",
            image: 'https://images-na.ssl-images-amazon.com/images/I/91Bx8Fqx1pL.jpg',
        }]

    })

    nadeemBooks.save();
    fadiaBooks.save();
}

// seedUserCollection();


server.get('/books',booksHandler);

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


server.listen(PORT, () => {
    console.log('hello')
})