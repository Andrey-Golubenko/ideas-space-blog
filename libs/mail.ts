import { Resend } from 'resend'
import { PATHS } from '~/utils/constants/constants'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string
) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Two factor authentication code',
    html: `<p>Your two factor authentication code: <b>${token}</b></p>`
  })
}

export const sendPasswordResetEmail = async (
  email: string,
  token: string
) => {
  const resetLink = `http://localhost:3000/${PATHS.newPassword}?token=${token}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your Password!</p>`
  })
}

export const sendVerificationEmail = async (
  email: string,
  token: string
) => {
  const confirmLink = `http://localhost:3000${PATHS.emailVerification}?token=${token}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Confirm your Email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm Email!</p>`
  })
}
