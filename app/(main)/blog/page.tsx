import PostSearch from '~/components/posts/PostSearchForm'
import PostsList from '~/components/posts/PostsList'

const BlogPage = () => {
  return (
    <div className="page-wrapper w-full">
      <h1 className="page-heading">Blog Page</h1>
      <PostSearch />
      <PostsList />
    </div>
  )
}

export default BlogPage
