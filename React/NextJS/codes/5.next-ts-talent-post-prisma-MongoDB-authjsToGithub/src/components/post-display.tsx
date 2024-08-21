import {prisma} from '@/prisma'
import SinglePost from './single-post';

async function getPost() {
  const data = await prisma.post.findMany();
  return data;
}

const PostDisplay = async () => {
  const data = await getPost();

  return (
    <div>
      {data?.length>0 && (
        <div className='w-full grid grid-cols-1'>
          {data.map((post) => (
            <div key={post.id}><SinglePost postData={post} /></div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PostDisplay