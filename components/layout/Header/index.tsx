import Navigation from '~/components/navigation/Navigation'

export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-40 -mb-3 flex w-full items-center justify-center rounded-b-lg">
      <Navigation />
    </header>
  )
}
