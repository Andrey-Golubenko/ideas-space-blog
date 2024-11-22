import { cloneElement, type ReactElement } from 'react'

import { type TSkeletonItems } from '~/types'

interface IWithSkeletonsListProps {
  skeletonItems?: TSkeletonItems
  isLoading?: boolean
  children: ReactElement
}

const WithSkeletonsList = ({
  children,
  skeletonItems,
  isLoading
}: IWithSkeletonsListProps) => {
  const { firstItem, secondItem, thirdItem } =
    skeletonItems as TSkeletonItems

  return (
    <div className="mb-5 grid w-full grid-cols-1 gap-5 @md:grid-cols-2 @3xl:grid-cols-3">
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
    </div>
  )
}

export default WithSkeletonsList
