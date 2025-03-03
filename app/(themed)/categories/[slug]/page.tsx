import { type Metadata } from 'next'

import SingleCategoryPageView from '~/views/SingleCategoryPageView'
import { toUpperCaseFirstChar } from '~/utils/helpers'
import { type ISlugPageParamsProps } from '~/types'

export async function generateMetadata({
  params: { slug }
}: ISlugPageParamsProps): Promise<Metadata> {
  const categoryName = toUpperCaseFirstChar(slug.split('-').join(' '))

  return {
    title: `Ideas space : ${categoryName}`,
    description:
      'Displaying a single blog category and posts related to it',
    robots: { index: true, follow: true }
  }
}

const SingleCategoryPage = ({
  params: { slug }
}: ISlugPageParamsProps) => {
  return <SingleCategoryPageView categorySlug={slug} />
}

export default SingleCategoryPage
