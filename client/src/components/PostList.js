import axios from 'axios'
import React,{useEffect, useState} from 'react'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

const PostList = () => {
    const [posts , setPosts]=useState({})
    const fetchList = async ()=> {
        try{
           const {data}= await axios.get('http://localhost:4002/posts')
           console.log(data,'dataaaaaaaaaaa')
           setPosts(data)
        }catch(err) {
            console.log(err)
        }
    }
    useEffect(()=>{
      fetchList()
    }, [])

    // Object.values()  return array of values
    const renderedPost= Object.values(posts).map((post)=>{
        return (
            <div key={post.id} className='w-96 h-96 border border-black ' >
             {post.id}
             <div className=''>
             <h3>{post.post}</h3>
             <CommentList comments={post.comments}/>
             <CommentCreate postId={post.id}/>
             </div>
            </div>
        )
    })
  

  return (
    <div className=' flex  justify-center flex-wrap'>
    {renderedPost}
    </div>
  )
}

export default PostList