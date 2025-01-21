'use client'

import { cloneElement, useRef, type ReactElement } from 'react'
import { usePathname } from 'next/navigation'

import { useListItemsDistribution } from '~/hooks/useListItemsDistribution'
import { PATHS } from '~/utils/constants'
import { type Post } from '@prisma/client'
import { type TDeserializedPost } from '~/types'

interface IWithPostDataProps {
  children: ReactElement[]
  posts: (Post | TDeserializedPost)[]
  postsCount: number | null
  isLoading: boolean
  dataContainerClasses?: string
  postsGridClasses?: string
}

const WithPostData = ({
  children,
  posts,
  postsCount,
  isLoading,
  dataContainerClasses,
  postsGridClasses
}: IWithPostDataProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const publishedPosts =
    posts?.filter((post) => {
      return post.published
    }) || []

  const desplayedPosts =
    pathname === PATHS.profile ? posts : publishedPosts

  const { skeletonItems, restItems, thirdItemInList } =
    useListItemsDistribution(desplayedPosts, postsCount, containerRef)

  const itemType = { isPost: true, isCategory: false }

  return (
    <section
      className={`mb-8 w-full @container ${dataContainerClasses || ''}`}
      ref={containerRef}
    >
      {cloneElement(children[0], {
        skeletonItems,
        isLoading,
        itemType
      })}

      {!isLoading && (restItems?.length > 0 || thirdItemInList) && (
        <div
          className={`mb-5 grid w-full grid-cols-1 gap-5 @md:grid-cols-2 @3xl:grid-cols-3 ${postsGridClasses || ''}`}
        >
          {[...restItems, thirdItemInList]?.map((item) => {
            if (item) {
              return cloneElement(children[1], {
                key: item?.id,
                item
              })
            }

            return undefined
          })}
        </div>
      )}
    </section>
  )
}

export default WithPostData
