import { Session } from 'next-auth'
import { auth } from '~/libs/auth/auth'
import SinglePostCard from '~/components/posts/SinglePost'

interface ISinglePostProps {
  postId: string
}

const SinglePostPageView = async ({ postId }: ISinglePostProps) => {
  const { user } = (await auth()) as Session
  return (
    <SinglePostCard
      postId={postId}
      user={user}
    />
  )
}

export default SinglePostPageView
