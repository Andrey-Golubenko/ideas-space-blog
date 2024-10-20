'use client'

import { Post } from '@prisma/client'
import ItemCard from '~/components/shared/ItemCard'
import NoPostsCard from '~/components/posts/NoPostsCard'
import SkeletonsList from '~/components/posts/SkeletonsList'
import { useListItemsDistribution } from '~/hooks/useListItemsDistribution'

interface IPostListProps {
  posts: Post[]
  postsCount: number | null
  isLoading: boolean
}

const PostsList = ({ posts, postsCount, isLoading }: IPostListProps) => {
  const publishedPosts =
    posts.filter((post) => {
      return post.published
    }) || []

  const { skeletonItems, restItems, thirdItemInList, noItems } =
    useListItemsDistribution(publishedPosts, postsCount)

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

      <div className="mb-5 grid w-full grid-cols-1 gap-5 @sm:grid-cols-2 @3xl:grid-cols-3">
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
