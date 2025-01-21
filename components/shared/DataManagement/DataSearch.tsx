'use client'

import { useTransition } from 'react'
import { type Options } from 'nuqs'

import { Input } from '~/components/ui/input'
import { cn } from '~/libs/utils'

interface IDataSearchProps {
  searchKey: string
  searchQuery: string
  setSearchQuery: (
    value: string | ((old: string) => string | null) | null,
    options?: Options | undefined
  ) => Promise<URLSearchParams>
  setPage: (
    value: number | ((old: number) => number | null) | null,
    options?: Options | undefined
  ) => Promise<URLSearchParams>
}

const DataSearch = ({
  searchKey,
  searchQuery,
  setSearchQuery,
  setPage
}: IDataSearchProps) => {
  const [isLoading, startTransition] = useTransition()

  const handleSearch = (value: string) => {
    setSearchQuery(value, { startTransition })
    setPage(1) // Reset page to 1 when search changes
  }

  return (
    <Input
      placeholder={`Search ${searchKey}...`}
      value={searchQuery ?? ''}
      onChange={(event) => {
        return handleSearch(event?.target?.value)
      }}
      className={cn('w-full md:max-w-sm', isLoading && 'animate-pulse')}
      containerClassName="md:w-[45%] w-full"
    />
  )
}

export default DataSearch
