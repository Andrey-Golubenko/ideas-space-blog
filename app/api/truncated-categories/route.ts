import { NextResponse } from 'next/server'

import { fetchCategoriesTruncated } from '~/services/categories/categories.server'
import { type TTruncatedCategories } from '~/types'

export async function GET() {
  try {
    const dbCategoriesTruncated: TTruncatedCategories[] | null | [] =
      await fetchCategoriesTruncated()

    return NextResponse.json(dbCategoriesTruncated)
  } catch (error) {
    console.error('Error fetching categories:', error)

    return NextResponse.json(
      { error: 'Failed to fetch categories!' },
      { status: 500 }
    )
  }
}
