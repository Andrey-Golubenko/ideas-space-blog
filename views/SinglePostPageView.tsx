import { getSinglePost } from '~/services/posts/posts.server'
import SinglePostCard from '~/components/posts/SinglePost'

interface ISinglePostProps {
  postId: string
}

const SinglePostPageView = async ({ postId }: ISinglePostProps) => {
  const serverSinglePost = await getSinglePost(postId)

  return (
    <SinglePostCard
      postId={postId}
      serverSinglePost={serverSinglePost}
    />
  )
}

export default SinglePostPageView
