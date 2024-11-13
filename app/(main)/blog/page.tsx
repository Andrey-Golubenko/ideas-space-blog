import PostSearch from '~/components/posts/PostSearchForm'
import BlogPostsList from '~/components/posts/BlogPostsList'

const BlogPage = () => {
  return (
    <div className="page-wrapper w-full">
      <PostSearch />
      <BlogPostsList />
    </div>
  )
}

export default BlogPage
