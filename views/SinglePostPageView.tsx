import SinglePostCard from '~/components/posts/SinglePost'

interface ISinglePostProps {
  postId: string
  serverSinglePost?: FullPost | null
}

const SinglePostPageView = ({
  postId,
  serverSinglePost
}: ISinglePostProps) => {
  return (
    <SinglePostCard
      postId={postId}
      serverSinglePost={serverSinglePost}
    />
  )
}

export default SinglePostPageView
