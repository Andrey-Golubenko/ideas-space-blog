import Image from 'next/image'
import Link from 'next/link'

import CardHeaderContent from '~/components/shared/CardWrapper/CardHeaderContent'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '~/components/ui/card'
import { IMAGES_PATHS, PATHS } from '~/utils/constants'

const NotFoundPageView = () => {
  return (
    <Card className="mb-10 mt-20 grid w-[95%] grid-cols-12 p-6 lg:w-[85%]">
      <CardHeader className="col-span-12">
        <CardHeaderContent
          title="Page is not availaible"
          label="The link you followed may be broken, or the page may have been removed!"
        />
      </CardHeader>

      <CardContent className="col-span-12 mb-6 border-b border-dashed border-b-slate-300 p-8 md:col-span-8 md:border-b-0 md:border-r md:border-r-slate-300 md:px-20 md:py-14">
        <Image
          src={IMAGES_PATHS.notFoudBanner}
          alt="Not found"
          priority
          width={700}
          height={300}
          className="h-auto w-full rounded-lg lg:h-[300px]"
        />
      </CardContent>

      <CardFooter className="col-span-12 flex w-full flex-col items-center justify-center md:col-span-4">
        <p className="mb-3 text-center text-muted-foreground md:text-base">
          Sorry about that!
        </p>

        <p className="mb-8 text-center text-muted-foreground md:text-base">
          Please go to Homepage!
        </p>

        <div className="flex w-full items-center justify-center md:w-9/12">
          <Button
            size="lg"
            variant="outline"
            asChild
            className="mb-2 h-8 w-full rounded-lg border border-black/20 bg-blue-200 hover:bg-blue-200/70 md:mb-0"
          >
            <Link href={PATHS.home}>Go Home</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default NotFoundPageView
