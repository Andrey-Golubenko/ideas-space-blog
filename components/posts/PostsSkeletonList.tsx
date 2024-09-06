import { type Post } from '@prisma/client'

import PostCardSkeleton from '~/components/posts/PostCard/PostCardSkeleton'

interface IPostsSkeletonListProps {
  skeletonPosts: {
    firstPost?: Post
    secondPost?: Post
    thirdPost?: Post
  }
  isLoading: boolean
}

const PostsSkeletonList = ({
  skeletonPosts,
  isLoading
}: IPostsSkeletonListProps) => {
  const { firstPost, secondPost, thirdPost } = skeletonPosts

  return (
    <div className="mb-5 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      <PostCardSkeleton
        post={firstPost}
        isLoading={isLoading}
      />
      {firstPost && !secondPost ? null : (
        <PostCardSkeleton
          post={secondPost}
          isLoading={isLoading}
        />
      )}

      {firstPost && !thirdPost ? null : (
        <PostCardSkeleton
          post={thirdPost}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

export default PostsSkeletonList
