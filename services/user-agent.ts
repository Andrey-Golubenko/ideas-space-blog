'use server'

import { headers } from 'next/headers'

/**
 * @server-function - Function to determine if the browser is based on the WebKit engine.
 * Safari and other WebKit-based browsers sometimes interpret the `Expires` value of cookies as local time.
 * Chrome and other Blink-based browsers, however, always use UTC.
 * @returns Promise<boolean> - Returns `true` if the browser is based on the WebKit engine, otherwise `false`.
 */
export const isWebKitDetermine = async (): Promise<boolean> => {
  const headersList = headers()

  const userAgent = headersList.get('user-agent') ?? ''

  const lowerUA = userAgent.toLowerCase()

  // WebKit browsers include Safari, iOS Chrome, and others
  const isWebKit = lowerUA.includes('applewebkit')

  // We exclude Blink browsers (Chrome, Edge, Opera), but leave iOS Chrome
  const isBlink =
    lowerUA.includes('chrome') &&
    !lowerUA.includes('edg') &&
    !lowerUA.includes('opr')

  // Gecko (Firefox) or Presto (old Opera)
  const isGecko = lowerUA.includes('gecko') && lowerUA.includes('firefox')
  const isPresto = lowerUA.includes('presto') || lowerUA.includes('opera')

  // WebKit = Apple WebKit, but not Blink, Gecko, or Presto
  return isWebKit && !isBlink && !isGecko && !isPresto
}

/**
 * @server-function - Function to determine the name of the browser based on the user agent string.
 * @param userAgent - A string representing the user agent of the browser. If `null`, the function returns 'other'.
 * @returns Promise<string> - Returns the name of the browser: 'chrome', 'safari', 'firefox', 'edge', or 'other'.
 */
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
