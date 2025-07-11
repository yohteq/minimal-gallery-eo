import { Metadata } from 'next'
import { getCategoryInfo, getAlbumsByCategory, getAlbumById } from '@/app/utils/config'

interface Props {
  params: {
    category: string
    albumId: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const info = getCategoryInfo(params.category) || { title: 'Gallery', description: 'Photo Gallery' }
  const albums = getAlbumsByCategory(params.category)
  const album = albums.find(a => a.id === params.albumId)
  return getAlbumById(params.category, params.albumId) as any;
}

export default function AlbumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 