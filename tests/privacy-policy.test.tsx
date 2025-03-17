import { describe, it, expect, beforeEach } from 'vitest'
import { screen, customRender, cleanup } from '~/tests/test-utils'
import PrivacyPolicyPageView from '~/views/PrivacyPolicyPageView'

describe('PrivacyPolicyPageView Integration Tests', () => {
  beforeEach(() => {
    cleanup()
  })

  it('renders privacy policy content', () => {
    customRender(<PrivacyPolicyPageView />)

    expect(screen.getAllByText(/privacy policy/i)[0]).toBeInTheDocument()
    expect(
      screen.getByText(/this privacy policy describes how we collect/i)
    ).toBeInTheDocument()
  })

  it('displays all required sections', () => {
    customRender(<PrivacyPolicyPageView />)

    expect(
      screen.getByRole('heading', { name: /introduction/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /data collection/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /personal data/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /use of data/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /data sharing/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /security measures/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /your rights/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /contact information/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /changes to this policy/i })
    ).toBeInTheDocument()
  })
})
