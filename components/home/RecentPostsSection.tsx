'use client'

import { useEffect } from 'react'

import useGlobalStore from '~/store'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import CardHeaderContent from '~/components/shared/CardWrapper/CardHeaderContent'
import WithDataList from '~/components/hoc/WithDataList'
import ItemCard from '~/components/shared/ItemCard'
import NoItemsCard from '~/components/posts/NoItemsCard'
import { isEmptyOrUnpublished } from '~/utils/helpers'
import { type TDeserializedPost } from '~/types'

const RecentPostsSection = () => {
  const [recentPosts, getRecentPosts, isLoading] = useGlobalStore(
    (state) => {
      return [state.recentPosts, state.getRecentPosts, state.isLoading]
    }
  )

  useEffect(() => {
    getRecentPosts()
  }, [getRecentPosts])

  const noItems: boolean = isEmptyOrUnpublished(recentPosts)

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
          <WithDataList
            itemType={{
              isPost: true
            }}
            itemSize={{
              isTruncated: true
            }}
            // The null and string checks are performed in the function isEmptyOrUnpublished()
            items={recentPosts as TDeserializedPost[]}
            itemsCount={3}
            isLoading={isLoading}
          >
            <ItemCard />
          </WithDataList>
        )}
      </CardContent>
    </Card>
  )
}

export default RecentPostsSection
