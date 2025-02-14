import { getUserById } from '~/services/user'
import EditUserPageView from '~/views/EditUserPageView'
import { type ISlugPageParamsProps } from '~/types'

const AdminEditUserPage = async ({
  params: { slug }
}: ISlugPageParamsProps) => {
  const user = await getUserById(slug)

  return (
    <div className="@container">
      <EditUserPageView
        label="👤 Edit the user"
        user={user}
      />
    </div>
  )
}

export default AdminEditUserPage
