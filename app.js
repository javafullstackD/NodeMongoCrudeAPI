const express = require('express');
const { ObjectId } = require('mongodb');
const {connectDb, getDb} = require('./db')

//init  app & middleware
const app= express();
app.use(express.json())

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

app.get('/customers/:id',(req,res) =>{
    if(ObjectId.isValid(req.params.id)){
        db.collection('customers')
    .findOne({_id:ObjectId(req.params.id)})
    .then(doc =>{
        res.status(200).json(doc)
    })
    .catch(err =>{
        res.status(500).json({error:'Could not fetch the document'})
    })

    }
    else{
        res.status(500).json({error:'Not a valid doc id'})
    }
   
})
app.post('/customers',(req,res)=>{
    const customer = req.body
    db.collection('customers')
    .insertOne(customer)
    .then(result =>{
        res.status(201).json(result)
    })
    .catch(err =>{
        res.status(500).json({err:'Could not create a new document'})
    })

})
app.delete('/customers/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
  
    db.collection('customers')
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({error: 'Could not delete document'})
      })
  
    } else {
      res.status(500).json({error: 'Could not delete document'})
    }
  })

  app.patch('/customers/:id', (req, res) => {
    const updates = req.body
  
    if (ObjectId.isValid(req.params.id)) {
  
      db.collection('customers')
        .updateOne({ _id: new ObjectId(req.params.id) }, {$set: updates})
        .then(result => {
          res.status(200).json(result)
        })
        .catch(err => {
          res.status(500).json({error: 'Could not update document'})
        })
  
    } else {
      res.status(500).json({error: 'Could not update document'})
    }
  })


