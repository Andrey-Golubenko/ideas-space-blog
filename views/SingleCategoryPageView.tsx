import { getPostsByCategory } from '~/services/posts/posts.server'

interface ISingleCategoryPageViewProps {
  categoryId: string
}
const SingleCategoryPageView = async ({
  categoryId
}: ISingleCategoryPageViewProps) => {
  // TODO: Fetch posts by category
  const postsByCategory = await getPostsByCategory(categoryId)

  return <div>SingleCategoryPageView</div>
}

export default SingleCategoryPageView
