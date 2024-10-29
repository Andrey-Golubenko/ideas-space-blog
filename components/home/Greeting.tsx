import { fontPlayfairDisplay } from '~/utils/constants/fonts'

const Greeting = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800 py-20">
      <h2
        className={`${fontPlayfairDisplay.className} text-outline-white text-shadow-black mb-12 bg-[url('/images/hero-banner.webp')] bg-cover bg-clip-text bg-center bg-no-repeat text-center text-6xl font-bold tracking-wider text-transparent brightness-200 md:text-8xl`}
      >
        Welkome<span className="whitespace-nowrap text-5xl">. . .</span>
      </h2>
      <p
        className={`${fontPlayfairDisplay.className} text-shadow-black rounded-md p-14  text-center text-2xl leading-10 tracking-wider text-white shadow-[0_0_20px_rgba(252,252,252,1)_inset,_0_6px_18px_rgba(0,0,0,0.2),_0_16px_28px_rgba(0,0,0,0.2)] xs:w-4/5 lg:w-2/3`}
      >
        Welcome to Ideas Space – a platform where every thought finds its
        place! This blog is designed to inspire and share knowledge on a
        wide range of topics, from technology to art. Here, you can
        discover something new, express your ideas, and discuss them with
        like-minded individuals. We believe that every idea has the
        potential to change the world if nurtured and developed. Join our
        community and let&apos;s explore new horizons of inspiration
        together!
      </p>
    </div>
  )
}

export default Greeting
