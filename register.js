const mongoose = require('mongoose')

//imunUsers is schema name or a template 
const iumUsers = new mongoose.Schema(
    {
        firstname: {
            type: String,
            require: true
        },
        lastname: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        confirmpassword: {
            type: String,
            require: true
        }

    }
)
//User is collection name of users 
//

const Register = new mongoose.model("User", iumUsers);

module.exports=Register;