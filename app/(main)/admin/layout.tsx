import { UserRole } from '@prisma/client'
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import AdminSidebar from '~/components/sidebars/AdminSidebar'
import WithRole from '~/components/hoc/WithRole'

const AdminLayoute = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <SidebarProvider>
      <div className="flex w-full items-stretch justify-between gap-x-4 py-2 xs:pb-6 xs:pt-12 sm:py-12">
        <AdminSidebar />
        <div className="w-full overflow-auto rounded-md bg-white p-2 xs:p-4 sm:p-6">
          <SidebarTrigger
            className="mb-8"
            tooltip="Toggle Sidebar"
          />
          <WithRole allowedRole={UserRole.ADMIN}>{children}</WithRole>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default AdminLayoute
