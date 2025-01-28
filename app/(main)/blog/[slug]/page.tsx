import { type Metadata } from 'next'

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
    title: `Ideas space : ${singlePost?.title}`,
    description: 'Displaying a single blog post',
    robots: { index: true, follow: true }
  }
}

const SinglePostPage = async ({ params: { slug } }: ISinglePostProps) => {
  return <SinglePostPageView postId={slug} />
}

export default SinglePostPage
