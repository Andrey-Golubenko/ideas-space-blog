import Link from 'next/link'
import { FileTextIcon, CalendarIcon } from 'lucide-react'

import { CardContent } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import { DEFAULT_CATEGORY, PATHS } from '~/utils/constants'

interface ISinglePostContentProps {
  hasContent: boolean
  singlePostCategories: TCategoryOptions[]
  singlePostCreatedAt: string
  singlePostContent: string
}

const SinglePostContent = ({
  hasContent,
  singlePostCategories,
  singlePostCreatedAt,
  singlePostContent
}: ISinglePostContentProps) => {
  if (!hasContent) {
    return (
      <>
        <div className="mb-5 flex w-full flex-col items-start justify-start px-5 lg:px-20">
          <Skeleton className="mb-4 h-5 w-1/2" />
          <Skeleton className="h-5 w-1/2" />
        </div>
        <div className="mb-6 w-full p-6 px-5 pt-0 lg:px-20">
          <Skeleton className="h-[400px] w-full" />
        </div>
      </>
    )
  }

  return (
    <CardContent className="w-full px-5 pb-12 lg:px-24">
      <div className="mb-5 pl-2">
        <div className="mb-2 flex items-center">
          <span className="mr-2 h-[17px] w-[17px]">
            <FileTextIcon
              height="17px"
              width="17px"
            />
          </span>

          <p className="flex flex-wrap items-center">
            {!!singlePostCategories?.length &&
              singlePostCategories?.map(
                ({ categoryName, categorySlug }, index) => {
                  const isUncategorized =
                    categoryName === DEFAULT_CATEGORY.name

                  return isUncategorized ? (
                    <span
                      key={categorySlug}
                      className="text-sm text-yellow-600/90"
                    >
                      {categoryName}
                    </span>
                  ) : (
                    <Link
                      key={categorySlug}
                      href={`${PATHS.category(categorySlug)}`}
                    >
                      <span className="text-base text-yellow-600/90 hover:text-yellow-600/70">
                        {categoryName}

                        {!(singlePostCategories.length - 1 === index) && (
                          <span className="text-black">,&nbsp;</span>
                        )}
                      </span>
                    </Link>
                  )
                }
              )}
          </p>
        </div>

        <p className="flex items-center">
          <span className="mr-2 h-[17px] w-[17px]">
            <CalendarIcon
              height="17px"
              width="17px"
            />
          </span>

          <time
            className="text-sm italic tracking-wider text-slate-500"
            suppressHydrationWarning
          >
            {singlePostCreatedAt}
          </time>
        </p>
      </div>

      <div className="rounded-lg bg-slate-100 px-2 text-justify">
        {singlePostContent}
      </div>
    </CardContent>
  )
}

export default SinglePostContent
