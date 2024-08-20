import AppCardWrapper from '../shared/CardWrapper/AppCardWrapper'

const NoPostsCard = () => {
  return (
    <AppCardWrapper
      headerTitle="🔭  Search results"
      headerLabel="No posts"
    >
      <p className="flex flex-row items-center justify-center text-xl">
        Unfartunatly, we did not find any posts.
      </p>
    </AppCardWrapper>
  )
}

export default NoPostsCard
