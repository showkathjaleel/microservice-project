const express= require("express");
const {randomBytes}=require("crypto")
const bodyParser = require ("body-parser")
const cors= require ('cors')
const axios=require("axios")

const app=express()
app.use(bodyParser.json())
app.use(cors())

app.get("/posts", (req , res) => {
    console.log("post il 111111111")
    res.status(201).json(posts)
})

const posts={}
app.post("/posts", async(req , res) => {
    console.log("post il 2222222222")
    const id = randomBytes(4).toString('hex')
    const {post}=req.body;
    posts[id]={
        id , post
    }

    await axios.post('http://localhost:4005/events',{
        type:'postCreated' ,
        data:{
            id,
            post
        }
    })
    res.status(201 ).json(posts)
})

app.post('/events', (req,res)=>{
    console.log("event ", req.body.type)
    res.send({})
})

app.listen(4000, ()=>{
    console.log("Post is listening at 4000")
})
