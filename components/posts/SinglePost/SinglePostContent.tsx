import Link from 'next/link'
import { FileTextIcon, CalendarIcon } from 'lucide-react'

import { CardContent } from '~/components/ui/card'
import { DEFAULT_CATEGORY, PATHS } from '~/utils/constants/constants'

interface ISinglePostContentProps {
  singlePostCategories: {
    categoryName: string
    categorySlug: string
  }[]
  singlePostCreatedAt: string
  singlePostContent: string
}

const SinglePostContent = ({
  singlePostCategories,
  singlePostCreatedAt,
  singlePostContent
}: ISinglePostContentProps) => {
  return (
    <CardContent className="w-full px-24 pb-12">
      <div className="mb-5">
        <p className="mb-2 flex items-center">
          <FileTextIcon
            height="17px"
            width="17px"
            className="mr-2"
          />

          {!!singlePostCategories?.length &&
            singlePostCategories.map(
              ({ categoryName, categorySlug }, index) => {
                const isUncategorized =
                  categoryName === DEFAULT_CATEGORY.name

                return isUncategorized ? (
                  <span
                    key={categorySlug}
                    className="text-yellow-600/90"
                  >
                    {categoryName}
                  </span>
                ) : (
                  <Link
                    key={categorySlug}
                    href={`${PATHS.categories}/${categorySlug}`}
                  >
                    <span className="text-yellow-600/90 hover:text-yellow-600/70">
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

        <p className="flex items-center">
          <CalendarIcon
            height="17px"
            width="17px"
            className="mr-2"
          />

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
