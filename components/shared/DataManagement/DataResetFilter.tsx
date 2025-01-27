'use client'

import { Button } from '~/components/ui/button'

type DataTableResetFilterProps = {
  isFilterActive: boolean
  onReset: () => void
}

const DataResetFilter = ({
  isFilterActive,
  onReset
}: DataTableResetFilterProps) => {
  if (!isFilterActive) {
    return null
  }

  return (
    <Button
      variant="outline"
      onClick={onReset}
    >
      Reset Filters
    </Button>
  )
}

export default DataResetFilter
