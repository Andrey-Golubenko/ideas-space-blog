'use client'

import { useEffect, useState } from 'react'
import { type Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { FaUser } from 'react-icons/fa'
import { ExitIcon } from '@radix-ui/react-icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from '~/components/ui/avatar'
import LogoutButton from './LogoutButton'

const UserButton = () => {
  const [user, setUser] = useState<Session['user'] | undefined>()

  useEffect(() => {
    const getSessionData = async () => {
      const sessionData = await getSession()
      setUser(sessionData?.user)
    }
    getSessionData()
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={(user?.image as string) || ''} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <LogoutButton>
          <DropdownMenuItem className="flex cursor-pointer items-center justify-around">
            <ExitIcon className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
