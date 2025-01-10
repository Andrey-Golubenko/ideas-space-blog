'use client'

import { useEffect } from 'react'

import useStore from '~/store'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import CardHeaderContent from '~/components/shared/CardWrapper/CardHeaderContent'
import WithPostData from '~/components/hoc/WithPostData'
import WithSkeletonsList from '~/components/hoc/WithSkeletonsList'
import SectionItemCard from '~/components/shared/ItemSectionCard'
import SkeletonPostSectionItem from '~/components/shared/ItemSectionCard/SkeletonPostSectionItem'
import NoItemsCard from '~/components/posts/NoItemsCard'
import { isEmptyOrUnpublished } from '~/utils/helpers'
import { type Post } from '@prisma/client'

const RecentPostsList = () => {
  const [recentPosts, getRecentPosts, isLoading] = useStore((state) => {
    return [state.recentPosts, state.getRecentPosts, state.isLoading]
  })

  useEffect(() => {
    getRecentPosts()
  }, [getRecentPosts])

  const noItems = isEmptyOrUnpublished(recentPosts as Post[])

  return (
    <Card className="bg-slate-100 px-2 pb-2 sm:px-10 sm:pb-10">
      <CardHeader className="pb-10 pt-12">
        <CardHeaderContent
          title="Recent posts"
          label="New in the Blog"
        />
      </CardHeader>
      <CardContent className="px-0 pb-0 sm:px-6">
        {noItems ? (
          <NoItemsCard itemName="published recent posts" />
        ) : (
          <WithPostData
            posts={(recentPosts as Post[]) || []}
            postsCount={recentPosts ? recentPosts?.length : null}
            isLoading={isLoading}
          >
            <WithSkeletonsList>
              <SkeletonPostSectionItem />
            </WithSkeletonsList>

            <SectionItemCard />
          </WithPostData>
        )}
      </CardContent>
    </Card>
  )
}

export default RecentPostsList
