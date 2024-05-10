export interface INavLink {
  label: string
  href: string
}

const linksItems: INavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' }
]

export default linksItems
