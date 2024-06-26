import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About page | Next app'
}

const AboutPage = () => (
  <div className="page-wrapper">
    <h1 className="page-heading">Select subitem</h1>
  </div>
)

export default AboutPage
