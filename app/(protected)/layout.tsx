import NavBar from '~/components/NavBar'

const ProtectedLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <main className="to flex basis-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">
      <div className="py-10 xs:w-[80%] sm:w-[65%] md:w-[45%] lg:w-[35%]">
        <NavBar />
        {children}
      </div>
    </main>
  )
}

export default ProtectedLayout
