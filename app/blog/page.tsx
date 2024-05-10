import PostSearch from '~/components/PostSearch'
import Posts from '~/components/Posts'

function Blog() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-4 text-2xl font-bold">Blog Page</h1>
      <PostSearch />
      <Posts />
    </div>
  )
}

export default Blog
