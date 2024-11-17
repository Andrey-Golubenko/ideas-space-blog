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
