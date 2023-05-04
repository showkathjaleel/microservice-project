import React, { useState } from 'react'
import axios from "axios"

const CommentCreate = ({postId}) => {
    const [comment,setComment]=useState('')

    const handleSubmit=async (e)=>{
    e.preventDefault()
   await axios.post(`http://localhost:4001/posts/${postId}/comments`,{
      comment
    })
    setComment('')
    }
   

  return (
    <form onSubmit={handleSubmit}>
   <h1>Create Comment</h1>
   <input className='border border-black' type="text" value={comment} onChange={(e)=> setComment(e.target.value)}/>
   <button type='submit'>
    Submit
   </button>
    </form>
  )
}

export default CommentCreate