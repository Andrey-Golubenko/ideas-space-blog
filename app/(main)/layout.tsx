export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="to flex basis-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">
      <div className="py-10 xs:w-[85%] sm:w-[60%] md:w-[45%] lg:w-[30%]">
        {children}
      </div>
    </main>
  )
}
