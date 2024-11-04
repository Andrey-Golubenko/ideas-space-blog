import { Session } from 'next-auth'
import { auth } from '~/libs/auth/auth'
import SinglePostCard from '~/components/posts/SinglePost'
import { getSinglePost } from '~/services/posts/posts.server'

interface ISinglePostProps {
  postId: string
}

const SinglePostPageView = async ({ postId }: ISinglePostProps) => {
  const { user } = (await auth()) as Session
  const serverSinglePost = await getSinglePost(postId)

  return (
    <SinglePostCard
      postId={postId}
      user={user}
      serverSinglePost={serverSinglePost}
    />
  )
}

export default SinglePostPageView
