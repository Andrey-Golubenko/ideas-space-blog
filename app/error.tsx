'use client'

import CommonErrorPageView from '~/views/CommonErrorPageView'

interface ICommonErrorCardProps {
  error?: Error
}

const CommonErrorPage = ({ error }: ICommonErrorCardProps) => {
  return (
    <main className="to -mb-3 flex basis-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">
      <CommonErrorPageView />
    </main>
  )
}

export default CommonErrorPage
