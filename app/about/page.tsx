import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About page | Next app'
}

export default function About() {
  return (
    <div className="flex items-center justify-center">
      <h1 className="my-4 text-2xl font-medium">Select subitem</h1>
    </div>
  )
}
