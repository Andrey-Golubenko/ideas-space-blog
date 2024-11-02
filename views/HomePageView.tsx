import Greeting from '~/components/home/Greeting'
import HeroBanner from '~/components/home/HeroBanner'
import HeroContnen from '~/components/home/HeroContnen'
import CategoriesSection from '~/components/home/CategoriesSection'
import RecentPostsList from '~/components/posts/RecentPostsList'

const HomePageView = () => {
  return (
    <>
      <section className="fixed left-0 top-0 z-[-1] flex h-[670px] w-full items-center justify-center rounded-md">
        <HeroBanner />

        <HeroContnen />
      </section>

      <section className="z-10 -mb-3 mt-[550px] bg-gradient-to-b from-transparent to-slate-100">
        <Greeting />
      </section>

      <section className="h-full w-full bg-slate-100">
        <CategoriesSection />
      </section>

      <section className="-mt-3 h-full w-full rounded-xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800 px-16 py-20 shadow-[0_0_20px_rgba(252,252,252,.5)_inset]">
        <RecentPostsList />
      </section>
    </>
  )
}

export default HomePageView
