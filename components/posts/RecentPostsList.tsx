'use client'

import { useEffect } from 'react'

import useStore from '~/store'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import CardHeaderContent from '~/components/shared/CardWrapper/CardHeaderContent'
import WithPostData from '~/components/hoc/WithPostData'
import WithSkeletonsList from '~/components/hoc/WithSkeletonsList'
import SectionItemCard from '~/components/shared/SectionItemCard'
import SkeletonPostSectionItem from '~/components/shared/SectionItemCard/SkeletonPostSectionItem'

const RecentPostsList = () => {
  const [recentPosts, getRecentPosts, isLoading] = useStore((state) => {
    return [state.recentPosts, state.getRecentPosts, state.isLoading]
  })

  useEffect(() => {
    if (!recentPosts) getRecentPosts()
  }, [getRecentPosts])

  return (
    <Card className="bg-slate-100 px-2 sm:px-10">
      <CardHeader className="pb-10 pt-12">
        <CardHeaderContent
          title="Recent posts"
          label="New in the Blog"
        />
      </CardHeader>
      <CardContent className="px-0 pb-0 sm:px-6">
        <WithPostData
          posts={recentPosts}
          postsCount={recentPosts ? recentPosts?.length : null}
          isLoading={isLoading}
        >
          <WithSkeletonsList>
            <SkeletonPostSectionItem />
          </WithSkeletonsList>

          <SectionItemCard />
        </WithPostData>
      </CardContent>
    </Card>
  )
}

export default RecentPostsList
