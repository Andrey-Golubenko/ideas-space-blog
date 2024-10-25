'use client'

import { usePathname } from 'next/navigation'

import ItemCard from '~/components/shared/ItemCard'
import NoPostsCard from '~/components/posts/NoPostsCard'
import SkeletonsList from '~/components/posts/SkeletonsList'
import { useListItemsDistribution } from '~/hooks/useListItemsDistribution'
import { PATHS } from '~/utils/constants/constants'
import { type Post } from '@prisma/client'

interface IPostListProps {
  posts: Post[]
  postsCount: number | null
  isLoading: boolean
}

const PostsList = ({ posts, postsCount, isLoading }: IPostListProps) => {
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
        <SkeletonsList
          skeletonItems={skeletonItems}
          isLoading={isLoading}
        />
      ) : (
        <NoPostsCard itemName="posts" />
      )}

      <div className="mb-5 grid w-full grid-cols-1 gap-5 @md:grid-cols-2 @3xl:grid-cols-3">
        {!isLoading &&
          [...restItems, thirdItemInList]?.map((item) => {
            if (item) {
              return (
                <ItemCard
                  key={item?.id}
                  item={item}
                />
              )
            }

            return undefined
          })}
      </div>
    </section>
  )
}

export default PostsList
