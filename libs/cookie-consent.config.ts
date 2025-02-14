import type { CookieConsentConfig } from 'vanilla-cookieconsent'

import { PATHS } from '~/utils/constants'

interface IGetConfigProps {
  setCookiesConsent: (consentsCookies: boolean) => void
  setIsConsentModalOpen: (open: boolean) => void
}

const getConfig = ({
  setCookiesConsent,
  setIsConsentModalOpen
}: IGetConfigProps) => {
  const config: CookieConsentConfig = {
    disablePageInteraction: true,

    guiOptions: {
      consentModal: {
        layout: 'box',
        position: 'middle center',
        equalWeightButtons: true,
        flipButtons: false
      }
    },

    cookie: {
      name: 'cc_cookie',
      domain: window?.location?.hostname,
      path: '/',
      sameSite: 'Lax',
      expiresAfterDays: 1,
      useLocalStorage: true
    },

    categories: {
      necessary: {
        enabled: true,
        readOnly: true
      },
      analytics: {
        autoClear: {
          cookies: [
            {
              name: /^(_prev)/,
              domain: window?.location?.pathname
            },
            {
              name: '_prev_session_Id',
              domain: window?.location?.pathname
            },
            {
              name: '_prevGIA',
              domain: window?.location?.pathname
            },
            {
              name: '_prevUA',
              domain: window?.location?.pathname
            }
          ]
        }
      }
    },

    language: {
      default: 'en',
      translations: {
        en: {
          consentModal: {
            title: 'We use cookies',
            description:
              'Our website uses tracking cookies to understand how you interact with it. The tracking will be enabled only if you accept explicitly.',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            showPreferencesBtn: 'Manage Individual preferences',
            footer: `
                      <div class="cc-footer">
                        <a href="${PATHS.impressum}" target="_blank">Impressum</a>
                        <a href="${PATHS.privacyPolicy}" target="_blank">Privacy Policy</a>
                      </div>
                    `
          },
          preferencesModal: {
            title: 'Cookie Preferences',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            savePreferencesBtn: 'Save',
            closeIconLabel: 'Close',
            sections: [
              {
                title: 'Your Privacy Choices',
                description: `In this panel you can express some preferences related to the processing of your personal information. You may review and change expressed choices at any time by resurfacing this panel via the provided link. To deny your consent to the specific processing activities described below, switch the toggles to off or use the “Reject all” button and confirm you want to save your choices.`
              },
              {
                title: 'Strictly Necessary',
                description:
                  'These cookies are essential for the proper functioning of the website and cannot be disabled.',
                linkedCategory: 'necessary'
              },
              {
                title: 'Performance and Analytics',
                description:
                  'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                linkedCategory: 'analytics',
                cookieTable: {
                  caption: 'Cookie table',
                  headers: {
                    name: 'Cookie',
                    domain: 'Cookie Domain',
                    desc: 'Purpose',
                    expiration: 'Expiration'
                  },
                  body: [
                    {
                      name: '_prev_session_Id',
                      domain: window?.location?.hostname,
                      desc: 'This cookie stores a unique session identifier to maintain user session state across page views.',
                      expiration: 'Session'
                    },
                    {
                      name: '_prevGIA',
                      domain: window?.location?.hostname,
                      desc: 'This cookie is used to store general analytics data about user interactions on the website.',
                      expiration: 'Expires after 24 hours'
                    },
                    {
                      name: '_prevUA',
                      domain: window?.location?.hostname,
                      desc: 'This cookie is used to track user activity and performance metrics for website optimization.',
                      expiration: 'Expires after 24 hours'
                    }
                  ]
                }
              },
              {
                title: 'More information',
                description: `For any queries in relation to my policy on cookies and your choices, please <a class="cc__link" href="${PATHS.impressum}">contact me</a>.`
              }
            ]
          }
        }
      }
    },

    onConsent: (consent) => {
      const hasAnalyticsConsent: boolean =
        consent?.cookie?.categories.includes('analytics')

      if (hasAnalyticsConsent) {
        setCookiesConsent(true)
      } else {
        setCookiesConsent(false)
      }
    },

    onModalShow: () => {
      return setIsConsentModalOpen(true)
    },

    onModalHide: () => {
      return setIsConsentModalOpen(false)
    },

    onChange: ({ cookie }) => {
      const hasAnalyticsConsent: boolean =
        cookie?.categories.includes('analytics')

      if (hasAnalyticsConsent) {
        setCookiesConsent(true)
      } else {
        setCookiesConsent(false)
      }
    }
  }

  return config
}

export default getConfig
