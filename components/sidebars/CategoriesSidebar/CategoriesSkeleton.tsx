import { Skeleton } from '~/components/ui/skeleton'

const CategoriesSkeleton = () => {
  return (
    <>
      {Array.from({ length: 9 }).map(() => (
        <span
          key={crypto.randomUUID()}
          className="inline-flex w-full items-center gap-4"
        >
          <Skeleton className="size-10" />
          <Skeleton className="h-3 w-36" />
          <Skeleton className="ml-auto mr-3 size-2.5" />
        </span>
      ))}
    </>
  )
}

export default CategoriesSkeleton
