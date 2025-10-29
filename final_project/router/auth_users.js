const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
    var username = req.body.username;
    var password = req.body.password;

    if(!username || !password)
        return res.status(404).json({ message: "Error logging in" });

    var valUsers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });

    if(valUsers.length === 0)
        return res.status(208).json({ message: "Invalid Login. Check username and password" });

    var accessToken = jwt.sign({data: password}, 'access', {expiresIn: 60*60});

    req.session.authorization = {
        accessToken,
        username
    };

    return res.status(200).send("User successfully logged in");
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
    var reviews = books[req.params.isbn].reviews;
    var review = req.body.review;

    reviews[req.session.authorization.username] = review;

    return res.status(200).send("Successfully posted review.");
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    var reviews = books[req.params.isbn].reviews;
    delete reviews[req.session.authorization.username];

    return res.status(200).send("Successfully deleted review."); 
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;