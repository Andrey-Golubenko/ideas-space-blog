import { cloneElement, type ReactElement } from 'react'

import { type TItemType, type TSkeletonItems } from '~/types'

interface IWithSkeletonsListProps {
  children: ReactElement
  skeletonItems?: TSkeletonItems
  isLoading?: boolean
  itemType?: TItemType
  postsGridClasses?: string
}

/**
 * @component WithSkeletonsList
 *
 * A high-order component to render skeleton loaders and dynamically transform them into actual items.
 *
 * This component is used to manage the rendering of up to four skeleton loaders. Once the data is loaded, the skeletons
 * are replaced with their respective items. It adjusts dynamically based on the item type (post or category) and the
 * available data.
 *
 * @param {IWithSkeletonsListProps} props - The component props.
 * @param {ReactElement} props.children - The child component to render for skeletons and items.
 * @param {TSkeletonItems} [props.skeletonItems] - The skeleton items to display while loading.
 * @param {boolean} [props.isLoading] - Whether the skeletons should be displayed.
 * @param {TItemType} [props.itemType] - The type of item being rendered (post or category).
 * @param {string} [props.postsGridClasses] - Custom CSS classes for the grid layout.
 *
 * @returns {JSX.Element} - The rendered `WithSkeletonsList` component.
 */
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
      className={`mb-5 grid w-full grid-cols-1 gap-5 @lg:grid-cols-2 @3xl:grid-cols-3 ${isPost ? '' : '@4xl:grid-cols-4'} ${postsGridClasses || ''}`}
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
