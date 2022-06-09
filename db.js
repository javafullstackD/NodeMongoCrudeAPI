
const {MongoClient} = require('mongodb')

let dbConnection

module.exports ={

   connectDb :(cb)=>{
       MongoClient.connect('mongodb://locahost:27017/mydb')
       .then((client) =>{
         dbConnection = client.db()
         return cb()
       })
       .catch(err =>{
           console.log(err);
           return cb(err)
       })
   },
   getDb  :()=> dbConnection
}