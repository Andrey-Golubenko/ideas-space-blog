import ProfilePageView from '~/views/ProfilePageView'
import { getUserById } from '~/services/user'
import { type ISlugPageParamsProps } from '~/types'

const AdminUserPage = async ({
  params: { slug }
}: ISlugPageParamsProps) => {
  const user = await getUserById(slug)

  return (
    <ProfilePageView
      user={user}
      hasFullAccess
    />
  )
}

export default AdminUserPage
