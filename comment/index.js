const express= require("express");
const {randomBytes}=require("crypto")
const bodyParser = require ("body-parser")
const axios=require("axios")

const app=express()
app.use(bodyParser.json())
const commentsByPostId={}

app.get("/posts/:id/comments", (req , res) => {
    console.log(commentsByPostId, '1111111111111111111111111111')

    res.status(201).send( commentsByPostId[req.params.id] || [] )
})
//creating a comment
app.post("/posts/:id/comments", async(req , res) => {
    const commentId = randomBytes(4).toString('hex')
    console.log(req.body , '2222222222')
    const {comment}=req.body; 
    const comments= commentsByPostId[req.params.id] || [] ;
    //if there is no comment associated with that post (undefined ) give an empty array
    comments.push({ id : commentId , comment , status: "pending" }) 
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events',{
        type:'commentCreated',
        data:{
            id:commentId,
            comment,
            postId : req.params.id,
            status : 'pending'
        }
    })
    res.status(201 ).send(comments )
})

app.post('/events', async (req,res)=>{
    const {type,data}= req.body;
    console.log("evenTTTTTTTT ",type )
    if(type==='commentModerated'){
        const {postId , id , status , comment }= data;
        //inorder to get the comments array for a specific post
        const comments= commentsByPostId[postId]
        const cmnt = comments.find(cmnt=>{
            return cmnt.id === id 
        })
        console.log(cmnt,'commentbefore')
        //overwrite the status in comment (pending ) with the incoming status(approved /rejected)
        cmnt.status = status;
        try{
        await axios.post('http://localhost:4005/events',{
            type:'commentUpdated',
            data :{
                id ,
                postId,
                comment ,
                status 
            }
        })
    }catch(err){
        console.log(err, 'err in comment-events-commentupdated')
    }

    }
    res.send({})
})

app.listen(4001, ()=>{
    console.log("Comment is listening at 4001")
})
