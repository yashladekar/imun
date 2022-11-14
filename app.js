const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs')
const path = require('path')
const app = express();

require("./db/conn");
const Register = require('./register');
// const { execPath } = require('process');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
// app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"));
// app.set('views', path.join(__dirname, 'views'));




// home route
app.get('/', (req, res) => {
    res.render("home");
})


// registration route 

app.get("/registration", (req, res) => {
    res.render("registration");
})

app.post('/registration', async (req, res) => {
    try {
        const password = req.query.Password;
        const cPassword = req.query.conformPassword;
        console.log(req.query.FName);
        if (password === cPassword) {
            const register = new Register({

                firstname: req.query.FName,
                lastname: req.query.LName,
                email: req.query.Email,
                password: password
            })
            const registered = await register.save()
            res.status(201).render("index");
        } else {
            res.send("password does not match");
        }
    } catch (error) {
        res.status(400).send(error);
    }
})


// about route

app.get("/about", (req, res) => {
    res.render("about");
})

// contact us route 
app.get("/contact", (req, res) => {
    res.render("contactUs");
})

app.listen(4000, () => {
    console.log("server started on port 4000, as http://localhost:4000");
})