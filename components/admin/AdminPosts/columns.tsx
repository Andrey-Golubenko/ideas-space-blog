'use client'

import Link from 'next/link'
import { type ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '~/components/ui/checkbox'
import CellAction from '~/components/admin/AdminPosts/CellAction'
import LoadableImage from '~/components/shared/LoadableImage'
import { IMAGES_PATHS, PATHS } from '~/utils/constants'
import { type TTRuncatedAuthors, type TDeserializedPost } from '~/types'

export const columns: ColumnDef<TDeserializedPost>[] = [
  {
    id: 'select',
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            return table.toggleAllPageRowsSelected(!!value)
          }}
          aria-label="Select all"
        />
      )
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            return row.toggleSelected(!!value)
          }}
          aria-label="Select row"
        />
      )
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'imageUrls',
    header: 'IMAGE',
    cell: ({ row }) => {
      const post = row.original as TDeserializedPost

      const postId = post.id

      const imageUrls = row.getValue<string[]>('imageUrls') ?? []

      const singleImageUrl = imageUrls?.[0] ?? IMAGES_PATHS.noImages

      return (
        <Link
          href={`${PATHS.adminPost(postId)}`}
          className="hover:brightness-110"
        >
          <LoadableImage
            src={singleImageUrl}
            alt={row.getValue('title') ?? 'Post'}
            containerHeight={44}
            containerClassNames="aspect-square !w-11 rounded-lg"
          />
        </Link>
      )
    }
  },
  {
    accessorKey: 'title',
    header: 'TITLE',
    cell({ row }) {
      const title = row.getValue<string | null>('title') ?? ''

      return (
        <span className="line-clamp-2 max-w-48 whitespace-nowrap">
          {title}
        </span>
      )
    }
  },
  {
    accessorKey: 'categories',
    header: 'CATEGORIES',
    cell: ({ row }) => {
      const categories = row.getValue<TCategoryOptions[] | null>(
        'categories'
      )

      const categoriesList = categories
        ? categories?.map((category) => {
            const categoryName = category?.categoryName

            return (
              <span
                key={categoryName}
                className="whitespace-nowrap"
              >
                {categoryName}
              </span>
            )
          })
        : ''

      return <p className="flex flex-col">{categoriesList}</p>
    }
  },
  {
    accessorKey: 'content',
    header: 'CONTENT',
    cell: ({ row }) => {
      const content = row.getValue<string | null>('content') ?? ''

      return <span className="line-clamp-2">{content}</span>
    }
  },
  {
    accessorKey: 'author',
    header: 'AUTHOR',
    cell: ({ row }) => {
      const author = row.getValue<TTRuncatedAuthors | null>('author') ?? {
        id: '',
        name: ''
      }

      const formattedAuthor = author
        ? author?.name
            ?.split(' ')
            .map((word) => {
              return (
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
            })
            .join(' ')
        : 'Anonymous'

      return <span>{formattedAuthor}</span>
    }
  },
  {
    accessorKey: 'published',
    header: 'PUBLISHED',
    cell: ({ row }) => {
      const isPublished = row?.original?.published ?? false

      return <span>{isPublished ? '✅' : '❌'}</span>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <CellAction postId={row?.original?.id} />
    }
  }
]
