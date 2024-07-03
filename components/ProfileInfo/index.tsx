import { Session } from 'next-auth'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import ProfileInfoItem from './ProfileInfoItem'

interface IProfileProps {
  user?: Session['user']
  label: string
}

const ProfileInfo = ({ user, label }: IProfileProps) => {
  return (
    <Card className="rouded-xl w-[600px] shadow-md">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
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
    </Card>
  )
}

export default ProfileInfo
