import { Metadata } from 'next'
import { IPost } from '~/app/blog/page'

interface PostProps {
  params: {
    slug: string
  }
}

async function getSinglePost(slug: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${slug}`,
    {
      next: {
        revalidate: 60 // sec
      }
    }
  )

  return response.json()
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
