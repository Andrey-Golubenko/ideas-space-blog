import { Session } from 'next-auth'

import { auth } from '~/libs/auth/auth'
import { getSinglePost } from '~/services/posts/posts.server'
import SinglePostCard from '~/components/posts/SinglePost'

interface ISinglePostProps {
  postId: string
}

const SinglePostPageView = async ({ postId }: ISinglePostProps) => {
  const currentUser = ((await auth()) as Session)?.user
  const serverSinglePost = await getSinglePost(postId)

  return (
    <SinglePostCard
      postId={postId}
      user={currentUser}
      serverSinglePost={serverSinglePost}
    />
  )
}

export default SinglePostPageView
