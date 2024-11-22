import { ScrollArea } from '~/components/ui/scroll-area'

const ScrollableContainer = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <ScrollArea className="h-[calc(100dvh-52px)]">
      <div className="h-full p-4 md:px-6">{children}</div>
    </ScrollArea>
  )
}

export default ScrollableContainer
