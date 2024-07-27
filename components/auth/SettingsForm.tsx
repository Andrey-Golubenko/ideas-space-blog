'use client'

import { useState, useTransition } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import type { Session } from 'next-auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '~/components/ui/form'
import { SettingsSchema } from '~/schemas'
import { settings } from '~/actions/settings'
import { useSessionData } from '~/hooks/useSessionData'
import { Button } from '~/components/ui/button'
import FormError from '~/components/FormError'
import FormSuccess from '~/components/FormSuccess'
import TextField from '~/components/shared/TextField'
import PasswordField from '~/components/shared/PasswordField'
import SelectField from '~/components/shared/SelectField'
import SwitchField from '~/components/shared/SwitchField'
import { emptyStringToUndefined } from '~/utils/helpers/helpers'

interface ISettingsFormProps {
  session: Session | null
}

const SettingsForm = ({ session }: ISettingsFormProps) => {
  const user = session?.user
  const { update } = useSessionData()

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof SettingsSchema>>({
    defaultValues: {
      name: user?.name as string | undefined,
      email: user?.email,
      password: '',
      newPassword: '',
      role: user?.role,
      isTwoFactorEnabled: user?.isTwoFactorEnabled
    },
    resolver: zodResolver(SettingsSchema)
  })

  const onHandleSubmit = (values: z.infer<typeof SettingsSchema>) => {
    const preparedValues = emptyStringToUndefined(values)

    startTransition(() => {
      settings(preparedValues)
        .then((data) => {
          if (data.error) {
            setError(data.error)
          }

          if (data.success) {
            update()
            setSuccess(data.success)
          }
        })
        .catch(() => {
          return 'Somthing went wrong!'
        })
    })
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-grow flex-col justify-evenly space-y-6"
        onSubmit={form.handleSubmit(onHandleSubmit)}
      >
        <div className="space-y-4">
          <TextField
            name="name"
            type="text"
            placeholder="John Doe"
            label="Name"
            control={form.control}
            isPending={isPending}
          />
          {!user?.isOAuth && (
            <>
              <TextField
                name="email"
                type="email"
                placeholder="email@example.com"
                label="Email"
                control={form.control}
                isPending={isPending}
              />
              <PasswordField
                name="password"
                label="Password"
                control={form.control}
                isPending={isPending}
              />
              <PasswordField
                name="newPassword"
                label="New password"
                control={form.control}
                isPending={isPending}
              />
            </>
          )}
          <SelectField
            name="role"
            label="Role"
            placeholder="Select a Role"
            control={form.control}
            isPending={isPending}
          />
          {!user?.isOAuth && (
            <SwitchField
              name="isTwoFactorEnabled"
              label="Two Factor Authentication"
              control={form.control}
              isPending={isPending}
            />
          )}
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          disabled={isPending}
        >
          Save
        </Button>
      </form>
    </Form>
  )
}

export default SettingsForm
