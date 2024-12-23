export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="-mb-3 flex basis-full flex-col items-center justify-center bg-custom-gradient">
      <div className="flex w-full flex-col items-center justify-center overflow-hidden py-6 xs:w-[95%] sm:w-[90%] md:py-10 ">
        {children}
      </div>
    </main>
  )
}
