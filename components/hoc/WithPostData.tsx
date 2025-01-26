'use client'

import { cloneElement, useRef, type ReactElement } from 'react'
import { usePathname } from 'next/navigation'

import { useListItemsDistribution } from '~/hooks/useListItemsDistribution'
import { PATHS } from '~/utils/constants'
import { type TDeserializedPost } from '~/types'

interface IWithPostDataProps {
  children: ReactElement[]
  posts: TDeserializedPost[]
  postsCount: number | null
  isLoading: boolean
  dataContainerClasses?: string
  postsGridClasses?: string
}

/**
 * @component WithPostData
 *
 * A client-side high-order component to manage the display of posts with skeleton loading and dynamic grid rendering.
 *
 * This component takes a list of posts, their count, and a loading state to display skeletons initially,
 * transforming them into actual post elements once the data is loaded. It is designed to handle different
 * layouts and dynamically adjust based on the container's width and provided configurations.
 *
 * The primary functionality includes:
 * - Filtering posts based on their published status.
 * - Managing the distribution of skeleton items and the remaining posts for display.
 * - Dynamically applying styles and layouts based on the container's size.
 *
 * The first child passed to this component is expected to be the `WithSkeletonsList` component, which handles
 * the skeleton rendering logic. The second child is the individual post/item component rendered after data is loaded.
 *
 * @param {IWithPostDataProps} props - The component props.
 * @param {ReactElement[]} props.children - Two child components:
 *   1. `WithSkeletonsList` to handle skeleton loading.
 *   2. The component used for displaying individual items (e.g., `ItemCard`).
 * @param {(TDeserializedPost)[]} props.posts - The list of posts to display.
 * @param {number | null} props.postsCount - The total number of posts to manage display logic.
 * @param {boolean} props.isLoading - Whether the posts are still being loaded.
 * @param {string} [props.dataContainerClasses] - Custom CSS classes for the data container.
 * @param {string} [props.postsGridClasses] - Custom CSS classes for the grid layout of posts.
 *
 * @returns {JSX.Element} - The rendered `WithPostData` component.
 */
const WithPostData = ({
  children,
  posts,
  postsCount,
  isLoading,
  dataContainerClasses,
  postsGridClasses
}: IWithPostDataProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const publishedPosts =
    posts?.filter((post) => {
      return post.published
    }) || []

  const desplayedPosts =
    pathname === PATHS.profile ? posts : publishedPosts

  const { skeletonItems, restItems, thirdItemInList } =
    useListItemsDistribution(desplayedPosts, postsCount, containerRef)

  const itemType = { isPost: true, isCategory: false }

  return (
    <section
      className={`mb-8 w-full @container ${dataContainerClasses ?? ''}`}
      ref={containerRef}
    >
      {cloneElement(children[0], {
        skeletonItems,
        isLoading,
        itemType
      })}

      {!isLoading && (restItems?.length > 0 || thirdItemInList) && (
        <div
          className={`mb-5 grid w-full grid-cols-1 gap-5 @lg:grid-cols-2 @3xl:grid-cols-3 ${postsGridClasses || ''}`}
        >
          {[thirdItemInList, ...restItems]?.map((item) => {
            if (item) {
              return cloneElement(children[1], {
                key: item?.id,
                item
              })
            }

            return undefined
          })}
        </div>
      )}
    </section>
  )
}

export default WithPostData
