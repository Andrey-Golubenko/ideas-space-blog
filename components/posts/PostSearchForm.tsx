'use client'

import { useTransition } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import AppCardWrapper from '~/components/shared/CardWrapper/AppCardWrapper'
import TextField from '~/components/shared/TextField'
import { Form } from '~/components/ui/form'
import { Button } from '~/components/ui/button'
import { SearchPostSchema } from '~/schemas'
import usePosts from '~/store'

const PostSearchForm: React.FC = () => {
  const [isPending, setTransition] = useTransition()

  const getPostsBySearch = usePosts((state) => {
    return state.getPostsBySearch
  })

  const form = useForm<z.infer<typeof SearchPostSchema>>({
    defaultValues: {
      search: ''
    },
    resolver: zodResolver(SearchPostSchema)
  })

  const handleOnSubmit = (values: z.infer<typeof SearchPostSchema>) => {
    setTransition(async () => {
      await getPostsBySearch(values?.search || '')
    })
  }

  return (
    <AppCardWrapper
      headerTitle="🔍 Find a post"
      headerLabel="To find a post - inter one or more words and press the button"
    >
      <Form {...form}>
        <form
          className="flex w-full flex-row"
          onSubmit={form.handleSubmit(handleOnSubmit)}
        >
          <TextField
            name="search"
            control={form.control}
            label="Search a post"
            isPending={isPending}
            className="rounded-r-none"
          />
          <Button
            type="submit"
            size="sm"
            className="h-[36px] self-end rounded-l-none"
          >
            Search
          </Button>
        </form>
      </Form>
    </AppCardWrapper>
  )
}

export default PostSearchForm
