export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="-mb-3 flex basis-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">
      <div className="justify-centerpy-10 flex w-full flex-col items-center overflow-hidden xs:w-[95%] sm:w-[90%] ">
        {children}
      </div>
    </main>
  )
}
