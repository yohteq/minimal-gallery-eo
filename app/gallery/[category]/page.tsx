import { Metadata } from 'next'
import GalleryContent from './GalleryContent'
import { getCategoryInfo, getAllCategories } from '@/app/utils/config'

// 生成静态参数
export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    category: category,
  }))
}

// 生成元数据
export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const info = getCategoryInfo(params.category) || { title: 'Gallery', description: 'Photo Gallery' }
  
  return {
    title: `${info.title} - Gallery`,
    description: info.description,
  }
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const info = getCategoryInfo(params.category) || { title: 'Gallery', description: 'Photo Gallery' }

  return <GalleryContent category={params.category} info={info} />
} 