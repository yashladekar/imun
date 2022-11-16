const { json } = require("body-parser");
const bodyParser = require("body-parser");
const express = require("express");
const { google } = require("googleapis");
const { assuredworkloads } = require("googleapis/build/src/apis/assuredworkloads");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    // res.render('registration')
    res.render('form')
})
app.post('/', async (req, res) => {
    const { name, lname } = req.body;


    const auth = new google.auth.GoogleAuth({
        keyFile: "credentails.json",
        
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    //create client instance for auth 
    const client = await auth.getClient()

    //instance of google sheets api 
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = process.env.spreadsheetId_env

    //get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });
    //write row(s)  to spreadsheet

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                [name, lname],
                /// filed need to be changed accroding the input fields 
            ]
        }

    })
    res.send("successfully submitted");
})

app.listen(4001, (req, res) => {
    console.log("http://localhost:4001")

})