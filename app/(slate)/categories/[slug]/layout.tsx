import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import CategoriesSidebar from '~/components/sidebars/CategoriesSidebar'

const SingleCategoryLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <SidebarProvider>
      <div className="flex w-full items-stretch gap-x-4 py-12">
        <CategoriesSidebar />
        <div className="z-20 flex h-full w-full flex-col rounded-md bg-white p-8">
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

export default SingleCategoryLayout
