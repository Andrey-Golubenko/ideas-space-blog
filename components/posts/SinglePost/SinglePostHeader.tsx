import { CardHeader } from '~/components/ui/card'

interface ISinglePostHeaderProps {
  singlePostTitle: string
}

const SinglePostHeader = ({ singlePostTitle }: ISinglePostHeaderProps) => {
  return (
    <CardHeader className="pb-8 pt-16 text-2xl font-semibold">
      {singlePostTitle}
    </CardHeader>
  )
}

export default SinglePostHeader
