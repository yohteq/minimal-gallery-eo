import { Album } from '@/app/types/config'
import { Photo } from '@/app/types/gallery'

interface TwoColumnRowProps {
  albums: Album[]
  onAlbumClick: (album: Album, e: React.MouseEvent) => void
  info?: {
    title: string
    description: string
    detail?: string
  }
  hideFirstPhotoLabels?: boolean
}

export default function TwoColumnRow({ albums, onAlbumClick, info, hideFirstPhotoLabels = false }: TwoColumnRowProps) {
  return (
    <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-8">
      {albums.map((album, index) => (
        <div 
          key={album.id}
          className={`md:col-span-${index === 0 ? '7' : '5'} group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${index === 1 ? 'cursor-pointer' : ''}`}
          onClick={index === 1 ? (e) => onAlbumClick(album, e) : undefined}
        >
          <div className="w-full h-[300px] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-purple-100/80 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <div className="w-full h-full overflow-hidden rounded-lg">
                <img
                  src={album.coverImage}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* 标签组 - 第一个相册且hideFirstPhotoLabels为true时不显示照片数和时间标签 */}
                {!(index === 0 && hideFirstPhotoLabels) && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                      <span className="text-sm font-medium text-gray-700">
                        {album.photoCount} Photos
                      </span>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                      <span className="text-sm font-medium text-gray-700">
                        {new Date(album.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {index === 0 && info && (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-white/80" />
                <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12">
                  <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-wider">
                    {info.title}
                  </h2>
                  <p className="text-lg text-gray-700 mb-6 max-w-2xl italic">
                    {info.description}
                  </p>
                  <p className="text-base text-gray-600 max-w-2xl italic">
                    { info.detail}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
} 