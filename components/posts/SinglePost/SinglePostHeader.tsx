import { CardHeader } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'

interface ISinglePostHeaderProps {
  hasContent: boolean
  singlePostTitle: string
}

const SinglePostHeader = ({
  hasContent,
  singlePostTitle
}: ISinglePostHeaderProps) => {
  if (!hasContent) {
    return <Skeleton className="m-6 mx-auto mb-4 mt-10 h-8 w-4/5" />
  }

  return (
    <CardHeader className="pb-8 pt-16 text-2xl font-semibold">
      {singlePostTitle}
    </CardHeader>
  )
}

export default SinglePostHeader
