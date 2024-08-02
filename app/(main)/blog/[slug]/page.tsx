import { Metadata } from 'next'
import { getPosts, getSinglePost } from '~/services/posts'

interface ISinglePostProps {
  params: {
    slug: string
  }
}

// export async function generateStaticParams() {
//   const posts = await getPosts()

//   return posts.map((post) => {
//     return {
//       slug: String(post?.id)
//     }
//   })
// }

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

  const singlePostTitle: string | undefined = singlePost?.title
    .charAt(0)
    .toUpperCase()
    .concat(singlePost?.title.slice(1))

  return (
    <div className="page-heading flex flex-col items-center justify-center">
      {singlePost && (
        <>
          <h1 className="page-heading text-justify">
            <span className="float-start">
              <span className="mr-1 underline">Title</span>
              <span className="mr-3">:</span>
            </span>
            {singlePostTitle}
          </h1>
          <div className="py-4 text-justify text-lg font-normal">
            <span className="float-start">
              <span className="mr-1 underline">Content</span>
              <span className="mr-3">:</span>
            </span>
            {singlePost?.content}
          </div>
        </>
      )}
    </div>
  )
}

export default SinglePostPage
