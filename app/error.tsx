'use client'

import CommonErrorCard from '~/components/CommonErrorCard'

interface ICommonErrorCardProps {
  error?: Error
}

const ErrorPage = ({ error }: ICommonErrorCardProps) => {
  return (
    <main className="to -mb-3 flex basis-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">
      <CommonErrorCard />
    </main>
  )
}

export default ErrorPage
