import SingleCategoryCard from '~/components/categories/SingleCategoryCard'
import { fetchSingleCategoryByName } from '~/services/categories'
import { getPostsByCategory } from '~/services/posts/posts.server'

interface ISingleCategoryPageViewProps {
  categoryName: string
}

const SingleCategoryPageView = async ({
  categoryName
}: ISingleCategoryPageViewProps) => {
  // TODO: Fetch posts by category
  const singleCategory = await fetchSingleCategoryByName(categoryName)

  const postsByCategory =
    (await getPostsByCategory(singleCategory!?.id)) || []

  return <SingleCategoryCard posts={postsByCategory} />
}

export default SingleCategoryPageView
