import HeroBanner from '~/components/home/HeroBanner'
import HeroContnen from '~/components/home/HeroContnen'

const HomePage = () => {
  return (
    <div className="relative flex h-full w-full flex-col justify-between">
      <div className="relative flex items-center justify-center">
        <HeroBanner />
        <HeroContnen />
      </div>
      <h1 className="page-heading">Home Page</h1>
    </div>
  )
}

export default HomePage
