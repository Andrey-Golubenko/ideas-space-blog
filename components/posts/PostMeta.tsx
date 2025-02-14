'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CalendarIcon } from '@radix-ui/react-icons'

import { usePage } from '~/hooks/usePage'
import { Skeleton } from '~/components/ui/skeleton'
import UserAvatar from '~/components/shared/UserAvatar'
import { getUserById } from '~/services/user'
import { PATHS } from '~/utils/constants'

interface IPostMetaProps {
  hasContent: boolean
  authorId: string
  itemCreatedAt: string
  isPublished?: boolean
}

const PostMeta = ({
  hasContent,
  authorId,
  itemCreatedAt,
  isPublished
}: IPostMetaProps) => {
  const [postAuthor, setPostAuthor] = useState<UserDTO | null>(null)

  useEffect(() => {
    if (authorId) {
      const author = async () => {
        const postCreator = await getUserById(authorId)

        return setPostAuthor(postCreator)
      }

      author()
    }
  }, [authorId])

  const { isProfilePage } = usePage()

  if (!hasContent) {
    return (
      <div className="!mt-4 mb-8 w-full px-6">
        <div className="mb-2 flex items-center">
          <Skeleton className="mr-2 h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="mb-2 flex items-center pl-1.5">
          <Skeleton className="mr-3 h-3 w-5 " />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    )
  }

  const userImageUrl = postAuthor?.image ? postAuthor?.image : ''

  return (
    <div className="mb-2 w-full">
      <div className="mb-2 ">
        <Link
          href={PATHS.publicProfile(authorId)}
          className="group flex items-center hover:brightness-110"
        >
          <UserAvatar
            userImageUrl={userImageUrl}
            className="mr-2 border border-slate-300 hover:shadow-lg"
          />

          <span className="text-sm tracking-wider text-slate-500 group-hover:text-slate-800">
            {postAuthor?.name}
          </span>
        </Link>
      </div>

      <p className="mb-2 flex items-center pl-3">
        <CalendarIcon
          height="17px"
          width="17px"
          className="mr-2"
        />
        <time
          className="text-sm italic tracking-wider text-slate-500"
          suppressHydrationWarning
        >
          {itemCreatedAt}
        </time>
      </p>

      {isProfilePage && (
        <p className="flex items-center pl-3">
          <span className="mr-2">Status: </span>
          <span className="text-sm tracking-wider text-red-800">
            {isPublished ? 'Published' : 'Draft'}
          </span>
        </p>
      )}
    </div>
  )
}

export default PostMeta
