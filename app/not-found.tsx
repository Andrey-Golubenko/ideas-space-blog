import NotFoundPageView from '~/views/NotFoundPageView'

const NotFoundPage = () => {
  return (
    <main
      className="-mb-3 flex basis-full flex-col items-center justify-center bg-custom-gradient"
      data-not-found-page
    >
      <NotFoundPageView />
    </main>
  )
}

export default NotFoundPage
