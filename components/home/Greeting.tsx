import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { fontPlayfairDisplay } from '~/utils/constants/fonts'

const Greeting = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800 px-16 py-20 shadow-[0_0_20px_rgba(252,252,252,.7)_inset]">
      <Card className="bg-slate-100">
        <CardHeader>
          <h2
            className={`${fontPlayfairDisplay.className} text-outline-gray pt-6 text-center text-6xl font-bold !italic tracking-wider text-slate-500`}
          >
            Welkome !
          </h2>
        </CardHeader>
        <CardContent className="grid place-items-center">
          <p
            className={`${fontPlayfairDisplay.className} p-5 px-14 text-center text-xl !italic leading-10 tracking-wider text-slate-600`}
          >
            Welcome to Ideas Space – a platform where every thought finds
            its place! This blog is designed to inspire and share knowledge
            on a wide range of topics, from technology to art. Here, you
            can discover something new, express your ideas, and discuss
            them with like-minded individuals. We believe that every idea
            has the potential to change the world if nurtured and
            developed. Join our community and let&apos;s explore new
            horizons of inspiration together!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Greeting
