import { type Metadata } from 'next'

import SinglePostPageView from '~/views/SinglePostPageView'
import { getSinglePost } from '~/services/posts/posts.server'
import { type ISlugPageParamsProps } from '~/types'

export async function generateMetadata({
  params: { slug }
}: ISlugPageParamsProps): Promise<Metadata> {
  const singlePost = await getSinglePost(slug)

  return {
    title: `Ideas space : ${singlePost?.title}`,
    description: 'Displaying a single blog post',
    robots: { index: true, follow: true }
  }
}

const SinglePostPage = async ({
  params: { slug }
}: ISlugPageParamsProps) => {
  return <SinglePostPageView postId={slug} />
}

export default SinglePostPage
