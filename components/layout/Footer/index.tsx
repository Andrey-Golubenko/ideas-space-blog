'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { ChevronRightIcon } from 'lucide-react'

import FooterSection from '~/components/layout/Footer/FooterSection'
import { useCategoriesOptions } from '~/hooks/useCategoriesOptions'
import {
  FOOTER_NAV_LINKS_LEGAL,
  SOCIAL_NAV_LINKS,
  PATHS
} from '~/utils/constants'
import { type INavLink } from '~/types'

export default function Footer() {
  const searchParams = useSearchParams()

  const refreshParam = useMemo(
    () => searchParams.get('refresh-categories'),
    [searchParams]
  )
  const { categoriesOptions } = useCategoriesOptions('slug', refreshParam)

  const categoriesItems: INavLink[] = categoriesOptions?.map((catItem) => {
    return {
      label: catItem?.label,
      icon: ChevronRightIcon,
      href: `${PATHS.category(catItem?.value)}`
    }
  })

  return (
    <footer className="z-10 mt-auto rounded-t-lg bg-[hsl(var(--layout-background))] shadow-[0_0_10px_rgba(252,252,252,.4)_inset]">
      <div className="grid grid-cols-1 items-start justify-center gap-y-8 p-12 sm:grid-cols-2 md:grid-cols-3 ">
        <FooterSection
          title="Legal Information"
          sectionItems={FOOTER_NAV_LINKS_LEGAL}
        />

        <FooterSection
          title="Articles by Topic"
          sectionItems={categoriesItems}
        />

        <FooterSection
          title="Contact Us"
          sectionItems={SOCIAL_NAV_LINKS}
        />
      </div>

      <p className="flex items-center justify-center pb-10 pt-2 text-white">
        Copyright © {new Date().getFullYear()}
      </p>
    </footer>
  )
}
