'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const SinglePostPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);
  async function getData() {
    try {
      setLoading(true);
      const data = await fetch(`https://dummyjson.com/posts/${params.postid}`);
      const post = await data.json();
      //console.log('post', post);
      if(post?.title) {
        setPost(post);
        setLoading(false);
      }
    } catch (error) {
      setPost([]);
      setLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  //console.log('parmas fro server component:', params.postid);
  if(loading) return <>loading...</>
  return (
    <div>{post?.title && <div>{post.title}</div>}</div>
  )
}

export default SinglePostPage