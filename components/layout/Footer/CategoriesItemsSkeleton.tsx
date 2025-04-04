import { Skeleton } from '~/components/ui/skeleton'

const CategoriesItemsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 9 }).map(() => (
        <li
          key={crypto.randomUUID()}
          className="inline-flex w-fit items-center gap-2"
        >
          <Skeleton className="size-3 bg-[hsl(var(--layout-button))]" />
          <Skeleton className="h-2 w-36 bg-[hsl(var(--layout-button))]" />
        </li>
      ))}
    </>
  )
}

export default CategoriesItemsSkeleton
