import SinglePost from '~/components/posts/SinglePost'

interface ISinglePostProps {
  postId: string
  serverSinglePost?: FullPost | null
}

const SinglePostPageView = ({
  postId,
  serverSinglePost
}: ISinglePostProps) => {
  return (
    <SinglePost
      postId={postId}
      serverSinglePost={serverSinglePost}
    />
  )
}

export default SinglePostPageView
