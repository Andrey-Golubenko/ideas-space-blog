'use server'

import { db } from '~/libs/db'

export const fetchAllCategories = async () => {
  try {
    const categories = await db.categories.findMany()

    return categories
  } catch (error) {
    throw new Error('Somthing went wrong!')
  }
}
