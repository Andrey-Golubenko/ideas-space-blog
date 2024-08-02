'use client'

import {
  Card,
  CardHeader,
  CardFooter,
  CardContent
} from '~/components/ui/card'
import CardHeaderContent from '~/components/shared/CardWrapper/CardHeaderContent'
import Social from '~/components/auth/Social'
import BackButton from '~/components/auth/BackButton'

interface ICardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

const AuthCardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial
}: ICardWrapperProps) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardHeaderContent
          title="🔐 Auth"
          label={headerLabel}
        />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  )
}

export default AuthCardWrapper
