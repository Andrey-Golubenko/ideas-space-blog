import { Card, CardContent } from '~/components/ui/card'

const PostsHeaderCard = () => {
  return (
    <Card className="mb-3 flex w-full flex-row items-center justify-center">
      <CardContent className="py-4 text-2xl font-semibold">
        Users posts
      </CardContent>
    </Card>
  )
}

export default PostsHeaderCard
