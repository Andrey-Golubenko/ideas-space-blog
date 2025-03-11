'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { UserRole } from '@prisma/client'

import { usePage } from '~/hooks/usePage'
import { useCurrentUser } from '~/hooks/useCurrentUser'
import { Card, CardHeader, CardContent } from '~/components/ui/card'
import WithRole from '~/components/hoc/WithRole'
import UserManageForm from '~/components/shared/UserManageForm'
import { editUser } from '~/actions/edit-user'
import { cn } from '~/libs/utils'
import { emptyStringToUndefined } from '~/utils/helpers'
import { PATHS } from '~/utils/constants'
import { SettingsSchema } from '~/schemas'
import { type TManageUserForm } from '~/types'

interface IEditUserPageViewProps {
  user: UserDTO | null | undefined
  label: string
}

const EditUserPageView = ({ user, label }: IEditUserPageViewProps) => {
  const currentUser = useCurrentUser()

  const router = useRouter()

  const searchParams = useSearchParams()

  const isRedirected = searchParams.get('redirected') === 'true'

  useEffect(() => {
    if (isRedirected) {
      toast.info(
        'You should change your role\nto Admin to visit this page',
        {
          richColors: true,
          closeButton: true
        }
      )
    }
  }, [])

  const { update } = useSession()

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const [isPending, startTransition] = useTransition()

  const { isAdminPage } = usePage()

  const form = useForm<TManageUserForm>({
    defaultValues: {
      id: user?.id,
      name: user?.name as string | undefined,
      email: user?.email,
      password: '',
      newPassword: '',
      role: user?.role,
      isTwoFactorEnabled: user?.isTwoFactorEnabled
    },
    resolver: zodResolver(SettingsSchema)
  })

  const handleOnSubmit = (values: TManageUserForm) => {
    const preparedValues = {
      ...emptyStringToUndefined(values),
      id: user?.id ?? ''
    }

    startTransition(async () => {
      const result = await editUser(preparedValues)

      if (result?.success) {
        setSuccess(result?.success)

        toast.success(result?.success, {
          richColors: true,
          closeButton: true,
          duration: 5000
        })

        if (user?.id === currentUser?.id) {
          update()
        }

        if (isAdminPage) {
          router.push(PATHS.adminUsers)
        }
      }

      if (result?.error) {
        setError(result?.error)
      }
    })
  }

  const userForm = (
    <UserManageForm
      isUserOAuth={user?.isOAuth ?? false}
      form={form}
      handleOnSubmit={handleOnSubmit}
      label="Edit user"
      isDisabled={isPending}
      success={success}
      error={error}
    />
  )

  return (
    <Card
      className={cn(
        'flex min-h-[420px] flex-col shadow-md',
        isAdminPage && 'mx-auto my-4 w-4/5 @5xl:w-3/5'
      )}
    >
      <CardHeader>
        <p className="text-center text-2xl font-semibold">{label}</p>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col justify-evenly space-y-4">
        {isAdminPage ? (
          <WithRole allowedRole={UserRole.ADMIN}>{userForm}</WithRole>
        ) : (
          userForm
        )}
      </CardContent>
    </Card>
  )
}

export default EditUserPageView
