'use client'

import { useEffect } from 'react'

import useStore from '~/store'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import CardHeaderContent from '~/components/shared/CardWrapper/CardHeaderContent'
import WithPostData from '~/components/hoc/WithPostData'
import WithSkeletonsList from '~/components/hoc/WithSkeletonsList'
import SectionItemCard from '../shared/SectionItemCard'
import SkeletonSectionItemCard from '../shared/SectionItemCard/SkeletonSectionItemCard'

const RecentPostsList = () => {
  const [recentPosts, getRecentPosts, recentPostsCount, isLoading] =
    useStore((state) => {
      return [
        state.recentPosts,
        state.getRecentPosts,
        state.recentPostsCount,
        state.isLoading
      ]
    })

  useEffect(() => {
    getRecentPosts()
  }, [])

  return (
    <Card className="bg-slate-100 px-10">
      <CardHeader className="pb-10 pt-12">
        <CardHeaderContent
          title="Recent posts"
          label="New in the Blog"
        />
      </CardHeader>
      <CardContent className="pb-0">
        <WithPostData
          posts={recentPosts}
          postsCount={recentPostsCount}
          isLoading={isLoading}
        >
          <WithSkeletonsList>
            <SkeletonSectionItemCard />
          </WithSkeletonsList>

          <SectionItemCard />
        </WithPostData>
      </CardContent>
    </Card>
  )
}

export default RecentPostsList
