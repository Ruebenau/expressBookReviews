const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  username = req.body.username;
  password = req.body.password;

  if(username === "" || username === null)
  {
    res.send("Must provide username");
    return;
  }

  if(password === "" || password === null)
  {
    res.send("Must provide password");
    return;
  }


  for(var usI in users)
    if(users[usI].username == username)
    {
        res.send("User already exists");
        return;
    }

  users.push(req.body);
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books[req.params.isbn]));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  var author = req.params.author;
  var books_by_author = [];

  for(var book in books)
    if(books[book].author === author)
            books_by_author.push(books[book]);

    res.send(JSON.stringify(books_by_author));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
   //Write your code here
   var title = req.params.title;
   var books_by_title = [];
 
   for(var book in books)
     if(books[book].title === title)
         books_by_title.push(books[book]);
 
     res.send(JSON.stringify(books_by_title));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books[req.params.isbn].review));
});

module.exports.general = public_users;
