'use client'

import CommonErrorCard from '~/components/CommonErrorCard'
import { ICommonErrorCardProps } from '~/types/types'

const ErrorPage = ({ error }: ICommonErrorCardProps) => {
  return (
    <main className="to flex basis-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">
      <CommonErrorCard error={error} />
    </main>
  )
}

export default ErrorPage
