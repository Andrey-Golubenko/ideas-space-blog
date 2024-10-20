'use client'

import AppCardWrapper from '~/components/shared/CardWrapper/AppCardWrapper'

interface INoPostsCardProps {
  itemName: string
}

const NoPostsCard = ({ itemName }: INoPostsCardProps) => {
  return (
    <AppCardWrapper
      headerTitle="🔭  Search results"
      headerLabel={`No ${itemName}`}
    >
      <p className="flex flex-row items-center justify-center text-xl">
        {`Unfartunatly, we did not find any ${itemName}.`}
      </p>
    </AppCardWrapper>
  )
}

export default NoPostsCard
