'use client'

import { type Post } from '@prisma/client'

import PostCard from '~/components/posts/PostCard/PostCard'
import NoPostsCard from '~/components/posts/NoPostsCard'
import PostsSkeletonList from '~/components/posts/PostsSkeletonList'
import { useTablet } from '~/hooks/useTablet'

interface IPostListProps {
  posts: Post[]
  postsCount: number | null
  isLoading: boolean
}

const PostsList = ({ posts, postsCount, isLoading }: IPostListProps) => {
  const isTablet = useTablet()

  const publishedPosts =
    posts.filter((post) => {
      return post.published
    }) || []

  const [firstPost, secondPost, thirdPost, ...restPosts] = publishedPosts

  const thirdPostPlace = !isTablet && postsCount! > 3

  const isThirdPostInSkeleton = thirdPostPlace ? thirdPost : undefined

  const isThirdPostInList = !thirdPostPlace ? thirdPost : undefined

  const skeletonPosts = {
    firstPost,
    secondPost,
    thirdPost: isThirdPostInSkeleton
  }

  const noPosts = typeof postsCount === 'number' && postsCount === 0

  return (
    <section className="mb-8 w-full">
      {!noPosts ? (
        <PostsSkeletonList
          skeletonPosts={skeletonPosts}
          isLoading={isLoading}
        />
      ) : (
        <NoPostsCard />
      )}

      <div className="mb-5 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {!isLoading &&
          [...restPosts, isThirdPostInList]?.map((post) => {
            if (post) {
              return (
                <PostCard
                  key={post?.id}
                  post={post}
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
