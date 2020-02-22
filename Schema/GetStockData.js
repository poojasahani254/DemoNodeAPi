var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    date:{
        type: String,
        required: "True",
        trim: "True"
    },
    open:{
        type: Number,
    },high:{
        type: Number,

    },low:{
        type: Number,
        type: Number,
    },
    close:{
    },
    volume:{
        type: Number,

    },split:{
        type: Number,

    },dividend:{
        type: Number,

    },absoluteChange:{
        type: Number,

    },percentChange:{
        type: Number,
    },
},{collection : 'Stock',timestamp:"true"})
module.exports = mongoose.model('Stock',UserSchema);
