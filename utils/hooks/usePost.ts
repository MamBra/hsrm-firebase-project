import React, { useEffect, useState } from 'react'
import { getDatabase, ref, set, onValue } from 'firebase/database'
import '../../config/firebase'

const db = getDatabase()

export type Post = {
    id: string,
    userId: string,
    timestamp: number,
    message: string
}

export default function usePost(postId: string) {
  const [post, setPostVal] = useState<Post>()
  const dbRef = ref(db, `posts/${postId}`)

  const setPost = (post: Post) =>{
    setPostVal(post);
    set(dbRef, post)
  }

  const setMessage = (message: string) => {
    setPost({
      ...post,
      message,
      timestamp: Date.now()
    } as Post)
  }

  const deletePost = () => { 
    set(dbRef, null)
  }

  useEffect(() => {
    const unsubscribeFromValueChanged = onValue(dbRef, (snapshot) => {
        setPostVal(snapshot.val());
    })

    return unsubscribeFromValueChanged
  }, [])

  return [
    post as Post, setPost, setMessage, deletePost
  ] as const;
}