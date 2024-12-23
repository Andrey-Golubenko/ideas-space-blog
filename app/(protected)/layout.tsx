import NavBar from '~/components/NavBar'

const ProtectedLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <main className="-mb-3 flex basis-full flex-col items-center justify-center bg-custom-gradient">
      <NavBar />
      {children}
    </main>
  )
}

export default ProtectedLayout
