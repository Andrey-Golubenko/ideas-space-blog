'use client'

import CommonErrorCard from '~/components/CommonErrorCard'
import { ICommonErrorCardProps } from '~/types/types'

const ErrorPage = ({ error }: ICommonErrorCardProps) => {
  return <CommonErrorCard error={error} />
}

export default ErrorPage
