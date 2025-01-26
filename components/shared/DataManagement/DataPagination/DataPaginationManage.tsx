import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons'
import { type Options } from 'nuqs'

import { Button } from '~/components/ui/button'

interface IDataPaginationManageProps {
  totalItems: number
  postsPerPage: number
  currentPage: number
  setCurrentPage: (
    value: number | ((old: number) => number | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>
  isLoading: boolean
}

const DataPaginationManage = ({
  totalItems,
  postsPerPage,
  currentPage,
  setCurrentPage,
  isLoading
}: IDataPaginationManageProps) => {
  const totalPages = Math.ceil(totalItems / postsPerPage)

  return (
    <div className="flex w-full flex-wrap items-center justify-end gap-2">
      <div className="flex items-center justify-center text-sm font-medium">
        {totalItems > 0 ? (
          <>
            Page {currentPage} of {totalPages}
          </>
        ) : (
          'No pages'
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Button
          aria-label="Go to first page"
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => {
            return setCurrentPage(1)
          }}
          disabled={currentPage === 1 || isLoading}
        >
          <DoubleArrowLeftIcon
            className="h-4 w-4"
            aria-hidden="true"
          />
        </Button>

        <Button
          aria-label="Go to previous page"
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => {
            return setCurrentPage(currentPage - 1)
          }}
          disabled={currentPage === 1 || isLoading}
        >
          <ChevronLeftIcon
            className="h-4 w-4"
            aria-hidden="true"
          />
        </Button>

        <Button
          aria-label="Go to next page"
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => {
            return setCurrentPage(currentPage + 1)
          }}
          disabled={currentPage === totalPages || isLoading}
        >
          <ChevronRightIcon
            className="h-4 w-4"
            aria-hidden="true"
          />
        </Button>

        <Button
          aria-label="Go to last page"
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => {
            return setCurrentPage(totalPages)
          }}
          disabled={currentPage === totalPages || isLoading}
        >
          <DoubleArrowRightIcon
            className="h-4 w-4"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  )
}

export default DataPaginationManage
