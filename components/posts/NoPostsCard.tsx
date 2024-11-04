'use client'

import { Card, CardContent, CardHeader } from '../ui/card'
import CardHeaderContent from '../shared/CardWrapper/CardHeaderContent'

interface INoPostsCardProps {
  itemName: string
}

const NoPostsCard = ({ itemName }: INoPostsCardProps) => {
  return (
    <Card className="min-h-96">
      <CardHeader>
        <CardHeaderContent
          title="🔭  Search results"
          label={`No ${itemName}`}
        />
      </CardHeader>
      <CardContent>
        <p className="text-center text-xl">
          {`Unfartunatly, we did not find any ${itemName}.`}
        </p>
      </CardContent>
    </Card>
  )
}

export default NoPostsCard
