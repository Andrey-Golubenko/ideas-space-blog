interface ISingleCategoryCardProps {
  posts: FullPost[] | null
}

const SingleCategoryCard = ({ posts }: ISingleCategoryCardProps) => {
  console.log('posts :>> ', posts)

  return <div>SIngleCategoryCard</div>
}

export default SingleCategoryCard
