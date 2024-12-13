'use client'

import { Card, CardContent, CardHeader } from '../ui/card'
import CardHeaderContent from '../shared/CardWrapper/CardHeaderContent'

interface INoItemsCardProps {
  itemName: string
}

const NoItemsCard = ({ itemName }: INoItemsCardProps) => {
  return (
    <Card className="flex min-h-96 flex-col items-center justify-center">
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

export default NoItemsCard
