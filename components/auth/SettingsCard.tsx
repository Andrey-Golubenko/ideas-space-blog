import { Card, CardHeader, CardContent } from '~/components/ui/card'
import SettingsForm from '~/components/auth/SettingsForm'
import { auth } from '~/libs/auth/auth'

const SettingsCard = async () => {
  const session = await auth()

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">⚙️ Settings</p>
      </CardHeader>
      <CardContent>
        <SettingsForm session={session} />
      </CardContent>
    </Card>
  )
}

export default SettingsCard
