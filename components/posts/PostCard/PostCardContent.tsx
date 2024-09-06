'use client'

import { CardContent } from '~/components/ui/card'

interface IpostCardContentProps {
  postContent: string
}

const PostCardContent = ({ postContent }: IpostCardContentProps) => {
  return (
    <CardContent className="pb-10 text-justify">
      <div className="rounded-xl bg-slate-100 px-4 py-2">
        {postContent}
      </div>
    </CardContent>
  )
}

export default PostCardContent
