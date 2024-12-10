'use client'

import { cloneElement, type ReactElement } from 'react'
import { usePathname } from 'next/navigation'

import { useListItemsDistribution } from '~/hooks/useListItemsDistribution'
import NoPostsCard from '~/components/posts/NoPostsCard'
import { PATHS } from '~/utils/constants'
import { type Post } from '@prisma/client'

interface IWithPostDataProps {
  children: ReactElement[]
  posts: Post[]
  postsCount: number
  isLoading: boolean
}

const WithPostData = ({
  children,
  posts,
  postsCount,
  isLoading
}: IWithPostDataProps) => {
  const pathname = usePathname()

  const publishedPosts =
    posts.filter((post) => {
      return post.published
    }) || []

  const desplayedPosts =
    pathname === PATHS.profile ? posts : publishedPosts

  const { skeletonItems, restItems, thirdItemInList, noItems } =
    useListItemsDistribution(desplayedPosts, postsCount)

  return (
    <section className="mb-8 w-full @container">
      {!noItems ? (
        cloneElement(children[0], {
          skeletonItems,
          isLoading
        })
      ) : (
        <NoPostsCard itemName="posts" />
      )}

      {!isLoading && restItems?.length > 0 && (
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
