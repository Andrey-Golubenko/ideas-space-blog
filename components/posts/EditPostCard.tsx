'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { type Post } from '@prisma/client'

import usePosts from '~/store'
import AppCardWrapper from '~/components/shared/CardWrapper/AppCardWrapper'
import PostManageForm from '~/components/shared/PostManageForm'
import { editPost } from '~/actions/edit-post'
import { PATHS } from '~/utils/constants/constants'
import { ManagePostSchema } from '~/schemas'

interface IEditPostCardProps {
  isLogged: boolean
}

const EditPostCard = ({ isLogged }: IEditPostCardProps) => {
  const [success, setSuccess] = useState<string | undefined>('')
  const [error, setError] = useState<string | undefined>('')

  const [editablePost, setEditablePost] = usePosts((state) => {
    return [state.editablePost, state.setEditablePost]
  })

  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const { id: postId, title, content, published } = editablePost as Post

  const isDisabled = isPending || !isLogged

  const form = useForm<z.infer<typeof ManagePostSchema>>({
    defaultValues: {
      title: title || '',
      content: content || '',
      published: published || false
    },
    resolver: zodResolver(ManagePostSchema)
  })

  // To prevent empty form values after the page is reloaded
  useEffect(() => {
    if (editablePost) {
      form.reset({
        title,
        content,
        published: published || false
      })
    }
  }, [editablePost, form])

  const handleOnSubmit = (values: z.infer<typeof ManagePostSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      editPost(values, postId).then((data) => {
        setError(data.error)
        setSuccess(data.success)

        if (data.success) {
          toast.success(data.success, {
            richColors: true,
            closeButton: true,
            duration: 5000
          })

          setEditablePost({})

          router.push(`${PATHS.blog}/${postId}`)
        }
      })
    })
  }

  return (
    <AppCardWrapper
      headerTitle="📄 Post"
      headerLabel={`Edit post - ${title || ''}`}
    >
      <PostManageForm
        form={form}
        handleOnSubmit={handleOnSubmit}
        label={`Edit post - ${title || ''}`}
        isDisabled={isDisabled}
        success={success}
        error={error}
      />
    </AppCardWrapper>
  )
}

export default EditPostCard
