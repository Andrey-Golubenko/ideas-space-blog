'use client'

import { UserRole } from '@prisma/client'
import FormError from '~/components/FormError'
import { useCurrentUser } from '~/hooks/useCurrentUser'

interface IGateRoleProps {
  children: React.ReactNode
  allowedRole: UserRole
}

/**
 * @component WithRole
 *
 * A client-side component that acts as a role-based access control gate. It conditionally renders its children
 * based on the current user's role.
 *
 * ### Props
 *
 * @prop {React.ReactNode} children
 * - The content to render if the user's role matches the required role.
 *
 * @prop {UserRole} allowedRole
 * - The specific role required to access the content. This should match one of the roles defined in the `UserRole` enum.
 *
 * ### Features
 *
 * - Verifies the current user's role using the `useCurrentUser` hook.
 * - If the user does not have the required role, a `FormError` component is displayed with an appropriate error message.
 * - If the user has the required role, the component renders its children.
 *
 * ### Usage
 *
 * ```tsx
 * <WithRole allowedRole={UserRole.ADMIN}>
 *   <AdminPanel />
 * </WithRole>
 * ```
 *
 * - In this example, the `AdminPanel` component will only render if the current user's role is `ADMIN`.
 * - If the user's role does not match, an error message will be shown instead.
 *
 * ### Internal Logic
 *
 * - **Role Check**:
 *   The `useCurrentUser` hook retrieves the current user's data, including their role.
 *   The `userRole` is then compared to the `allowedRole` passed as a prop.
 *
 * - **Access Denied**:
 *   If the user's role does not match the required role, a `FormError` component is displayed with a message
 *   informing the user that they lack the necessary permissions.
 *
 * - **Access Granted**:
 *   If the user's role matches the required role, the `children` content is rendered.
 *
 * ### Example
 *
 * ```tsx
 * <WithRole allowedRole={UserRole.USER}>
 *   <UserDashboard />
 * </WithRole>
 * ```
 *
 * - In this example, the `UserDashboard` component will only render if the current user's role is `USER`.
 * - If the role check fails, the user will see an error message.
 *
 * ### Notes
 *
 * - The `UserRole` enum should align with the roles defined in your application (e.g., `ADMIN`, `USER`, etc.).
 * - This component is useful for implementing secure role-based access control in client-side rendered applications.
 *
 * @returns {JSX.Element} The children content if the user has the required role, or an error message otherwise.
 */
const WithRole = ({ children, allowedRole }: IGateRoleProps) => {
  const user = useCurrentUser()

  const userRole = user?.role

  if (userRole !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content!" />
    )
  }

  return children
}

export default WithRole
