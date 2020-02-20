const express = require('express')
var Emp = require('./Schema/EmployeeSchema');
var app = express.Router();
var msg='';
app.post('/addemp', (req, res) => {
    try{
        var body=req.body;
        if(body.Name=="" && body.PhoneNumber=="" && body.Desgnation=="" && body.Salary=="" && body.Doj==""  && body.Address==""  && body.EmailAddress==""){
            msg={'Data':'Please Filled All The field','status':400};
            return res.status(200).json(msg);
        }else{
            Emp.find({EmailAddress:body.EmailAddress},async (err,data)=>{
                if(err){
                    console.log("Error Occured WhileFetching Records",err);
                }else{
                    var cnt=data.length;
                    if(cnt==0){
                        var emp= new Emp(body);
                        var addemployee = await emp.save();
                        msg={'Data':'This Employye is Added!!','status':200};
                        return res.status(200).json(msg);
                    }else{
                        msg={'Data':'This Employye is already Added!!','status':409};
                        return res.status(200).json(msg);
                    }
                }
            })
        }
    }catch (e) {
        console.log("Error Occured While Adding the Employee",e);
        return res.status(500).send("An error occur while Adding a Employee");
    }
});
app.get('/getemp',async (req,res)=>{
    Emp.find({},{__v:0},function(error,data){
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
app.delete('/deleteemp/:id',async (req,res)=>{
    try{
        var id = req.params.id;
        var deleteemp = await Emp.findByIdAndDelete(id);
        if(deleteemp==null){
            msg={'Data':'This Employye is already remove from the system!!'};
            return res.json(msg);
        }else
        {
            msg={'Data':'This Employye is Deleted!!'};
            return res.json(msg);
        }
    }catch (e) {
        console.log("An error occur while deleting a Employee");
        return res.status(500).send({"Data":"Employee not Found"});
    }
})
app.patch('/employeedit/:id',async (req,res)=>{
    try{
        var id = req.params.id;
        var body = req.body;
        if(body.Name=="" || body.PhoneNumber=="" || body.Desgnation=="" || body.Salary=="" || body.Doj==""  && body.Address==""  || body.EmailAddress==""){
            msg={'Data':'Please Filled All The field','status':400};
            return res.status(200).json(msg);
        }else{
            var updateemployee = await Emp.findByIdAndUpdate(id,body);
            if(updateemployee==null){
                msg={'Data':'This Employye is remove from the system!!'};
                return res.json(msg);
            }else
            {
                msg={'Data':'This Employye is Updated!!'};
                return res.json(msg);
            }
        }

    }catch(err){
        console.log("An error occur whie updating a person");
        return res.status(500).send({"Data":"Employee not Found"});
    }
});
app.get('/search/:text',(req,res)=>{
    var searchtext=req.params.text;
    if(searchtext!=''){
        var query={$or:[{Name:searchtext},{PhoneNumber:searchtext}]}
        Emp.find(query,(err,data)=>{
            if(err){
                return res.status(500).send(err);
            }else{
                return res.status(200).json(data);
            }
        })
    }else{
        return res.status(400).send("Please Pass the Search Text");
    }

})
module.exports = app;
