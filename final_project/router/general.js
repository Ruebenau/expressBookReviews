const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    //Write your code here
    var username = req.body.username;
    var password = req.body.password;

    if(!username || !password)
        return res.status(404).json({message: "Unable to register user."});

    var userwithusername = users.filter((user) => user.username === username);
    if(userwithusername.length > 0)
        return res.status(404).json({message: "User already exists!"});
    
    users.push(req.body);
    return res.status(200).json({message: "User successfully registered. Now you can login"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books));
});

public_users.get('/async', function (req, res) {
   var promise = new Promise((resolve,reject) => {
        setTimeout(() => {
        resolve(JSON.stringify(books));
        },6000)});

    promise.then((successMessage) => {
        res.send(successMessage);
    });
});
    

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books[req.params.isbn]));
 });

 public_users.get('/isbn-async/:isbn', function (req, res) {
    var promise = new Promise((resolve,reject) => {
        setTimeout(() => {
        resolve(JSON.stringify(books[req.params.isbn]));
        },6000)});

    promise.then((successMessage) => {
        res.send(successMessage);
    });
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

public_users.get('/author-async/:author', function (req, res) {
    var promise = new Promise((resolve,reject) => {
        var author = req.params.author;
        var books_by_author = [];

        for(var book in books)
            if(books[book].author === author)
                    books_by_author.push(books[book]);
        
        setTimeout(() => {
        resolve(JSON.stringify(books_by_author));
        },6000)});

    promise.then((successMessage) => {
        res.send(successMessage);
    });
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

public_users.get('/title-async/:title',function (req, res) {
    var promise = new Promise((resolve,reject) => {
        var title = req.params.title;
        var books_by_title = [];
        
        for(var book in books)
            if(books[book].title === title)
                books_by_title.push(books[book]);

        setTimeout(() => {
        resolve(JSON.stringify(books_by_title));
        },6000)});

    promise.then((successMessage) => {
        res.send(successMessage);
    });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books[req.params.isbn].reviews));
});

module.exports.general = public_users;
