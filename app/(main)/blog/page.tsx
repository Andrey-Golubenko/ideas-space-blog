import PostSearch from '~/components/PostSearch'
import Posts from '~/components/Posts'

const BlogPage = () => {
  return (
    <div className="page-wrapper">
      <h1 className="page-heading">Blog Page</h1>
      <PostSearch />
      <Posts />
    </div>
  )
}

export default BlogPage
