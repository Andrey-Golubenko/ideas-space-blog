'use client'

import CommonErrorPageView from '~/views/CommonErrorPageView'

interface ICommonErrorCardProps {
  error?: Error
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CommonErrorPage = ({ error }: ICommonErrorCardProps) => {
  return (
    <main className="-mb-3 flex basis-full flex-col items-center justify-center bg-custom-gradient">
      <CommonErrorPageView />
    </main>
  )
}

export default CommonErrorPage
