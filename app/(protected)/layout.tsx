import UserProfileBar from '~/components/UserProfileBar'

const ProtectedLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <main className="-mb-3 flex basis-full flex-col items-center justify-center bg-custom-gradient pt-10">
      <UserProfileBar />
      {children}
    </main>
  )
}

export default ProtectedLayout
