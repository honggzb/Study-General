import Link from 'next/link';
import React from 'react'

async function getData() {
  const res = await fetch("https://dummyjson.com/posts", {
    cache: 'no-cache'     //force-cache
  });
  if(!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const PostsPage = async () => {
  //console.log('searchParmas from server component', searchParams.search);
  const data = await getData();
  //console.log('data', data);
  return (
    <div>{data.posts.map((post, id) => (
      <div key={post.id}>
        <Link href={`/posts/${post.id}`}>{post.title}</Link>
      </div>
    ))}</div>
  )
}

export default PostsPage