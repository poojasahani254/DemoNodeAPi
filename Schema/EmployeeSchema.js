var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EmployeeSchema = new Schema({
    Name:{
        type: String,
        required: "True",
        trim: "True"
    },
    PhoneNumber:{
        type: String,
        required: "True",
        trim: "True"
    },
    Desgnation:{
        type: String,
        required: "true",
        trim: "true"
    },Salary:{
        type: Number,
        required: "True",
    },Doj:{
        type:Date,
        required:"True",
    },Address:{
        type: String,
        trim: "True"
    },EmailAddress:{
        type: String,
        trim: "True"
    }
},{collection : 'Employee',timestamp:"true"})
module.exports = mongoose.model('Employee',EmployeeSchema);
