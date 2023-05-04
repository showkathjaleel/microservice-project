import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CommentList = ({comments}) => {
    console.log(comments,'comments in commentlist')

    // const [comments,setComments]=useState([])
    // useEffect(()=>{
    // fetchComments()
    // },[])

    // const fetchComments=async()=>{
    //     const {data}= await axios.get(`http://localhost:4001/posts/${postId}/comments`)
    //     setComments(data)
    // }
    

    const renderedComments = comments?.map((comment)=>{
        let content;
        if(comment.status==='pending'){
            content='This comment is waiting for moderation'
        }
        if(comment.status==='approved'){
            content=comment.comment
        }
        if(comment.status==='rejected'){
            content='This comment is rejected'
        }
        return (
            <li key={comment.id }>
                {content }
            </li>
        )
    })

  return (
    <div>
    {renderedComments}
    </div>
  )
}

export default CommentList