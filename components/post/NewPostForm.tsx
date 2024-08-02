'use client'

import { useState, useTransition } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '~/components/ui/form'
import { Button } from '~/components/ui/button'
import AppCardWrapper from '~/components/shared/CardWrapper/AppCardWrapper'
import TextField from '~/components/shared/TextField'
import TextAreaField from '~/components/shared/TextAreaField'
import FormError from '~/components/FormError'
import FormSuccess from '~/components/FormSuccess'
import { PATHS } from '~/utils/constants/constants'
import { newPost } from '~/actions/new-post'
import { CreatePostSchema } from '~/schemas'

interface INewPostFormProps {
  isLogged: boolean
}

const NewPostForm = ({ isLogged }: INewPostFormProps) => {
  const [success, setSuccess] = useState<string | undefined>('')
  const [error, setError] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof CreatePostSchema>>({
    defaultValues: {
      title: '',
      content: ''
    },
    resolver: zodResolver(CreatePostSchema)
  })

  const handleOnSubmit = (values: z.infer<typeof CreatePostSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      newPost(values).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }

  const isDisabled = isPending || !isLogged

  return (
    <AppCardWrapper
      headerTitle="📄 Post"
      headerLabel="Create a new post"
      backButtonLabel="To create a new post, you need to sign in"
      backButtonHref={PATHS.logIn}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-8"
        >
          <div className="space-y-6">
            <TextField
              control={form.control}
              name="title"
              label="Title"
              isPending={isDisabled}
            />

            <TextAreaField
              control={form.control}
              name="content"
              label="Post content"
              isPending={isDisabled}
            />
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />

          <Button
            type="submit"
            disabled={isDisabled}
            className="w-full"
          >
            Create a new post
          </Button>
        </form>
      </Form>
    </AppCardWrapper>
  )
}

export default NewPostForm
