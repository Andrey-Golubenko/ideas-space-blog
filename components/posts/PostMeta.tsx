'use client'

import { useEffect, useState } from 'react'

import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from '~/components/ui/avatar'
import { getUserById } from '~/services/user'

import { CalendarIcon } from '@radix-ui/react-icons'
import { FaUser } from 'react-icons/fa'

interface IPostMetaProps {
  authorId: string
  itemCreatedAt: string
}

const PostMeta = ({ authorId, itemCreatedAt }: IPostMetaProps) => {
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

      <p className="flex items-center pl-3">
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
    </div>
  )
}

export default PostMeta
