import Greeting from '~/components/home/Greeting'
import HeroBanner from '~/components/home/HeroBanner'
import HeroContnen from '~/components/home/HeroContnen'

const HomePage = () => {
  return (
    <>
      <section className="relative mb-20 flex w-full items-center justify-center shadow-[0_6px_25px_rgba(0,0,0,0.3),_0_16px_35px_rgba(0,0,0,0.3)]">
        <HeroBanner />

        <HeroContnen />
      </section>
      <section className="mb-24">
        <Greeting />
      </section>
      <h1 className="page-heading">Home Page</h1>
    </>
  )
}

export default HomePage
