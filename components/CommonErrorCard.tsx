'use client'

import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

import AppCardWrapper from '~/components/shared/CardWrapper/AppCardWrapper'
import { Button } from '~/components/ui/button'
import { PATHS } from '~/utils/constants/constants'
import { ICommonErrorCardProps } from '~/types/types'

const CommonErrorCard = ({
  error = { name: 'An Error', message: 'Somthing went wrong!' }
}: ICommonErrorCardProps) => {
  const router = useRouter()

  return (
    <AppCardWrapper
      className="xs:w-[80%] sm:w-[50%] lg:w-[40%]"
      headerTitle="🚨 Error"
      headerLabel="An error has occurred!"
    >
      <div className="flex flex-col items-center justify-center">
        <ExclamationTriangleIcon
          className="mb-5 text-destructive"
          width={20}
          height={20}
        />
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            return router.push(PATHS.home)
          }}
        >
          Go Home
        </Button>
      </div>
    </AppCardWrapper>
  )
}

export default CommonErrorCard
