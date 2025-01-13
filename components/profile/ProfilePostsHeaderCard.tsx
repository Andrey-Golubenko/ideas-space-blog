import { Card, CardContent } from '~/components/ui/card'

const ProfilePostsHeaderCard = () => {
  return (
    <Card className="mb-4 flex w-full flex-row items-center justify-center">
      <CardContent className="py-4 text-center text-2xl font-semibold">
        Users posts{' '}
        <span className="whitespace-nowrap text-base font-normal text-slate-500">
          (published and drafts)
        </span>
      </CardContent>
    </Card>
  )
}

export default ProfilePostsHeaderCard
