import Link from 'next/link'
import { ExitIcon } from '@radix-ui/react-icons'

import { UserRole } from '@prisma/client'
import { usePage } from '~/hooks/usePage'
import { useCanLogout } from '~/hooks/useCanLogout'
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import ProfileInfoItem from '~/components/profile/ProfileInfoItem'
import LogoutButton from '~/components/auth/LogoutButton'
import { PATHS } from '~/utils/constants'

interface IProfileInfoProps {
  label: string
  user?: UserDTO | null
  hasFullAccess?: boolean
}

const ProfileInfo = ({
  label,
  user,
  hasFullAccess = false
}: IProfileInfoProps) => {
  const { canLogout, currentUser } = useCanLogout(user)
  const { isSubProfilePage } = usePage()

  const isAdmin = currentUser?.role === UserRole.ADMIN

  const editProfilePath =
    isAdmin && isSubProfilePage && user
      ? PATHS.adminEditUser(user?.id)
      : PATHS.settings

  return (
    <Card className="h-full rounded-xl pb-8 shadow-md">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">{label}</p>
      </CardHeader>

      <CardContent className="space-y-4 md:px-2 md:pt-0  lg:p-6 lg:pt-0 ">
        <ProfileInfoItem
          label="Name"
          item={user?.name}
        />

        <ProfileInfoItem
          label="Email"
          item={user?.email}
        />

        {hasFullAccess && (
          <>
            <ProfileInfoItem
              label="ID"
              item={user?.id}
            />

            <ProfileInfoItem
              label="Role"
              item={user?.role}
            />

            <ProfileInfoItem
              label="Two Factor Authentication"
              item={
                <Badge
                  variant={
                    user?.isTwoFactorEnabled ? 'success' : 'destructive'
                  }
                >
                  {user?.isTwoFactorEnabled ? 'ON' : 'OFF'}
                </Badge>
              }
            />
          </>
        )}
      </CardContent>

      {hasFullAccess && (
        <CardFooter className="flex flex-col gap-4">
          <Button
            asChild
            variant="outline"
            className="w-full border border-black/20 bg-blue-200 hover:bg-blue-200/70"
          >
            <Link href={editProfilePath}>Edit profile</Link>
          </Button>

          {canLogout && (
            <LogoutButton className="w-full cursor-pointer">
              <Button
                variant="outline"
                className="flex w-full items-center justify-center gap-x-2 border border-red-300 bg-slate-100 text-red-500 hover:bg-slate-50 hover:text-red-500"
              >
                <ExitIcon className="h-4 w-4 text-red-500" />
                Logout
              </Button>
            </LogoutButton>
          )}
        </CardFooter>
      )}
    </Card>
  )
}

export default ProfileInfo
