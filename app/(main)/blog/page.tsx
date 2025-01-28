import { Metadata } from 'next'

import BlogPageView from '~/views/BlogPageView'

export const metadata: Metadata = {
  title: 'Ideas space: Blog : Posts',
  description: 'Displaying posts in the blog',
  robots: { index: true, follow: true }
}

const BlogPage = () => {
  return <BlogPageView />
}

export default BlogPage
