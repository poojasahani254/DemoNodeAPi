const express = require('express')
var User = require('./Schema/UserSchema');
var app = express.Router();

app.post('/register',async (req, res) => {
    try{
        var body=req.body;
        var user= new User(body);
        var registerUser = await user.save();
        return res.json(registerUser);
    }catch (e) {
        console.log("Error Occured While Register the user",e);
        return res.status(500).send("An error occur while Register a user");
    }
});
app.get('/get',async (req,res)=>{
    User.find({},function(error,data){
        if(error)
            return res.send("error")
        else {
            if (data.length == 0) {
                return res.json({"status":false})
            }else{
                return res.json(data)
            }

        }
    })
})
app.post('/login',(req,res)=>{
        var body1=req.body;
     User.find({$and:[{"EmailAddress":body1.username},{"Password":body1.password}]},{_id:0},function(error,data){
        if(error)
            return res.send("error")
        else {
            if (data.length == 0) {
                return res.json({status:false})
            }else{
                  data[0]._doc.status=true
                // console.log(data[0]._doc)
                 console.log(data[0]._doc.status)
                 return res.json(data)

            }
        }
    })
});

module.exports = app;
