const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://vineetsainiii007_db_user:uLrsg8Z07FbmCnnU@vineet.tetyk5v.mongodb.net/')
.then(() => {
    console.log("database connected");
})
.catch((err) => {
    console.log("connection errror:",err);
});

const userSchema = new mongoose.Schema({
    username:{
        required : true,
        type : String ,
        unique : true ,
        trim : true ,
        minLength : 3,
        maxLength : 10,
        lowercase : true
 },
 password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const User = mongoose.model('User' , userSchemma);
 
module.exports = {
    User
};
