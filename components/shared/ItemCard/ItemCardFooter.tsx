'use client'

import Link from 'next/link'

import useStore from '~/store'
import { CardFooter } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { PATHS } from '~/utils/constants/constants'
import { useEffect, useState, useTransition } from 'react'
import { getUserRole } from '~/utils/helpers/server.helpers'
import { Categories, UserRole } from '@prisma/client'
import DeleteCategoryButton from '~/components/categories/DeleteCategoryButton'
import EditCategoryButton from '~/components/categories/EditCategoryButton'

interface IItemCardFooterProps {
  itemSlug?: string
  itemType: { isPost: boolean; isCategory: boolean }
}

const PostCardFooter = ({ itemSlug, itemType }: IItemCardFooterProps) => {
  const { isPost, isCategory } = itemType

  const [userRole, setUserRole] = useState<UserRole>(UserRole.USER)

  useEffect(() => {
    if (isCategory) {
      const fetchUserRole = async () => {
        const currentUserRole = await getUserRole()
        if (currentUserRole) setUserRole(currentUserRole)
      }

      fetchUserRole()
    }
  }, [])

  const [categories, setEditableCategory] = useStore((state) => {
    return [state.categories, state.setEditableCategory]
  })

  const localEditableCategory = categories?.find((category) => {
    return category?.slug === itemSlug
  })

  const [isPending, startTransition] = useTransition()

  const isAdmin: boolean = userRole === UserRole.ADMIN

  return (
    <CardFooter className="mt-auto flex-col justify-end">
      <Button
        variant="link"
        className="mb-12 ml-auto font-normal"
        size="sm"
        asChild
      >
        <Link
          href={
            (isPost && `${PATHS.blog}/${itemSlug}`) ||
            (isCategory && `${PATHS.categories}/${itemSlug}`) ||
            '#'
          }
          className="hover:no-underline"
        >
          <span className="rounded-lg bg-slate-100 px-2 py-2 hover:bg-slate-50 hover:text-slate-500">
            Read more . . .
          </span>
        </Link>
      </Button>

      {isAdmin && (
        <div className="flex w-full flex-col items-center justify-center gap-y-4">
          <DeleteCategoryButton
            categoryId={(localEditableCategory as Categories)?.id}
            imageUrl={(localEditableCategory as Categories)?.imageUrl}
            isAdmin={isAdmin}
            isPending={isPending}
            startTransition={startTransition}
          />

          <EditCategoryButton
            category={localEditableCategory as Categories}
            setEditableCategory={setEditableCategory}
            isPending={isPending}
          />
        </div>
      )}
    </CardFooter>
  )
}

export default PostCardFooter
