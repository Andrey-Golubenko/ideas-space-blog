export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="to flex basis-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">
      <div className="justify-centerpy-10 flex flex-col items-center overflow-hidden xs:w-[90%] ">
        {children}
      </div>
    </main>
  )
}
