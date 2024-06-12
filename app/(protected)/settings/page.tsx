import { auth } from '~/libs/auth/auth'

const Settings = async () => {
  const session = await auth()
  return <div>{JSON.stringify(session)}</div>
}

export default Settings
