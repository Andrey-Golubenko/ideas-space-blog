'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from '~/components/ui/avatar'
import { getUserById } from '~/services/user'

import { CalendarIcon } from '@radix-ui/react-icons'
import { FaUser } from 'react-icons/fa'
import { PATHS } from '~/utils/constants'

interface IPostMetaProps {
  authorId: string
  itemCreatedAt: string
  isPublished?: boolean
}

const PostMeta = ({
  authorId,
  itemCreatedAt,
  isPublished
}: IPostMetaProps) => {
  const [postAuthor, setPostAuthor] = useState<UserDTO | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (authorId) {
      const author = async () => {
        const postCreator = await getUserById(authorId)

        return setPostAuthor(postCreator)
      }

      author()
    }
  }, [authorId])

  const isProfile = pathname.includes(PATHS.profile)

  return (
    <div className="mb-4 w-full">
      <div className="mb-2 flex items-center">
        <Avatar className="mr-2 border border-slate-300">
          <AvatarImage
            src={(postAuthor?.image as string) ?? ''}
            alt={postAuthor?.name ?? 'Anonymous'}
          />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
        <span className="text-sm tracking-wider text-slate-500">
          {postAuthor?.name}
        </span>
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

      {isProfile && (
        <p className="flex items-center pl-3">
          <span className="mr-2">State: </span>
          <span className="text-sm tracking-wider text-red-800">
            {isPublished ? 'Published' : 'Draft'}
          </span>
        </p>
      )}
    </div>
  )
}

export default PostMeta
