'use client'

import { memo } from 'react'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form'
import Editor from '~/components/ui/Editor'

interface IEditorFieldProps {
  name: string
  label: string
  placeholder?: string
  control: any
  isPending: boolean
}

const EditorField = ({
  name,
  label,
  control,
  isPending
}: IEditorFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>

            <FormControl>
              <Editor
                {...field}
                readOnly={isPending}
                onTextChange={field.onChange}
                value={field.value}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default memo(EditorField)
