'use client'

import Link from 'next/link'
import { Button } from '~/components/ui/button'

interface IBackButtonProps {
  label: string
  href: string
}

const BackButton = ({ label, href }: IBackButtonProps) => (
  <Button variant="link" className="font-narmal w-full" size="sm" asChild>
    <Link href={href}>{label}</Link>
  </Button>
)

export default BackButton
