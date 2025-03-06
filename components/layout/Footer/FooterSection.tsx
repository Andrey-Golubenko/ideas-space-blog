import FooterSectionItem from '~/components/layout/Footer/FooterSectionItem'
import { cn } from '~/libs/utils'
import { type INavLink } from '~/types'
import CategoriesItemsSkeleton from './CategoriesItemsSkeleton'

interface IFooterSectionProps {
  title: string
  sectionItems: INavLink[]
}

const FooterSection = ({ title, sectionItems }: IFooterSectionProps) => {
  const withIconsLabels = sectionItems.every((item) => {
    return item?.label && item?.icon
  })

  return (
    <section className="w-full">
      <h3 className="mb-5 text-xl text-white">{title}</h3>

      <nav>
        <ul
          className={cn(
            'flex text-sm font-normal text-[hsl(var(--logo-color))]',
            withIconsLabels
              ? 'flex-col gap-y-3'
              : 'flex-wrap items-center justify-start gap-5'
          )}
        >
          {sectionItems.length > 0 ? (
            sectionItems?.map((item) => {
              const label = item?.label ?? ''

              const Icon = item?.icon

              const href = item?.href ?? '#'

              return (
                <FooterSectionItem
                  key={href}
                  label={label}
                  icon={Icon}
                  href={href}
                  withIconsLabels={withIconsLabels}
                />
              )
            })
          ) : (
            <CategoriesItemsSkeleton />
          )}
        </ul>
      </nav>
    </section>
  )
}

export default FooterSection
