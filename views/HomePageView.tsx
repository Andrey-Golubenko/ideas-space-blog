import Greeting from '~/components/home/Greeting'
import HeroBanner from '~/components/home/HeroBanner'
import HeroContent from '~/components/home/HeroContent'
import CategoriesSection from '~/components/home/CategoriesSection'
import RecentPostsSection from '~/components/home/RecentPostsSection'

const HomePageView = () => {
  return (
    <>
      <section className="fixed left-0 top-0 z-[-1] flex h-[600px] w-full items-center justify-center rounded-md">
        <HeroBanner />

        <HeroContent />
      </section>

      <section className="z-10 -mb-3 mt-[550px] bg-gradient-to-b from-transparent to-slate-100">
        <Greeting />
      </section>

      <section className="h-full w-full bg-slate-100">
        <CategoriesSection />
      </section>

      <section className="-mt-3 h-full w-full rounded-xl bg-custom-gradient px-6 py-20 shadow-[0_0_20px_rgba(252,252,252,.5)_inset] md:px-16">
        <RecentPostsSection />
      </section>
    </>
  )
}

export default HomePageView
