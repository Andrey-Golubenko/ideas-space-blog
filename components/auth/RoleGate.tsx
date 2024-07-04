'use client'

import { UserRole } from '@prisma/client'
import { useCurrentUser } from '~/hooks/useCurrentUser'
import FormError from '~/components/FormError'

interface IGateRoleProps {
  children: React.ReactNode
  allowedRole: UserRole
}

const RoleGate = ({ children, allowedRole }: IGateRoleProps) => {
  const user = useCurrentUser()

  const userRole = user?.role

  if (userRole !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content!" />
    )
  }

  return children
}

export default RoleGate
