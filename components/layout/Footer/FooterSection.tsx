import { RxComponentPlaceholder } from 'react-icons/rx'

import FooterSectionItem from '~/components/layout/Footer/FooterSectionItem'
import { cn } from '~/libs/utils'
import { type INavLink } from '~/types'

interface IFooterSectionProps {
  title: string
  sectionItems: INavLink[]
  withIcons?: boolean
}

const FooterSection = ({
  title,
  sectionItems,
  withIcons = false
}: IFooterSectionProps) => {
  return (
    <section className="w-full">
      <h4 className="mb-5 text-xl text-white">{title}</h4>

      <nav>
        <ul
          className={cn(
            'flex text-sm font-normal text-[hsl(var(--logo-color))]',
            withIcons
              ? 'flex-wrap items-center justify-start gap-5'
              : 'flex-col gap-y-3'
          )}
        >
          {sectionItems &&
            sectionItems?.map((item) => {
              const label = item?.label ?? ''

              const Icon = item?.icon ?? RxComponentPlaceholder

              const href = item?.href ?? '#'

              return (
                <FooterSectionItem
                  key={href}
                  label={label}
                  icon={Icon}
                  href={href}
                />
              )
            })}
        </ul>
      </nav>
    </section>
  )
}

export default FooterSection
