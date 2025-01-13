import { cloneElement, type ReactElement } from 'react'

import { type TItemType, type TSkeletonItems } from '~/types'

interface IWithSkeletonsListProps {
  children: ReactElement
  skeletonItems?: TSkeletonItems
  isLoading?: boolean
  itemType?: TItemType
  postsGridClasses?: string
}

const WithSkeletonsList = ({
  children,
  skeletonItems,
  isLoading,
  itemType,
  postsGridClasses
}: IWithSkeletonsListProps) => {
  const { firstItem, secondItem, thirdItem, fourthItem } =
    skeletonItems as TSkeletonItems

  const isPost = itemType?.isPost
  const isCategory = itemType?.isCategory

  return (
    <div
      className={`mb-5 grid w-full grid-cols-1 gap-5 @md:grid-cols-2 @3xl:grid-cols-3 ${isPost ? '' : '@4xl:grid-cols-4'} ${postsGridClasses || ''}`}
    >
      {cloneElement(children as ReactElement, {
        item: firstItem,
        isLoading
      })}

      {firstItem && !secondItem
        ? null
        : cloneElement(children as ReactElement, {
            item: secondItem,
            isLoading
          })}

      {firstItem && !thirdItem
        ? null
        : cloneElement(children as ReactElement, {
            item: thirdItem,
            isLoading
          })}

      {(!isCategory && isPost) || (firstItem && !fourthItem)
        ? null
        : cloneElement(children as ReactElement, {
            item: fourthItem,
            isLoading
          })}
    </div>
  )
}

export default WithSkeletonsList
