import { SidebarHeader } from '~/components/ui/sidebar'
import SidebarLogoContainer from '~/components/sidebar/SidebarLogoContainer'

interface ISidebarHeaderSectionProps {
  sidebarType: {
    isAdmin: boolean
    isCategory: boolean
  }
}

const SidebarHeaderSection = ({
  sidebarType
}: ISidebarHeaderSectionProps) => {
  const { isAdmin } = sidebarType

  return (
    <SidebarHeader>
      <div
        className={`flex gap-x-4 px-2 py-6 text-sidebar-accent-foreground 
        ${isAdmin ? 'group-data-[collapsible=icon]:!gap-2 group-data-[collapsible=icon]:!px-0  group-data-[collapsible=icon]:!py-2' : ''}`}
      >
        <SidebarLogoContainer sizes={`${isAdmin ? '8' : '10'}`} />
      </div>
    </SidebarHeader>
  )
}

export default SidebarHeaderSection
