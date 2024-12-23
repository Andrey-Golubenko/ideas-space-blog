'use client'

import { cloneElement, useRef, type ReactElement } from 'react'
import { usePathname } from 'next/navigation'

import { useListItemsDistribution } from '~/hooks/useListItemsDistribution'
import NoItemsCard from '~/components/posts/NoItemsCard'
import { PATHS } from '~/utils/constants'
import { type Post } from '@prisma/client'

interface IWithPostDataProps {
  children: ReactElement[]
  posts: Post[]
  postsCount: number | null
  isLoading: boolean
}

const WithPostData = ({
  children,
  posts,
  postsCount,
  isLoading
}: IWithPostDataProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const publishedPosts =
    posts?.filter((post) => {
      return post.published
    }) || []

  const desplayedPosts =
    pathname === PATHS.profile ? posts : publishedPosts

  const { skeletonItems, restItems, thirdItemInList, noItems } =
    useListItemsDistribution(desplayedPosts, postsCount, containerRef)

  const itemType = { isPost: true, isCategory: false }

  return (
    <section
      className="mb-8 w-full @container"
      ref={containerRef}
    >
      {!noItems ? (
        cloneElement(children[0], {
          skeletonItems,
          isLoading,
          itemType
        })
      ) : (
        <NoItemsCard itemName="posts" />
      )}

      {!isLoading && (restItems?.length > 0 || thirdItemInList) && (
        <div className="mb-5 grid w-full grid-cols-1 gap-5 @md:grid-cols-2 @3xl:grid-cols-3">
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
