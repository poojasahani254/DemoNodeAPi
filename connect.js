var mongoose=require('mongoose');
var exp=require('express');
var userRoute=require('./First');
var Employee=require('./Employee');
var Stock=require('./Stock');

var app=exp();
app.use(exp.json());
app.use('/user',userRoute)
app.use('/emp',Employee)
app.use('/stock',Stock)

mongoose.connect('mongodb://localhost:27017/mydb',{})
mongoose.connection.on('Error',()=>{
    console.log('Error Occured While Connecting to Database',Error)
    process.exit(1);
}).once('open',()=>{
    console.log("SuccessFully Connected to Database");
})
app.listen(3001, () => console.log(`Example app listening on port 3000!`))
