export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="-mb-3 flex basis-full flex-col items-center justify-center bg-custom-gradient">
      <div className="py-10 xs:w-[85%] sm:w-[60%] md:w-[45%] lg:w-[30%]">
        {children}
      </div>
    </main>
  )
}
