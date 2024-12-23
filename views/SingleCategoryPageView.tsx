import { fetchSingleCategoryBySlug } from '~/services/categories'
import { getPostsByCategory } from '~/services/posts/posts.server'
import SingleCategoryCard from '~/components/categories/SingleCategoryCard'
import NoItemsCard from '~/components/posts/NoItemsCard'

interface ISingleCategoryPageViewProps {
  categorySlug: string
}

const SingleCategoryPageView = async ({
  categorySlug
}: ISingleCategoryPageViewProps) => {
  const singleCategory = await fetchSingleCategoryBySlug(categorySlug)

  const postsByCategory = await getPostsByCategory(
    singleCategory?.id || ''
  )

  if (typeof postsByCategory === 'string') {
    return <NoItemsCard itemName="posts" />
  }

  return postsByCategory?.posts ? (
    <SingleCategoryCard posts={postsByCategory.posts} />
  ) : (
    <NoItemsCard itemName="posts" />
  )
}

export default SingleCategoryPageView
