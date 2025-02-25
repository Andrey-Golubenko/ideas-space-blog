'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { type User } from 'next-auth'

import { useCurrentUser } from '~/hooks/useCurrentUser'
import { usePage } from '~/hooks/usePage'
import { getUserById } from '~/services/user'
import UserBadge from '~/components/shared/UserProfileBar/UserBadge'

const UserProfileBar = () => {
  const [displayedUser, setDisplayedUser] = useState<
    (UserDTO & User) | undefined | null
  >(null)

  const currentUser = useCurrentUser()

  const params = useParams()
  const userId = params?.slug

  useEffect(() => {
    if (userId) {
      const runGetUserById = async () => {
        const userById = await getUserById(userId as string)

        setDisplayedUser(userById)
      }

      runGetUserById()
    } else {
      setDisplayedUser(currentUser)
    }
  }, [currentUser, userId])

  const { isProfilePage, isSubProfilePage } = usePage()

  if (isSubProfilePage || isProfilePage) {
    return (
      <div className="grid-col-1 mx-4 mt-12 grid w-[calc(100%-32px)] gap-x-4 md:grid-cols-3 lg:mx-10 lg:w-[calc(100%-80px)]">
        <div className="col-start-1 flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-3 rounded-xl bg-secondary p-2.5 shadow-sm">
          <UserBadge displayedUser={displayedUser} />
        </div>
      </div>
    )
  }

  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 rounded-xl bg-secondary p-4 shadow-sm xs:w-[80%] sm:w-[65%] md:w-[45%] lg:w-[35%]">
      <UserBadge displayedUser={displayedUser} />
    </div>
  )
}

export default UserProfileBar
