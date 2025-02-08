import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { cn } from '~/libs/utils'
import { fontPlayfairDisplay } from '~/utils/constants/fonts'

const Greeting = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-custom-gradient px-6 py-8 shadow-[0_0_20px_rgba(252,252,252,.7)_inset] md:px-16 md:py-20">
      <Card className="bg-slate-100">
        <CardHeader>
          <h2
            className={`${fontPlayfairDisplay.className} text-outline-gray text-shadow-black bg-[url('/images/hero-banner.webp')] bg-cover bg-clip-text bg-center bg-no-repeat pt-8 text-center text-2xl font-bold !italic tracking-wider text-transparent brightness-200 grayscale sm:text-4xl md:text-6xl`}
          >
            Welkome !
          </h2>
        </CardHeader>
        <CardContent className="grid place-items-center">
          <p
            className={cn(
              fontPlayfairDisplay.className,
              'p-5 px-0 text-center text-lg !italic !leading-10 tracking-wider text-slate-600 md:px-14 md:text-xl'
            )}
          >
            Welcome to Idea Space, a platform where every thought comes to
            life!
          </p>

          <p
            className={cn(
              fontPlayfairDisplay.className,
              'p-5 px-0 text-center text-lg !italic !leading-10 tracking-wider text-slate-600 md:px-14 md:text-xl'
            )}
          >
            <span className="mt-4">
              <strong>Disclaimer:</strong>
            </span>{' '}
            This project is exclusively a portfolio showcase and serves no
            commercial or functional purpose. It exists solely as a
            demonstration and is not intended for any real-world
            application.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Greeting
