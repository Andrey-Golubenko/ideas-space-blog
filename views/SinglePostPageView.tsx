import SinglePostCard from '~/components/posts/SinglePostCard'
import { getSinglePost } from '~/services/posts/posts.server'

interface ISinglePostProps {
  postId: string
}

const SinglePostPageView = async ({ postId }: ISinglePostProps) => {
  const singlePost = await getSinglePost(postId)

  return <SinglePostCard post={singlePost} />
}

export default SinglePostPageView
