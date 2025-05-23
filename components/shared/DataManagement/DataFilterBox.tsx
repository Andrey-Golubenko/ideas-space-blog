'use client'

import { type ComponentType, useMemo, useState } from 'react'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { CheckIcon } from 'lucide-react'
import { type Options } from 'nuqs'

import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '~/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '~/components/ui/popover'
import { Separator } from '~/components/ui/separator'
import { cn } from '~/libs/utils'

interface FilterOption {
  value: string
  label: string
  icon?: ComponentType<{ className?: string }>
}

interface IDataFilterBoxProps {
  title: string
  options: FilterOption[]
  filterValue: string
  setFilterValue: (
    value: string | ((old: string) => string | null) | null,
    options?: Options | undefined
  ) => Promise<URLSearchParams>
  setPage: (
    value: number | ((old: number) => number | null) | null,
    options?: Options | undefined
  ) => Promise<URLSearchParams>
}

const DataFilterBox = ({
  title,
  options,
  filterValue,
  setFilterValue,
  setPage
}: IDataFilterBoxProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const selectedValuesSet = useMemo(() => {
    if (!filterValue) return new Set<string>()
    const values = filterValue.split('.')
    return new Set(
      values.filter((value) => {
        return value !== ''
      })
    )
  }, [filterValue])

  const handleSelect = (value: string) => {
    const newSet = new Set(selectedValuesSet)
    if (newSet.has(value)) {
      newSet.delete(value)
    } else {
      newSet.add(value)
    }
    setFilterValue(Array.from(newSet).join('.') || null)
    setPage(1) // Reset page to 1 when filter changes
  }

  const resetFilter = () => {
    return setFilterValue(null)
  }

  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={setIsPopoverOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="border-dashed"
        >
          <PlusCircledIcon className="mr-2 h-4 w-4" />

          {title}

          {selectedValuesSet.size > 0 && (
            <>
              <Separator
                orientation="vertical"
                className="mx-2 h-4"
              />

              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal 1xl:hidden"
              >
                {selectedValuesSet.size}
              </Badge>

              <div className="hidden space-x-1 1xl:flex">
                {selectedValuesSet.size > 1 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValuesSet.size} selected
                  </Badge>
                ) : (
                  Array.from(selectedValuesSet)?.map((value) => {
                    return (
                      <Badge
                        variant="secondary"
                        key={value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {
                          options.find((option) => {
                            return option.value === value
                          })?.label
                        }
                      </Badge>
                    )
                  })
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[200px] p-0"
        align="start"
        onEscapeKeyDown={() => setIsPopoverOpen(false)}
      >
        <Command>
          <CommandInput placeholder={title} />

          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup>
              {options?.map((option) => {
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      return handleSelect(option.value)
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        selectedValuesSet.has(option.value)
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </div>

                    {option.icon && (
                      <option.icon
                        className="mr-2 h-4 w-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                    )}

                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>

            <>
              <CommandSeparator />

              <CommandGroup>
                <div className="flex items-center justify-between">
                  {selectedValuesSet.size > 0 && (
                    <>
                      <CommandItem
                        onSelect={resetFilter}
                        className="flex-1 cursor-pointer justify-center"
                      >
                        Clear
                      </CommandItem>

                      <Separator
                        orientation="vertical"
                        className="flex h-full min-h-6"
                      />
                    </>
                  )}

                  <CommandItem
                    onSelect={() => {
                      return setIsPopoverOpen(false)
                    }}
                    className="max-w-full flex-1 cursor-pointer justify-center"
                  >
                    Close
                  </CommandItem>
                </div>
              </CommandGroup>
            </>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default DataFilterBox
