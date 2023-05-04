const express= require("express");
const bodyParser = require ("body-parser")
const cors= require ('cors')
const axios=require("axios")

const app=express()
app.use(bodyParser.json())
app.use(cors())


app.post('/events',async (req,res)=>{
    //here we want to set the status
   const {type , data } = req.body ;
   if(type==="commentCreated"){
   const status = data.comment.includes('orange')
    ? 'rejected '
    : 'approved' 
   
  await axios.post('http://localhost:4001/events',{
    type: 'commentModerated',
    data : {
        id : data.id ,
        postId : data.postId ,
        status ,
        comment: data.comment     
    }
  })
}
 res.send({})
})

app.listen(4003, ()=>{
    console.log("moderation is listening at 4003")
})
