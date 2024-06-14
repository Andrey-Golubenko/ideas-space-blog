import Link from 'next/link'
import { PATHS } from '~/utils/constants/constants'

export default function AboutLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <h1 className="my-4 text-center text-2xl font-bold">About us</h1>
      <ul className="list-disc">
        <li>
          <Link href={PATHS.constacts}>Contacts</Link>
        </li>
        <li>
          <Link href={PATHS.team}>Team</Link>
        </li>
      </ul>
      {children}
    </div>
  )
}
