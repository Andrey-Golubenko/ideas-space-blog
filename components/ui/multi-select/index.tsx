'use client'

import { forwardRef, useState } from 'react'
import { CheckIcon, XCircle, ChevronDown, XIcon } from 'lucide-react'

import { cn } from '~/libs/utils'
import { Separator } from '~/components/ui/separator'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '~/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '~/components/ui/command'
import { multiSelectVariants } from '~/components/ui/multi-select/multiSelectVariants'
import { type IMultiSelectProps } from '~/types/types'
import { DEFAULT_CATEGORY } from '~/utils/constants/constants'

export const MultiSelect = forwardRef<
  HTMLButtonElement,
  IMultiSelectProps
>(
  (
    {
      options,
      onValueChange,
      variant,
      fieldValue = [],
      placeholder = 'Select options',
      maxCount = 3,
      modalPopover = false,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const displayedFieldValues = fieldValue?.filter((value) => {
      return value !== DEFAULT_CATEGORY.name
    })

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event?.key === 'Enter') {
        setIsPopoverOpen(true)
      } else if (
        event?.key === 'Backspace' &&
        !event?.currentTarget?.value
      ) {
        const newSelectedValues = [...displayedFieldValues]

        newSelectedValues?.pop()

        onValueChange(newSelectedValues)
      }
    }

    const toggleOption = (option: string) => {
      const newSelectedValues = displayedFieldValues?.includes(option)
        ? displayedFieldValues.filter((value) => {
            return value !== option
          })
        : [...displayedFieldValues, option]
      onValueChange(newSelectedValues)
    }

    const handleClear = () => {
      onValueChange([])
    }

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => {
        return !prev
      })
    }

    const clearExtraOptions = () => {
      const newSelectedValues = displayedFieldValues?.slice(0, maxCount)

      onValueChange(newSelectedValues)
    }

    const toggleAll = () => {
      if (displayedFieldValues?.length === options?.length) {
        handleClear()
      } else {
        const allValues = options?.map((option) => {
          return option.value
        })

        onValueChange(allValues)
      }
    }

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            className={cn(
              'flex h-auto min-h-10 w-full items-center justify-between rounded-md border bg-inherit p-1 hover:bg-inherit',
              className
            )}
          >
            {displayedFieldValues?.length > 0 ? (
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-wrap items-center">
                  {displayedFieldValues
                    ?.slice(0, maxCount)
                    ?.map((value) => {
                      const option = options.find((o) => {
                        return o.value === value
                      })

                      const IconComponent = option?.icon

                      return (
                        <Badge
                          key={value}
                          className={cn(multiSelectVariants({ variant }))}
                        >
                          {IconComponent && (
                            <IconComponent className="mr-2 h-4 w-4" />
                          )}

                          {option?.label}
                          <XCircle
                            className="ml-2 h-4 w-4 cursor-pointer"
                            onClick={(event) => {
                              event?.stopPropagation()
                              toggleOption(value)
                            }}
                          />
                        </Badge>
                      )
                    })}

                  {displayedFieldValues?.length > maxCount && (
                    <Badge
                      className={cn(
                        'border-foreground/1 bg-transparent text-foreground hover:bg-transparent',
                        multiSelectVariants({ variant })
                      )}
                    >
                      {`+ ${displayedFieldValues.length - maxCount} more`}

                      <XCircle
                        className="ml-2 h-4 w-4 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation()
                          clearExtraOptions()
                        }}
                      />
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <XIcon
                    className="mx-2 h-4 cursor-pointer text-muted-foreground"
                    onClick={(event) => {
                      event?.stopPropagation()
                      handleClear()
                    }}
                  />

                  <Separator
                    orientation="vertical"
                    className="flex h-full min-h-6"
                  />

                  <ChevronDown className="mx-2 h-4 cursor-pointer text-muted-foreground" />
                </div>
              </div>
            ) : (
              <div className="mx-auto flex w-full items-center justify-between">
                <span className="mx-3 text-sm text-muted-foreground">
                  {placeholder}
                </span>

                <ChevronDown className="mx-2 h-4 cursor-pointer text-muted-foreground" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
          onEscapeKeyDown={() => {
            return setIsPopoverOpen(false)
          }}
        >
          <Command>
            <CommandInput
              placeholder="Search..."
              onKeyDown={handleInputKeyDown}
            />

            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup>
                <CommandItem
                  key="all"
                  onSelect={toggleAll}
                  className="cursor-pointer"
                >
                  <div
                    className={cn(
                      'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                      displayedFieldValues?.length === options?.length
                        ? 'bg-primary text-primary-foreground'
                        : 'opacity-50 [&_svg]:invisible'
                    )}
                  >
                    <CheckIcon className="h-4 w-4" />
                  </div>

                  <span>(Select All)</span>
                </CommandItem>

                {options?.map((option) => {
                  const isSelected = displayedFieldValues?.includes(
                    option.value
                  )

                  return (
                    <CommandItem
                      key={option?.value}
                      onSelect={() => {
                        return toggleOption(option?.value)
                      }}
                      className="cursor-pointer"
                    >
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'opacity-50 [&_svg]:invisible'
                        )}
                      >
                        <CheckIcon className="h-4 w-4" />
                      </div>

                      {option?.icon && (
                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}

                      <span>{option?.label}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup>
                <div className="flex items-center justify-between">
                  {displayedFieldValues?.length > 0 && (
                    <>
                      <CommandItem
                        onSelect={handleClear}
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
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
)

MultiSelect.displayName = 'MultiSelect'
