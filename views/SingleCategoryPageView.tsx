import SingleCategoryCard from '~/components/categories/SingleCategoryCard'
import { fetchSingleCategoryBySlug } from '~/services/categories'
import { getPostsByCategory } from '~/services/posts/posts.server'

interface ISingleCategoryPageViewProps {
  categorySlug: string
}

const SingleCategoryPageView = async ({
  categorySlug
}: ISingleCategoryPageViewProps) => {
  const singleCategory = await fetchSingleCategoryBySlug(categorySlug)

  const postsByCategory =
    (await getPostsByCategory(singleCategory?.id || '')) || []

  return <SingleCategoryCard posts={postsByCategory} />
}

export default SingleCategoryPageView
