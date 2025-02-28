import ProfilePageView from '~/views/ProfilePageView'
import { getUserById } from '~/services/user'
import { getCurrentUser } from '~/utils/helpers/server.helpers'
import { UserRole } from '@prisma/client'
import { type ISlugPageParamsProps } from '~/types'

const PublicProfilePage = async ({
  params: { slug }
}: ISlugPageParamsProps) => {
  const user = await getUserById(slug)
  const currentUser = await getCurrentUser()

  const hasFullAccess: boolean =
    currentUser?.role === UserRole.ADMIN || user?.id === currentUser?.id

  return (
    <ProfilePageView
      user={user}
      hasFullAccess={hasFullAccess}
    />
  )
}

export default PublicProfilePage
