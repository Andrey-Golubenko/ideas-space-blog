import SinglePostPageView from '~/views/SinglePostPageView'
import { type ISlugPageParamsProps } from '~/types'

const AdminSinglePostPage = ({
  params: { slug }
}: ISlugPageParamsProps) => {
  return <SinglePostPageView postId={slug} />
}

export default AdminSinglePostPage
