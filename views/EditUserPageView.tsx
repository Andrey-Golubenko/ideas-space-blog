'use client'

import { useState, useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { UserRole } from '@prisma/client'

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
  user: UserDTO | null
}

const EditUserPageView = ({ user }: IEditUserPageViewProps) => {
  const router = useRouter()
  const { update } = useSession()

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const [isPending, startTransition] = useTransition()

  const pathname = usePathname()

  const isAdminPage = pathname.includes(PATHS.adminEditUsers)

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
      const data = await editUser(preparedValues)

      if (data?.success) {
        setSuccess(data?.success)

        toast.success(data?.success, {
          richColors: true,
          closeButton: true,
          duration: 5000
        })

        if (user?.role !== UserRole.ADMIN) {
          update()
        }

        router.push(PATHS.adminUsers)
      }

      if (data?.error) {
        setError(data?.error)
      }
    })
  }

  return (
    <Card
      className={cn(
        'flex min-h-[420px] flex-col shadow-md',
        isAdminPage ? 'mx-auto my-4 w-4/5 @5xl:w-3/5' : 'my-16'
      )}
    >
      <CardHeader>
        <p className="text-center text-2xl font-semibold">
          👤 Edit the user
        </p>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col justify-evenly space-y-4">
        <WithRole allowedRole={UserRole.ADMIN}>
          <UserManageForm
            isUserOAuth={user?.isOAuth ?? false}
            form={form}
            handleOnSubmit={handleOnSubmit}
            label="Edit user"
            isDisabled={isPending}
            success={success}
            error={error}
          />
        </WithRole>
      </CardContent>
    </Card>
  )
}

export default EditUserPageView
