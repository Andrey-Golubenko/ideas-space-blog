'use client'

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '~/components/ui/button'

const Social = () => (
  <div className="flex w-full items-center gap-x-2">
    <Button
      size="lg"
      variant="outline"
      className="w-full"
      onClick={() => {}}
    >
      <FcGoogle className="h-5 w-5" />
    </Button>
    <Button
      size="lg"
      variant="outline"
      className="w-full"
      onClick={() => {}}
    >
      <FaGithub className="h-5 w-5" />
    </Button>
  </div>
)

export default Social
