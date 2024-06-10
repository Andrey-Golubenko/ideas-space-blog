'use client'

import { FormEvent, useState } from 'react'
import usePosts from '~/store'

const PostSearch: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const getPostsBySearch = usePosts((state) => state.getPostsBySearch)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await getPostsBySearch(search)
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mb-10 mt-5"
      >
        <input
          type="search"
          placeholder="search"
          value={search}
          onChange={(event) =>
            setSearch((event?.target as HTMLInputElement)?.value)
          }
          className="rounded-l-md border border-black px-2 py-1"
        />
        <button
          type="submit"
          className="rounded-r-md border-y border-r border-black bg-sky-500 px-2 py-1 text-white"
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default PostSearch
