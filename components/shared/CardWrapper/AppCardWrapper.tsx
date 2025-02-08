'use client'

import { type HTMLAttributes } from 'react'
import { usePathname } from 'next/navigation'

import {
  Card,
  CardHeader,
  CardFooter,
  CardContent
} from '~/components/ui/card'
import CardHeaderContent from '~/components/shared/CardWrapper/CardHeaderContent'
import BackButton from '~/components/auth/BackButton'
import { cn } from '~/libs/utils'
import { PATHS } from '~/utils/constants'

interface ICardWrapperProps {
  children: React.ReactNode
  headerLabel?: string
  headerTitle?: string
  backButtonLabel?: string
  backButtonHref?: string
}

const AppCardWrapper = ({
  children,
  headerTitle,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  ...props
}: ICardWrapperProps & HTMLAttributes<HTMLDivElement>) => {
  const pathname = usePathname()

  const isAdminPage = pathname.includes(PATHS.admin)

  return (
    <Card
      className={cn(
        'shadow-md',
        isAdminPage ? 'mx-auto my-4 w-4/5 @5xl:w-3/5' : 'my-16'
      )}
      {...props}
    >
      <CardHeader>
        <CardHeaderContent
          title={headerTitle}
          label={headerLabel}
        />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {backButtonHref && (
        <CardFooter>
          <BackButton
            label={backButtonLabel}
            href={backButtonHref}
          />
        </CardFooter>
      )}
    </Card>
  )
}

export default AppCardWrapper
