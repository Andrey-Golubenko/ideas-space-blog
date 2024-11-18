'use server'

import { headers } from 'next/headers'
/**
 * Safari and other WebKit-based browsers sometimes interpret the Expires value of cookie as local time. Chrome and others Blick-based browsers, does not do this and always uses UTC.
 * @returns boolean, is the browser based on the WebKit engine
 */

export const isWebKitDetermine = async () => {
  const headersList = headers()

  const userAgent = headersList.get('user-agent') ?? ''

  const lowerUA = userAgent.toLowerCase()

  // WebKit browsers include Safari, iOS Chrome and others
  const isWebKit = lowerUA.includes('applewebkit')

  // We exclude Blink browsers (Chrome, Edge, Opera), but leave iOS Chrome
  const isBlink =
    lowerUA.includes('chrome') &&
    !lowerUA.includes('edg') &&
    !lowerUA.includes('opr')

  // Gecko (Firefox) or Presto (old Opera)
  const isGecko = lowerUA.includes('gecko') && lowerUA.includes('firefox')
  const isPresto = lowerUA.includes('presto') || lowerUA.includes('opera')

  // WebKit = Apple WebKit, but not Blink, Gecko or Presto
  return isWebKit && !isBlink && !isGecko && !isPresto
}

export const getBrowserName = async (
  userAgent: string | null
): Promise<string> => {
  if (!userAgent) return 'other'

  const ua = userAgent.toLowerCase()

  if (ua.includes('chrome') && !ua.includes('edg') && !ua.includes('opr'))
    return 'chrome'
  if (ua.includes('safari') && !ua.includes('chrome')) return 'safari'
  if (ua.includes('firefox')) return 'firefox'
  if (ua.includes('edg')) return 'edge'

  return 'other'
}
