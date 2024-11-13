'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '~/components/ui/card'
import CardHeaderContent from '~/components/shared/CardWrapper/CardHeaderContent'
import { IMAGES_PATHS, PATHS } from '~/utils/constants/constants'

const CommonErrorPageView = () => {
  const router = useRouter()

  return (
    <Card className="my-20 w-full sm:w-[80%] lg:w-[70%]">
      <CardHeader>
        <CardHeaderContent
          title="Error"
          label="An unexpected error has occurred!"
        />
      </CardHeader>

      <CardContent>
        <Image
          src={IMAGES_PATHS.errorBanner}
          alt="Error"
          priority
          width={700}
          height={400}
          className="h-auto w-full rounded-lg lg:h-[500px]"
        />
      </CardContent>

      <CardFooter className="flex w-full flex-col items-center justify-center">
        <p className="mb-3 mt-6 text-center text-muted-foreground md:text-xl">
          We are already working on fixing this error.
        </p>

        <p className="mb-8 text-center text-muted-foreground md:text-xl">
          Please try again later or go to Homepage!
        </p>

        <div className="flex w-full flex-wrap items-center justify-between md:w-9/12">
          <Button
            size="lg"
            variant="outline"
            className="mb-2 w-full border border-black/20 bg-slate-100 hover:border-black/10 hover:bg-slate-100/60 md:mb-0 md:w-[45%]"
            onClick={() => {
              return router.push(PATHS.home)
            }}
          >
            Go Home
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full border border-black/20 bg-slate-100 hover:border-black/10 hover:bg-slate-100/60 md:w-[45%]"
            onClick={() => {
              return router.back()
            }}
          >
            GO back
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CommonErrorPageView
