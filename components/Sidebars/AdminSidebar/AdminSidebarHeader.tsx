import { SidebarHeader } from '~/components/ui/sidebar'
import { GalleryVerticalEnd } from 'lucide-react'

const AdminSidebarHeader = () => {
  return (
    <SidebarHeader>
      <div className="flex gap-x-4 px-2 py-6 text-sidebar-accent-foreground group-data-[collapsible=icon]:!gap-2 group-data-[collapsible=icon]:!px-0  group-data-[collapsible=icon]:!py-2 ">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <GalleryVerticalEnd className="size-6" />
        </div>
        <div className="flex items-center text-left text-base leading-tight">
          <span className="truncate font-semibold">Ideas space</span>
        </div>
      </div>
    </SidebarHeader>
  )
}

export default AdminSidebarHeader
