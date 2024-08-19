'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { type User } from 'next-auth'

import usePosts from '~/store'
import PostCard from '~/components/posts/PostCard'
import PostsCardsSkeleton from '~/components/posts/PostsCardsSkeleton'
import { Card, CardContent } from '~/components/ui/card'
import { PATHS } from '~/utils/constants/constants'

interface IPostListProps {
  currentUser?: UserDTO & User
}

const PostsLists = ({ currentUser }: IPostListProps) => {
  const pathName = usePathname()

  const [posts, isLoading, getAllPosts] = usePosts((state) => {
    return [state.posts, state.isLoading, state.getAllPosts]
  })

  useEffect(() => {
    getAllPosts()
  }, [getAllPosts])

  const isBlog = pathName === PATHS.blog

  const publishedPosts =
    posts.filter((post) => {
      return post.published
    }) || []

  const userPosts =
    posts.filter((post) => {
      return post.authorId === currentUser?.id
    }) || []

  const exhibitablePost = isBlog ? publishedPosts : userPosts

  const [firstPost, secondPost, thirdPost, ...restPosts] = exhibitablePost

  return (
    <>
      {!isBlog && (
        <Card className="mb-7 flex w-full flex-row items-center justify-center">
          <CardContent className="py-4 text-2xl font-semibold">
            User posts
          </CardContent>
        </Card>
      )}
      <section className="mb-8 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        <PostsCardsSkeleton
          post={firstPost}
          isLoading={isLoading}
        />

        {firstPost && !secondPost ? (
          ''
        ) : (
          <PostsCardsSkeleton
            post={secondPost}
            isLoading={isLoading}
          />
        )}

        {firstPost && !thirdPost ? (
          ''
        ) : (
          <PostsCardsSkeleton
            post={thirdPost}
            isLoading={isLoading}
          />
        )}

        {!isLoading &&
          restPosts?.map((post) => {
            return (
              <PostCard
                key={post?.id}
                post={post}
              />
            )
          })}
      </section>
    </>
  )
}

export default PostsLists
