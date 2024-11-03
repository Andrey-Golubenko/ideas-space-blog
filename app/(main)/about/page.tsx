import { Metadata } from 'next'
import CommonErrorCard from '~/components/CommonErrorCard'

export const metadata: Metadata = {
  title: 'About page | Next app'
}

const AboutPage = () => {
  return (
    <div className="page-wrapper w-full">
      <CommonErrorCard />
    </div>
  )
}

export default AboutPage
