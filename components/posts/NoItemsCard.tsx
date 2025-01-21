'use client'

import { Card, CardContent, CardHeader } from '../ui/card'
import CardHeaderContent from '../shared/CardWrapper/CardHeaderContent'

interface INoItemsCardProps {
  itemName: string
}

const NoItemsCard = ({ itemName }: INoItemsCardProps) => {
  return (
    <Card className="flex min-h-96 w-full flex-grow flex-col items-center justify-center border-0 shadow-none">
      <CardHeader>
        <CardHeaderContent
          title="🔭  Search results"
          label={`No ${itemName}`}
        />
      </CardHeader>
      <CardContent>
        <p className="text-center text-xl">
          {`Unfartunatly, we did not find any ${itemName} yet.`}
        </p>
      </CardContent>
    </Card>
  )
}

export default NoItemsCard
