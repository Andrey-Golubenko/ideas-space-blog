import { Metadata } from 'next'

import SinglePostPageView from '~/views/SinglePostPageView'
import { getSinglePost } from '~/services/posts/posts.server'

interface ISinglePostProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params: { slug }
}: ISinglePostProps): Promise<Metadata> {
  const singlePost = await getSinglePost(slug)

  return {
    title: singlePost?.title
  }
}

const SinglePost = async ({ params: { slug } }: ISinglePostProps) => {
  return <SinglePostPageView postId={slug} />
}

export default SinglePost
