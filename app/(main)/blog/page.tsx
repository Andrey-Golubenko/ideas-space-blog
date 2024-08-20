import PostSearch from '~/components/posts/PostSearchForm'
import BlogPostsList from '~/components/posts/BlogPostsList'

const BlogPage = () => {
  return (
    <div className="page-wrapper w-full">
      <h1 className="page-heading">Blog Page</h1>
      <PostSearch />
      <BlogPostsList />
    </div>
  )
}

export default BlogPage
