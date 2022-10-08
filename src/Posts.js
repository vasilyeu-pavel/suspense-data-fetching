import React, { useEffect, memo } from 'react'
import { getPosts } from './resource'

const postsResource = getPosts()

const Posts = () => {
  const posts = postsResource.read()

  useEffect(() => {
    console.log("useEffect Posts")
  }, [])

  console.log("render", posts)

  return (
    <>
      <h3>Posts</h3>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  )
}

export default memo(Posts)
