import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import AdminSidebar from '~/components/Sidebars/AdminSidebar'

const AdminLayoute = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <SidebarProvider>
      <div className="flex w-full items-stretch gap-x-4 py-2 xs:py-6 sm:py-12">
        <AdminSidebar />
        <div className="w-full rounded-md bg-white p-2 xs:p-4 sm:p-8">
          <SidebarTrigger
            className="mb-8"
            tooltip="Toggle Sidebar"
          />
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}

export default AdminLayoute
