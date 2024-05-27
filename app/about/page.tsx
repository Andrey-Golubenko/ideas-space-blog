import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About page | Next app'
}

export default function About() {
  return (
    <div className="page-wrapper">
      <h1 className="page-heading">Select subitem</h1>
    </div>
  )
}
