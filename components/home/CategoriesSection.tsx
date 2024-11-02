import { Card, CardHeader, CardContent } from '~/components/ui/card'
import CardHeaderContent from '~/components/shared/CardWrapper/CardHeaderContent'
import SectionCategoriesList from '~/components/categories/SectionCategoriesList'

const CategoriesSection = () => {
  return (
    <Card className="h-full w-full border-transparent bg-slate-100 shadow-md">
      <CardHeader className="pb-0 pt-20">
        <CardHeaderContent
          title="Topic Highlights"
          label="Blog Themes"
        />
      </CardHeader>
      <CardContent>
        <SectionCategoriesList />
      </CardContent>
    </Card>
  )
}

export default CategoriesSection
