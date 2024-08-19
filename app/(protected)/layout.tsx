import NavBar from '~/components/NavBar'

const ProtectedLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <main className="to flex basis-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">
      <NavBar />
      {children}
    </main>
  )
}

export default ProtectedLayout
