interface IDataPaginationInfoProps {
  totalItems: number
  currentPage: number
  postsPerPage: number
}

const DataPaginationInfo = ({
  totalItems,
  currentPage,
  postsPerPage
}: IDataPaginationInfoProps) => {
  return (
    <div className="flex-1 text-sm font-medium">
      {totalItems > 0 ? (
        <>
          <p className="flex whitespace-nowrap">
            Showing {currentPage * postsPerPage - postsPerPage + 1} to{' '}
            {Math.min(currentPage * postsPerPage, totalItems)}
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
