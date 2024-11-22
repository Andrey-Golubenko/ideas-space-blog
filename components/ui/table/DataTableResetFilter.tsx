'use client'

import { Button } from '~/components/ui/button'

type DataTableResetFilterProps = {
  isFilterActive: boolean
  onReset: () => void
}

const DataTableResetFilter = ({
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

export default DataTableResetFilter
