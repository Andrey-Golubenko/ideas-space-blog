import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex items-center justify-center space-x-4 bg-[#2C2C32] px-0 py-8">
      <Link className="header-link" href="/">
        Home
      </Link>
      <Link className="header-link" href="/blog">
        Blog
      </Link>
      <Link className="header-link" href="/about">
        About
      </Link>
    </header>
  )
}
