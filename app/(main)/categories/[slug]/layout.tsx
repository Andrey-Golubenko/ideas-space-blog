import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import CategorySidebar from '~/components/Sidebars/CategorySidebar'

const SingleCategoryLayoute = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <SidebarProvider>
      <div className="flex w-full items-stretch gap-x-4 py-12">
        <CategorySidebar />
        <div className="w-full rounded-md bg-white p-8">
          <SidebarTrigger className="mb-8" />
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}

export default SingleCategoryLayoute
