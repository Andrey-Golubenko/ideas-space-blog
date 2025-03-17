import { getSinglePost } from '~/services/posts/posts.server'
import SinglePostPageView from '~/views/SinglePostPageView'
import { type ISlugPageParamsProps } from '~/types'

const AdminSinglePostPage = async ({
  params: { slug }
}: ISlugPageParamsProps) => {
  const serverSinglePost = await getSinglePost(slug)

  return (
    <SinglePostPageView
      postId={slug}
      serverSinglePost={serverSinglePost}
    />
  )
}

export default AdminSinglePostPage
