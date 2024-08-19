'use client'

import { useRouter } from 'next/navigation'

import AppCardWrapper from '~/components/shared/CardWrapper/AppCardWrapper'
import { Button } from '~/components/ui/button'
import { ICommonErrorCardProps } from '~/types/types'

const CommonErrorCard = ({
  error = { name: 'An Error', message: 'Somthing went wrong!' }
}: ICommonErrorCardProps) => {
  const router = useRouter()

  return (
    <AppCardWrapper
      headerTitle="🚨 Error"
      headerLabel="An error has occurred!"
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="py-8 text-center text-2xl">{error?.message}</h1>
        <Button
          size="sm"
          onClick={() => {
            return router.back()
          }}
        >
          Go back
        </Button>
      </div>
    </AppCardWrapper>
  )
}

export default CommonErrorCard
