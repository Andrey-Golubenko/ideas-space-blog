import { Metadata } from 'next'

import SinglePostCard from '~/components/posts/SinglePostCard'
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

const SinglePostPage = async ({ params: { slug } }: ISinglePostProps) => {
  const singlePost = await getSinglePost(slug)

  return <SinglePostCard post={singlePost} />
}

export default SinglePostPage
