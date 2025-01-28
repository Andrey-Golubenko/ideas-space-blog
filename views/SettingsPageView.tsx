import { Card, CardHeader, CardContent } from '~/components/ui/card'
import SettingsForm from '~/components/auth/SettingsForm'
import { auth } from '~/libs/auth/auth'

const SettingsPageView = async () => {
  const session = await auth()

  return (
    <Card className="flex min-h-[420px] flex-col">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">⚙️ Settings</p>
      </CardHeader>
      <CardContent>
        <SettingsForm session={session} />
      </CardContent>
    </Card>
  )
}

export default SettingsPageView
