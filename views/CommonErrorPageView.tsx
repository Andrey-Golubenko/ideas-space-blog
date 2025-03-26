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
import { IMAGES_PATHS, PATHS } from '~/utils/constants'

const CommonErrorPageView = () => {
  const router = useRouter()

  return (
    <Card className="mb-10 mt-20 grid w-[95%] grid-cols-12 p-6 lg:w-[80%]">
      <CardHeader className="col-span-12">
        <CardHeaderContent
          title="Error"
          label="An unexpected error has occurred!"
        />
      </CardHeader>

      <CardContent className="col-span-12 mb-6 border-b border-dashed border-b-slate-300 md:col-span-8 md:border-b-0 md:border-r md:border-r-slate-300 md:px-28 md:py-4">
        <Image
          src={IMAGES_PATHS.errorBanner}
          alt="Error"
          priority
          width={700}
          height={300}
          className="h-auto w-full rounded-lg lg:h-[300px]"
        />
      </CardContent>

      <CardFooter className="col-span-12 flex w-full flex-col items-center justify-center md:col-span-4">
        <p className="mb-3 text-center text-muted-foreground md:text-base">
          We are already working on fixing this error.
        </p>

        <p className="mb-8 text-center text-muted-foreground md:text-base">
          Please try again later!
        </p>

        <div className="flex w-full flex-wrap items-center justify-between gap-2 md:w-9/12">
          <Button
            size="lg"
            variant="outline"
            className="mb-2 h-8 w-full rounded-lg border border-black/20 bg-blue-200 hover:bg-blue-200/70 md:mb-0"
            onClick={() => {
              return router.push(PATHS.home)
            }}
          >
            Go Home
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="mb-2 h-8 w-full rounded-lg border border-black/20 bg-blue-200 hover:bg-blue-200/70 md:mb-0"
            onClick={() => {
              return router.back()
            }}
          >
            Go back
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CommonErrorPageView
