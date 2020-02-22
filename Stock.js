const express = require('express')
var Stock = require('./Schema/GetStockData');
var app = express.Router();


app.post('/addstock',async (req, res) => {
        var body=req.body;
        var stock= new Stock(body);
        var stock1 = await stock.save();
        return res.json(stock1)
});
app.get('/getstock',(req,res)=>{
        Stock.find({},{_id:0,__v:0},(err,data)=>{
                if(err){
                        return res.status(500).send(err);
                }else{
                        return res.status(200).json(data);
                }
        })
})
module.exports = app;