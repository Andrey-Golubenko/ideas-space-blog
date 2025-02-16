import { Skeleton } from '~/components/ui/skeleton'

const CategoriesItemsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 9 }).map(() => (
        <span
          key={crypto.randomUUID()}
          className="inline-flex w-fit items-center gap-2"
        >
          <Skeleton className="size-2 bg-[hsl(var(--layout-button))]" />
          <Skeleton className="h-3 w-32 bg-[hsl(var(--layout-button))]" />
        </span>
      ))}
    </>
  )
}

export default CategoriesItemsSkeleton
