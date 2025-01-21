import { POSTS_PER_PAGE } from '~/utils/constants'

interface IDataPaginationInfoProps {
  totalItems: number
  currentPage: number
}

const DataPaginationInfo = ({
  totalItems,
  currentPage
}: IDataPaginationInfoProps) => {
  return (
    <div className="flex-1 text-sm font-medium">
      {totalItems > 0 ? (
        <>
          <p className="flex whitespace-nowrap">
            Showing {currentPage * POSTS_PER_PAGE - 8} to{' '}
            {Math.min(currentPage * POSTS_PER_PAGE, totalItems)}
          </p>
          <p className="flex whitespace-nowrap">of {totalItems} entries</p>
        </>
      ) : (
        <p className="flex whitespace-nowrap">No entries found</p>
      )}
    </div>
  )
}

export default DataPaginationInfo
