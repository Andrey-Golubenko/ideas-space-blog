import Link from 'next/link'

export default function AboutLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <h1 className="my-4 text-center text-2xl font-bold">About us</h1>
      <ul className="list-disc">
        <li>
          <Link href="/about/contacts">Contacts</Link>
        </li>
        <li>
          <Link href="/about/team">Team</Link>
        </li>
      </ul>
      {children}
    </div>
  )
}
