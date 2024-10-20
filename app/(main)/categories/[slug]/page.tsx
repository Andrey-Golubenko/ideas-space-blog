import { type Metadata } from 'next'
import { fetchSingleCategoryById } from '~/services/categories'
import SingleCategoryPageView from '~/views/SingleCategoryPageView'

interface ISingleCategoryPageProps {
  params: { slug: string }
}

export async function generateMetadata({
  params: { slug }
}: ISingleCategoryPageProps): Promise<Metadata> {
  const sinagleCategory = await fetchSingleCategoryById(slug)

  return {
    title: sinagleCategory?.name
  }
}

const SingleCategoryPage = ({
  params: { slug }
}: ISingleCategoryPageProps) => {
  return <SingleCategoryPageView categoryId={slug} />
}

export default SingleCategoryPage
