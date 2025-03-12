'use client'

import { showPreferences } from 'vanilla-cookieconsent'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Fingerprint } from 'lucide-react'

import useGlobalStore from '~/store'
import { Button } from '~/components/ui/button'
import WithTooltip from '~/components/hoc/WithTooltip'

const CookiesBannerTrigger = () => {
  const { isConsentModalOpen } = useGlobalStore((state) => {
    return { isConsentModalOpen: state.isConsentModalOpen }
  })

  const [autoAnimateRef] = useAutoAnimate({ duration: 500 })

  return (
    <div
      className="fixed bottom-6 left-3 z-[2147483647] size-10 cursor-pointer rounded-full lg:bottom-10 lg:left-10 lg:size-12"
      ref={autoAnimateRef}
    >
      {!isConsentModalOpen && (
        <WithTooltip
          tooltip="Manage cookies preferences"
          contentClasses="bg-[hsl(var(--layout-background))] text-white"
          tooltipClasses="bg-[hsl(var(--layout-background))] text-white"
        >
          <Button
            title="Manage cookies preferences"
            type="button"
            size="icon"
            className="size-10 rounded-full bg-[hsl(var(--trigger-background))]/65 shadow-[0_0_40px_inset_hsl(var(--layout-button))] lg:size-12"
            onClick={showPreferences}
          >
            <Fingerprint className="size-7" />
          </Button>
        </WithTooltip>
      )}
    </div>
  )
}

export default CookiesBannerTrigger
