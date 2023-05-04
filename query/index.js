const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require ('axios')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const handleEvents = (type, data) => {
  if (type === "postCreated") {
    const { id, post } = data;
    posts[id] = { id, post, comments: [] }; //comments is an empty array
  }
  if (type === "commentCreated") {
    const { id, comment, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, comment, status });
  }

  if (type === "commentUpdated") {
    const { postId, id, status, comment } = data;
    //inorder to get the comments array for a specific post
    const post = posts[postId];

    const cmnt = post.comments.find((cmnt) => {
      return cmnt.id === id;
    });

    //overwrite the status in comment (pending ) with the incoming status(approved /rejected)
    cmnt.status = status;
    cmnt.comment = comment;
  }
};

//fetch all the posts and comments
const posts = {};
// { '50f0489d': { id: '50f0489d', post: 'first', comments: [] } }

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
 handleEvents(type , data)
  res.send({});
});


app.listen(4002, async () => {
    console.log("query is Listening on 4002");
    try {
      const res = await axios.get("http://localhost:4005/events");
  
      for (let event of res.data) {
        console.log("Processing event:", event.type);
  
        handleEvents(event.type, event.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  });





// app.listen(4002, async() => {
//   console.log("query is listening on 4002");

//   const res=await axios.get('http://localhost:4005/events')
//   //res.data - array of events
//   for (let event of res.data){
//     handleEvents(event.type , event.data)
//   }
// });
