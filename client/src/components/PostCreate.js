import React, { useState } from 'react'
import axios from 'axios'

const PostCreate = () => {

    const [post, setPost]=useState('')
    console.log(post , 'post')

    const handleSubmit=async (e)=>{
        e.preventDefault();
        await axios.post('http://localhost:4000/posts',
        {
          post  
        })
        setPost('')
    }

  return (
    <form onSubmit={handleSubmit} className='p-3 m-2'>
        <input
        className='h-5 border border-black' type="text" value={post} onChange={ (e)=> setPost(e.target.value) } />
        <button type='submit' className='bg-green-400 rounded h-5'>
            submit
        </button>
    </form>
  )
}

export default PostCreate