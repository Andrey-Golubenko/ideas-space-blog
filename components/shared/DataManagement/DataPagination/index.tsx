import { type Options } from 'nuqs'

import { Card } from '~/components/ui/card'
import DataPaginationInfo from './DataPaginationInfo'
import DataPaginationManage from './DataPaginationManage'

interface IDataPaginationProps {
  totalItems: number
  currentPage: number
  setCurrentPage: (
    value: number | ((old: number) => number | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>
  isLoading: boolean
}

const DataPagination = ({
  totalItems,
  currentPage,
  setCurrentPage,
  isLoading
}: IDataPaginationProps) => {
  return (
    <Card className="flex w-full items-center justify-around px-6 py-3">
      <DataPaginationInfo
        totalItems={totalItems}
        currentPage={currentPage}
      />

      <DataPaginationManage
        totalItems={totalItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
      />
    </Card>
  )
}

export default DataPagination
