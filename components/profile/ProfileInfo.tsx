import Link from 'next/link'
import { type Session } from 'next-auth'

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import ProfileInfoItem from '~/components/profile/ProfileInfoItem'
import { Button } from '~/components/ui/button'
import { PATHS } from '~/utils/constants'

interface IProfileInfoProps {
  user?: Session['user']
  label: string
}

const ProfileInfo = ({ user, label }: IProfileInfoProps) => {
  return (
    <Card className="rouded-xl h-full pb-20 shadow-md">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">{label}</p>
      </CardHeader>

      <CardContent className="space-y-4 md:p-2 md:pt-0  lg:p-6 lg:pt-0 ">
        <ProfileInfoItem
          label="ID"
          item={user?.id}
        />
        <ProfileInfoItem
          label="Name"
          item={user?.name}
        />
        <ProfileInfoItem
          label="Email"
          item={user?.email}
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
      </CardContent>

      <CardFooter>
        <Button
          asChild
          variant="outline"
          className="w-full border border-black/20 bg-blue-200 hover:bg-blue-200/70"
        >
          <Link href={PATHS.settings}>Edit profile</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProfileInfo
