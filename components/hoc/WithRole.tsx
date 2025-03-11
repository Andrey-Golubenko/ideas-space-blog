'use client'

import { UserRole } from '@prisma/client'
import { useCurrentUser } from '~/hooks/useCurrentUser'
import BeatLoader from 'react-spinners/BeatLoader'
import NotificationInfo from '~/components/notifications/NotificationInfo'

interface IWithRoleProps {
  children: React.ReactNode
  allowedRole: UserRole
}

/**
 * @component WithRole
 *
 * A client-side component to manage role-based access control by conditionally rendering content
 * based on the current user's role.
 *
 * The component takes the required role and renders its children only if the current user's role
 * matches the allowed role. Otherwise, it displays an error message.
 *
 * The primary functionality includes:
 * - Verifying the current user's role using the `useCurrentUser` hook.
 * - Displaying children components when the user has the required role.
 * - Showing a `NotificationError` component with an appropriate message when the user's role does not match.
 *
 * @param {IWithRoleProps} props - The component props.
 * @param {React.ReactNode} props.children - The content to display if the user's role is allowed.
 * @param {UserRole} props.allowedRole - The specific role required to access the content.
 *
 * @returns {JSX.Element} - The rendered content if the user has the allowed role, or an error message otherwise.
 *
 * ### Usage
 * ```tsx
 * import { UserRole } from '@prisma/client';
 *
 * <WithRole allowedRole={UserRole.ADMIN}>
 *   <AdminPanel />
 * </WithRole>
 * ```
 *
 * In this example:
 * - The `AdminPanel` component is rendered only if the current user's role is `ADMIN`.
 * - If the user's role does not match, an error message is displayed instead.
 *
 * ### Notes
 * - Ensure that the `UserRole` enum is correctly aligned with the roles used in your application (e.g., `ADMIN`, `USER`).
 * - This component simplifies role-based access control in client-side rendered applications.
 */
const WithRole = ({ children, allowedRole }: IWithRoleProps) => {
  const currentUser = useCurrentUser()

  const userRole = currentUser?.role

  if (!userRole) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-5 pt-32">
        <p>Checking your access rights.</p>
        <BeatLoader className="h-5 items-center justify-center gap-x-3" />
      </div>
    )
  }

  if (userRole !== allowedRole) {
    return (
      <div className="mt-20">
        <NotificationInfo
          message={`You do not have permission to view this content! Change your role to ${allowedRole} and try again.`}
        />
      </div>
    )
  }

  return children
}

export default WithRole
