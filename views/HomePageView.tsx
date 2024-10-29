import Greeting from '~/components/home/Greeting'
import HeroBanner from '~/components/home/HeroBanner'
import HeroContnen from '~/components/home/HeroContnen'
import CategoriesSection from '~/components/home/CategoriesSection'

const HomePageView = () => {
  return (
    <>
      <section className="fixed left-0 top-0 z-[-1] flex h-[600px] w-full items-center justify-center rounded-md shadow-[0_6px_25px_rgba(0,0,0,0.3),_0_16px_35px_rgba(0,0,0,0.3)]">
        <HeroBanner />

        <HeroContnen />
      </section>
      <section className="mt-[510px] bg-gradient-to-b from-transparent to-slate-100">
        <Greeting />
      </section>
      <section className="h-full w-full bg-slate-100">
        <CategoriesSection />
      </section>
    </>
  )
}

export default HomePageView
