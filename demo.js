var express = require('express');
var Person = require('../Schema/personSchema');
var chalk = require('chalk');
var jwthelper = require('jsonwebtoken');
var Router = express.Router();
var validation = require('validator');
var decodedData;

Router.get('/login/:id',async function(req,res){
    try{
        var id = req.params.id;
        var loginperson = await Person.findById(id);
        var token = jwthelper.sign({Name:loginperson.Name,Role:loginperson.Role,id:loginperson._id},'secret',{});
        console.log(token)
        return res.json(loginperson);
    }catch(err){
        console.log(chalk.red("An error occur at time of login"));
        return res.status(500).send("An error occur at time of login");
    }
})
Router.use('/',function (req,res,next) {
    if(req.headers.authorization){
        decodedData = jwthelper.verify(req.headers.authorization,'secret')
        if(decodedData){
            if(decodedData.Role == 'admin')
                return next();
            else if(decodedData.Role == 'write' && req.method != 'DELETE' && req.method != 'POST')
                return next();
            else if(decodedData.Role == 'read' && req.method == 'GET')
                return next();
            else
                return res.send("You dont have any permission");
        }
        else{
            console.log(chalk.red("Decoded Data not found"));
            return res.status(500).send("Please enter the token");
        }
    }
})

Router.get('/',function(req,res){
    Person.find({},function(error,data){
        if(error)
            return res.send("error")
        else
            return res.json(data)
    })
})

Router.post('/createperson',async function(req,res){
    try{
        var body = req.body;
        console.log(body)
        var validemail = validation.isEmail(req.body.EmailAddress)
        console.log(validemail)
        if(validemail){
            var person = new Person(body);
            var createperson = await person.save();
            return res.json(createperson);
        }
        else{
            console.log(chalk.red("Please entrer valid email address"));
            return res.status(500).send("Enter valid email address");
        }
    }catch(err){
        console.log(chalk.red("An error occur while creating a person"));
        return res.status(500).send("An error occur while creating a person");
    }
})

Router.get('/specificperson/:id',async function(req,res){
    console.log("aaaaa")
    try{
        var id = req.params.id;
        var specificperson = await Person.findById(id);
        return res.json(specificperson);
    }catch(err){
        console.log(chalk.red("An error occur while fetching specific person"));
        return res.status(500).send("An error occur while fetching specific person");
    }
})

Router.put('/updateperson/:id',function(req,res,next){
    if(decodedData.Role == 'write'){
        if(decodedData._id == req.params.id)
            return next();
        else
            return res.send("You dont havepermission to update");
    }
    else
        return next();
},async function(req,res){
    try{
        var id = req.params.id;
        var body = req.body;
        var updateperson = await Person.findByIdAndUpdate(id,body);
        return res.send("Record successfully updated");
    }catch(err){
        console.log(chalk.red("An error occur whie updating a person"));
        return res.status(500).send("An error occur while updating a person");
    }
})
Router.delete('/deleteperson/:id',async function(req,res){
    try{
        var id = req.params.id;
        var deleteperson = await Person.findByIdAndDelete(id);
        return res.json(deleteperson);
    }catch(err){
        console.log(chalk.red("An error occur while deleting a person"));
        return res.status(500).send("An error occur while deleting a person");
    }
})
module.exports = Router;
