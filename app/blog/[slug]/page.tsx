import { Metadata } from 'next'
import { getSinglePost } from '~/services/getPosts'
import { IPost } from '~/types'

interface PostProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params: { slug }
}: PostProps): Promise<Metadata> {
  const singlePost: IPost = await getSinglePost(slug)

  return {
    title: singlePost?.title
  }
}

export default async function Post({ params: { slug } }: PostProps) {
  const singlePost: IPost = await getSinglePost(slug)
  const singlePostTitle: string = singlePost?.title
    .charAt(0)
    .toUpperCase()
    .concat(singlePost?.title.slice(1))

  return (
    <div className="flex flex-col items-center justify-center">
      {singlePost && (
        <>
          <h1 className="py-4 text-center text-xl font-semibold">
            {singlePostTitle}
          </h1>
          <p className="py-4 text-center text-lg font-normal">
            {singlePost?.body}
          </p>
        </>
      )}
    </div>
  )
}
