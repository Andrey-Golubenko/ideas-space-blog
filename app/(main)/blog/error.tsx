'use client'

export default function ErrorWraper({ error }: { error: Error }) {
  return <h1 className="py-8 text-center text-2xl">{error?.message}</h1>
}
