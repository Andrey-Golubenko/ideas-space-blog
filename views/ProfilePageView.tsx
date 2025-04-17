'use client'

import { PostStatus } from '@prisma/client'
import useGlobalStore from '~/store'
import { usePage } from '~/hooks/usePage'
import { usePostsFilters } from '~/hooks/usePostsFilters'
import { useDataPosts } from '~/hooks/useDataPosts'
import ProfileInfo from '~/components/profile/ProfileInfo'
import ProfilePostsList from '~/components/profile/ProfilePostsList'
import ProfilePostsHeader from '~/components/profile/ProfilePostsHeader'
import ProfileFiltersBox from '~/components/profile/ProfileFiltersBox'
import DataPagination from '~/components/shared/DataManagement/DataPagination'
import { cn } from '~/libs/utils'
import { PROFILE_POSTS_PER_PAGE } from '~/utils/constants'
import {
  type IFetchPostsFunctionProps,
  type TDeserializedPost
} from '~/types'

interface IProfilePageViewProps {
  user?: UserDTO | null
  hasFullAccess?: boolean
}

const ProfilePageView = ({
  user,
  hasFullAccess = false
}: IProfilePageViewProps) => {
  const { posts, postsCount, isLoading } = useGlobalStore((state) => {
    return {
      posts: state.posts,
      postsCount: state.postsCount,
      isLoading: state.isLoading
    }
  })

  const { isAdminPage } = usePage()

  const withAnyStatus = `${PostStatus.PUBLISHED}.${PostStatus.DRAFT}`

  const { searchQuery, categoriesFilter, statusFilter, page, setPage } =
    usePostsFilters()

  const postsPerPage = PROFILE_POSTS_PER_PAGE
  const userId = user?.id

  const dataPostsProps: IFetchPostsFunctionProps = {
    page,
    limit: postsPerPage,
    categoriesFilter,
    authorFilter: userId,
    searchQuery,
    statusFilter: statusFilter || withAnyStatus
  }

  useDataPosts(dataPostsProps)

  const noItems: boolean = typeof posts === 'string'

  return (
    <div
      className={cn(
        'grid min-h-svh w-full grid-cols-1 items-stretch justify-between gap-x-5 px-5 pb-8 pt-4 md:px-4 md:pb-8 lg:p-10 lg:pt-4',
        !isAdminPage && 'md:grid-cols-3'
      )}
    >
      <div
        className={cn('col-span-1 h-full pb-4', !isAdminPage && 'md:pb-0')}
      >
        <ProfileInfo
          label="User data"
          user={user}
          hasFullAccess={hasFullAccess}
        />
      </div>

      <div
        className={cn(
          'col-span-1 flex h-full w-full flex-col items-center justify-between',
          !isAdminPage && 'md:col-span-2'
        )}
      >
        <ProfilePostsHeader hasFullAccess={hasFullAccess} />

        <div className="page-wrapper w-full flex-grow pt-4">
          <ProfileFiltersBox />

          <ProfilePostsList
            data={posts as TDeserializedPost[]}
            totalItems={postsCount}
            noItems={noItems}
            hasFullAccess={hasFullAccess}
            isLoading={isLoading}
          />

          {!noItems && (
            <DataPagination
              totalItems={postsCount ?? 0}
              postsPerPage={postsPerPage}
              currentPage={page}
              setCurrentPage={setPage}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePageView
