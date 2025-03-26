import { notFound } from 'next/navigation'
import { type Metadata } from 'next'

import SingleCategoryPageView from '~/views/SingleCategoryPageView'
import { categoryExists } from '~/services/categories/categories.server'
import { toUpperCaseFirstChar } from '~/utils/helpers'
import { type ISlugPageParamsProps } from '~/types'

export async function generateMetadata({
  params: { slug }
}: ISlugPageParamsProps): Promise<Metadata> {
  const isCategoryExist = await categoryExists(slug)
  if (!isCategoryExist) {
    return {
      title: 'Category not found',
      description: 'The requested category does not exist'
    }
  }

  const categoryName = toUpperCaseFirstChar(slug.split('-').join(' '))
  return {
    title: `Ideas space : ${categoryName}`,
    description:
      'Displaying a single blog category and posts related to it',
    robots: { index: true, follow: true }
  }
}

const SingleCategoryPage = async ({
  params: { slug }
}: ISlugPageParamsProps) => {
  const isCategoryExist = await categoryExists(slug)

  if (!isCategoryExist) {
    notFound()
  }

  return <SingleCategoryPageView categorySlug={slug} />
}

export default SingleCategoryPage
