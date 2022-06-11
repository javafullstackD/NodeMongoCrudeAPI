const express = require('express');
const {connectDb, getDb} = require('./db')

//init  app & middleware
const app= express();

//db connection
let db

connectDb((err)=>{
   if(!err){
    app.listen(3000, ()=>{
        console.log('app listing on port 3000');
    })
    db= getDb()
   }
})


//routes
app.get('/customers',(req,res)=>{
    let customers =[]

    db.collection('customers')
    .find() 
    .sort({name:1})
    .forEach(customer => customers.push(customer))
    .then(() => {
        res.status(200).json(customers)
    })
    .catch(()=>{
        res.status(500).json({error:'Could not fetch the documents'})
    })
    
    
})
