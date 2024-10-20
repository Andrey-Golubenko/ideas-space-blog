import Link from 'next/link'
import { PATHS } from '~/utils/constants/constants'

export default function AboutLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col items-center justify-center xs:w-[80%] sm:w-[50%]">
      <h1 className="my-4 text-center text-2xl font-bold">
        About us page
      </h1>
      {children}

      <ul className="w-full list-disc">
        <li>
          <Link href={PATHS.contacts}>Contacts</Link>
        </li>
        <li>
          <Link href={PATHS.team}>Team</Link>
        </li>
      </ul>
    </div>
  )
}
