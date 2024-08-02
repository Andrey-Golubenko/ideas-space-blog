'use client'

import {
  Card,
  CardHeader,
  CardFooter,
  CardContent
} from '~/components/ui/card'
import CardHeaderContent from '~/components/shared/CardWrapper/CardHeaderContent'
import BackButton from '~/components/auth/BackButton'

interface ICardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  headerTitle: string
  backButtonLabel: string
  backButtonHref: string
}

const AppCardWrapper = ({
  children,
  headerTitle,
  headerLabel,
  backButtonLabel,
  backButtonHref
}: ICardWrapperProps) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardHeaderContent
          title={headerTitle}
          label={headerLabel}
        />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  )
}

export default AppCardWrapper
