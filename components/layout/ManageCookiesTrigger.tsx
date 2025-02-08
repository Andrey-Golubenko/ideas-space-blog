'use client'

import { showPreferences } from 'vanilla-cookieconsent'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Fingerprint } from 'lucide-react'

import useGlobalStore from '~/store'
import { Button } from '~/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '~/components/ui/tooltip'

interface IManageCookiesTriggerProps {
  tooltip?: string
}

const ManageCookiesTrigger = ({ tooltip }: IManageCookiesTriggerProps) => {
  const [isConsentModalOpen] = useGlobalStore((state) => {
    return [state.isConsentModalOpen]
  })

  const [autoAnimateRef] = useAutoAnimate({ duration: 500 })

  const triggerButton = (
    <Button
      title="Manage cookies preferences"
      type="button"
      size="icon"
      className="size-10 rounded-full bg-[hsl(var(--trigger-background))]/65 shadow-[0_0_40px_inset_hsl(var(--layout-button))] lg:size-12"
      onClick={showPreferences}
    >
      <Fingerprint className="size-7" />
    </Button>
  )

  if (!tooltip) {
    return (
      <div
        className="fixed bottom-6 left-6 z-[2147483647] size-10 cursor-pointer rounded-full lg:bottom-10 lg:left-10 lg:size-12"
        ref={autoAnimateRef}
      >
        {!isConsentModalOpen && triggerButton}
      </div>
    )
  }

  return (
    <div
      className="fixed bottom-6 left-3 z-[2147483647] size-10 cursor-pointer rounded-full lg:bottom-10 lg:left-10 lg:size-12"
      ref={autoAnimateRef}
    >
      {!isConsentModalOpen && (
        <Tooltip>
          <TooltipTrigger asChild>{triggerButton}</TooltipTrigger>
          <TooltipContent
            side="right"
            align="center"
            className="bg-[hsl(var(--layout-background))] text-white"
          >
            <span className="bg-[hsl(var(--layout-background))] text-white">
              {tooltip as React.ReactNode}
            </span>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}

export default ManageCookiesTrigger
