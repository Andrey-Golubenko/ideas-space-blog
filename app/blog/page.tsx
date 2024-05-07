import Link from 'next/link'

async function getPosts() {
  const response = await fetch(
    // imitation of an error,
    // 'https://jsonplaceholder.typicode.com/posts222222222'
    'https://jsonplaceholder.typicode.com/posts',
    {
      next: {
        // revalidate date every minutes
        revalidate: 5 // sec
      }
    }
  )

  if (!response.ok)
    throw new Error('Unable fetch posts! An unexpected error has occured!')

  return response.json()
}

export interface IPost {
  userId: number
  id: number
  title: string
  body: string
}

export default async function Blog() {
  const posts: IPost[] = await getPosts()

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-4 text-2xl font-bold">Blog Page</h1>
      <ul className="list-disc">
        {posts.length &&
          posts.map((post) => (
            <li key={post?.id}>
              <Link href={`/blog/${post?.id}`}>{post.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  )
}
