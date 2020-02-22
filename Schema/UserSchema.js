var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    Name:{
        type: String,
        required: "True",
        trim: "True"
    },
    EmailAddress:{
type: String,
    required: "True",
    trim: "True"
},
Password:{
    type: String,
        required: "true",
        trim: "true"
},
},{collection : 'User',timestamp:"true"})
module.exports = mongoose.model('User',UserSchema);
