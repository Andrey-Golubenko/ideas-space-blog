import { NextRequest, NextResponse } from 'next/server'

import { fetchFilteredCategoriesWithPag } from '~/services/categories/categories.server'
import { DEFAULT_CATEGORIES_PER_PAGE } from '~/utils/constants'
import {
  type IFetchDataFunctionProps,
  type TCategoriesData
} from '~/types'
import { type Categories } from '@prisma/client'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const limit = searchParams.get('limit')
  const offset = searchParams.get('offset')
  const searchQuery = searchParams.get('q')

  const dataCategoriesProps: IFetchDataFunctionProps = {
    limit: Number(limit) ?? DEFAULT_CATEGORIES_PER_PAGE,
    offset: Number(offset) ?? 0,
    searchQuery
  }

  try {
    const dbCategories: {
      categories: Categories[]
      categoriesCount: number
    } | null = await fetchFilteredCategoriesWithPag(dataCategoriesProps)

    const data: TCategoriesData = dbCategories?.categories?.length
      ? {
          categories: dbCategories?.categories,
          categoriesCount: dbCategories?.categoriesCount
        }
      : 'It seems there are no categories yet.'

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching categories:', error)

    return NextResponse.json(
      { error: 'Failed to fetch categories!' },
      { status: 500 }
    )
  }
}
