'use client'

import { type Session } from 'next-auth'

import useGlobalStore from '~/store'
import { useDataPostsFilters } from '~/hooks/useDataPostsFilters'
import { useCategoriesOptions } from '~/hooks/useCategoriesOptions'
import { useDataPosts } from '~/hooks/useDataPosts'
import ProfileInfo from '~/components/profile/ProfileInfo'
import ProfilePostsList from '~/components/profile/ProfilePostsList'
import DataSearch from '~/components/shared/DataManagement/DataSearch'
import DataResetFilter from '~/components/shared/DataManagement/DataResetFilter'
import DataFilterBox from '~/components/shared/DataManagement/DataFilterBox'
import DataPagination from '~/components/shared/DataManagement/DataPagination'
import { isEmptyOrUnpublished } from '~/utils/helpers'
import {
  type IFetchPostsFunctionProps,
  type TDeserializedPost
} from '~/types'
import { Card } from '~/components/ui/card'
import { useMemo } from 'react'
import ProfilePostsHeaderCard from '~/components/profile/ProfilePostsHeaderCard'
import { PROFILE_POSTS_PER_PAGE } from '~/utils/constants'

interface IProfilePageViewProps {
  user?: Session['user']
}

const ProfilePageView = ({ user }: IProfilePageViewProps) => {
  const [posts, postsCount, isLoading] = useGlobalStore((state) => {
    return [state.posts, state.postsCount, state.isLoading]
  })

  const {
    searchQuery,
    setSearchQuery,
    categoriesFilter,
    setCategoriesFilter,
    isAnyFilterActive,
    resetFilters,
    page,
    setPage
  } = useDataPostsFilters()

  const { categoriesOptions } = useCategoriesOptions('slug')

  const postsPerPage = PROFILE_POSTS_PER_PAGE
  const userId = user?.id

  const dataPostsProps: IFetchPostsFunctionProps = useMemo(() => {
    return {
      page,
      limit: postsPerPage,
      categoriesFilter,
      authorFilter: userId,
      searchQuery
    }
  }, [page, categoriesFilter, userId, searchQuery])

  useDataPosts(dataPostsProps)

  const noItems = isEmptyOrUnpublished(posts)

  return (
    <div className="grid min-h-svh w-full grid-cols-1 items-stretch justify-between gap-x-5 px-5 pb-8 pt-4 md:grid-cols-3 md:px-4 md:pb-8 lg:p-10 lg:pt-4 ">
      <div className="col-start-1 h-full pb-4 md:pb-0">
        <ProfileInfo
          user={user}
          label="User data"
        />
      </div>

      <div className="col-start-1 flex h-full w-full flex-col items-center justify-between md:col-start-2 md:col-end-4">
        <ProfilePostsHeaderCard />

        <div className="page-wrapper w-full flex-grow pt-4">
          <Card className="mb-5 grid w-full grid-cols-1 flex-wrap items-center justify-around gap-x-5 gap-y-4 px-3 py-3 min-[375px]:grid-cols-2 min-[1080px]:grid-cols-4">
            <div className="col-span-1 min-[375px]:col-span-2 md:[&_div]:w-full md:[&_input]:!max-w-full ">
              <DataSearch
                searchKey="title"
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setPage={setPage}
              />
            </div>

            <div className="col-span-1 grid place-content-center max-[375px]:grid-cols-1 min-[375px]:place-content-start">
              <DataFilterBox
                title="Category"
                options={categoriesOptions}
                filterValue={categoriesFilter}
                setFilterValue={setCategoriesFilter}
                setPage={setPage}
              />
            </div>

            <div className="col-span-1 grid place-content-center max-[375px]:grid-cols-1 min-[375px]:place-content-end">
              <DataResetFilter
                isFilterActive={isAnyFilterActive}
                onReset={resetFilters}
              />
            </div>
          </Card>

          <ProfilePostsList
            data={posts as TDeserializedPost[]}
            totalItems={postsCount}
            noItems={noItems}
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
