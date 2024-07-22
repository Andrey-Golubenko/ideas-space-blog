export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="container flex flex-col items-center justify-center">
      {children}
    </main>
  )
}
