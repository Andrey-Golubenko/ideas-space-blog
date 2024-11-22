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
    <Card className="my-20 w-full py-8 sm:w-[80%] lg:w-[70%]">
      <CardHeader>
        <CardHeaderContent
          title="Page is not availaible"
          label="The link you followed may be broken, or the page may have been removed!"
        />
      </CardHeader>

      <CardContent className="px-20 py-14">
        <Image
          src={IMAGES_PATHS.notFoudBanner}
          alt="Not found"
          priority
          width={700}
          height={400}
          className="h-auto w-full rounded-lg lg:h-[500px]"
        />
      </CardContent>

      <CardFooter className="flex w-full flex-col items-center justify-center">
        <p className="mb-3 text-center text-muted-foreground md:text-xl">
          Sorry about that!
        </p>

        <p className="mb-8 text-center text-muted-foreground md:text-xl">
          Please go to Homepage!
        </p>

        <div className="flex w-full items-center justify-center md:w-9/12">
          <Button
            size="lg"
            variant="outline"
            asChild
            className="mb-2 w-full border border-black/20 bg-slate-100 hover:border-black/10 hover:bg-slate-100/60 md:mb-0 md:w-[45%]"
          >
            <Link href={PATHS.home}>Go Home</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default NotFoundPageView
