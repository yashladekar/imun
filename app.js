const bodyParser = require('body-parser');
const express = require('express');
const ejs = require('ejs');
const { google } = require('googleapis');
const { assuredworkloads } = require("googleapis/build/src/apis/assuredworkloads");


const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }))



app.get('/', (req, res) => {
    res.render('index');
})

app.get('/registration', (req, res) => {
    res.render('registration')
})
app.post('/registration', async (req, res) => {

    const { fname, lname, email, phone, dob, gender, institution, city_of_residence, nationality, diet, accomodation, cod_fname, cod_lname, cod_email, cod_phone, cod_dob, cod_gender,
        cod_institution, cod_city_of_residence, cod_nationality, comm_preference1, comm_preference2, comm_preference3,
        country_preference1, country_preference2, country_preference3, suggestion } = req.body;

    var Gender, codGender;

    if (gender[0] === "other") {
        Gender = gender[1];
    }
    else Gender = gender[0];
    if (cod_gender[0] === "other") {
        codGender = cod_gender[1];
    }
    else codGender = cod_gender[0];

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentails.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = process.env.spreadsheetId_env

    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    })

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                [fname, lname, email, phone, dob, Gender, institution, city_of_residence, nationality, diet, accomodation, cod_fname, cod_lname, cod_email, cod_phone, cod_dob, codGender,
                    cod_institution, cod_city_of_residence, cod_nationality, comm_preference1, comm_preference2, comm_preference3,
                    country_preference1, country_preference2, country_preference3, suggestion],
            ]
        }
    })
    // res.send(req.body);
    res.send("thankyou for the registration");
})

app.get('/registration_for_EB', (req, res) => {
    res.render('registration_for_EB');
})
app.post('/registration_for_EB', async (req, res) => {
    // res.send(req.body);

    // const { fname, lname, email, phone, dob, gender_eb, institution, city_of_residence, nationality, country_preference1, country_preference2, country_preference3 } = req.body;
    const { fname, lname, email, phone, dob, institution, city_of_residence, nationality, country_preference1, country_preference2, country_preference3 } = req.body;
    
    // let genderEB;
    // if (gender_eb[0] === "other") {
    //     genderEB=gender_eb[1];
    // }
    // else genderEB = gender_eb[0];

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentails.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = process.env.spreadsheetId_env

    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    })
    // console.log(metaData)

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "EBregistration",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                // [fname, lname, email, phone, dob, genderEB, institution, city_of_residence, nationality, country_preference1, country_preference2, country_preference3],
                [fname, lname, email, phone, dob, institution, city_of_residence, nationality, country_preference1, country_preference2, country_preference3],
            ]
        }
    })
    
    // // res.send(req.body);
    // console.log(metaData)
    res.send(req.body);
    // res.send("thankyou for the registration");

})




app.listen(4000, () => {
    console.log("http://localhost:4000")
}) 