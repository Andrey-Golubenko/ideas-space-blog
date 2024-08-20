'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { type User } from 'next-auth'

import usePosts from '~/store'
import PostCard from '~/components/posts/PostCard'
import NoPostsCard from '~/components/posts/NoPostsCard'
import PostsSkeletonList from '~/components/posts/PostsSkeletonList'
import { PATHS } from '~/utils/constants/constants'

interface IPostListProps {
  currentUser?: UserDTO & User
}

const PostsLists = ({ currentUser }: IPostListProps) => {
  const pathName = usePathname()

  const [posts, postsCount, isLoading, getAllPosts] = usePosts((state) => {
    return [
      state.posts,
      state.postsCount,
      state.isLoading,
      state.getAllPosts
    ]
  })

  useEffect(() => {
    getAllPosts()
  }, [getAllPosts])

  const publishedPosts =
    posts.filter((post) => {
      return post.published
    }) || []

  const userPosts =
    posts.filter((post) => {
      return post.authorId === currentUser?.id
    }) || []

  const isBlog = pathName === PATHS.blog

  const exhibitablePost = isBlog ? publishedPosts : userPosts

  const [firstPost, secondPost, thirdPost, ...restPosts] = exhibitablePost

  const skeletonPosts = { firstPost, secondPost, thirdPost }

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
          restPosts?.map((post) => {
            return (
              <PostCard
                key={post?.id}
                post={post}
              />
            )
          })}
      </div>
    </section>
  )
}

export default PostsLists
