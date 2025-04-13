import { toUpperCaseFirstChar, checkIfPostExist } from '~/utils/helpers'

interface IUseSingleItemProps {
  post?: FullPost | null
  user?: UserDTO
}

export const useSingleItemProps = ({
  post,
  user
}: IUseSingleItemProps) => {
  const isPostExist = checkIfPostExist(post)

  const isPostManageable =
    post && user ? post?.authorId === user?.id : false

  const singlePostTitle: string | '' = post
    ? toUpperCaseFirstChar(post?.title)
    : ''

  const singlePostImageUrls = post?.imageUrls ?? []

  const singlePostCategories = post?.categories ?? []

  const singlePostCreatedAt = post?.createdAt
    ? new Date(post?.createdAt)?.toLocaleDateString('de')
    : ''

  const singlePostAuthorId = post?.authorId ?? ''

  const singlePostStatus = post?.status ?? 'DRAFT'

  const singlePostContent = post?.content ?? ''

  return {
    isPostExist,
    isPostManageable,
    singlePostTitle,
    singlePostImageUrls,
    singlePostCategories,
    singlePostCreatedAt,
    singlePostAuthorId,
    singlePostStatus,
    singlePostContent
  }
}
