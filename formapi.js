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
    res.render('registration')
})
app.post('/registration', async (req, res) => {

    // const credentails = JSON.parse(process.env.credentails);

    // res.send("hello world")
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentails.json",
        // key:credentails.key,
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    //create client instance for auth 
    const client = await auth.getClient()

    //instance of google sheets api 
    const googleSheets = google.sheets({ version: "v4", auth: client });
    // const spreadsheetId = "1rP3jWoO2xb3kw8dW1nnWyZz_JmzVE-90g3FGKYyLRw4"
    const spreadsheetId = process.env.spreadsheetId_env

    //get metadata about spreadsheet
    // const metaData = await googleSheets.spreadsheets.get({
    //     auth,
    //     spreadsheetId,
    // });

    //read rows form spreadsheets 
    // const getRows = await googleSheets.spreadsheets.values.get({
    //     auth,
    //     spreadsheetId,
    //     range: "Sheet1"
    // })


    //write row(s)  to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                ['make a tutorial', 'test'],
            ]
        }

    })


    res.send(getRows.data);
})

app.listen(4001, (req, res) => {
    console.log("http://localhost:4001")

})