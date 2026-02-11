const mongoose = require('mongoose');

mongoose.connect('process.env.MONGO_URL')
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
        maxLength : 50,
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

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User' ,
        required : true
    },
    balance : {
        type : Number ,
        required : true 
    }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User' , userSchema);
 
module.exports = {
    User ,
    Account
};
