import { Album } from '@/app/types/config'

interface ThreeColumnRowProps {
  albums: Album[]
  onAlbumClick: (album: Album, e: React.MouseEvent) => void
}

export default function ThreeColumnRow({ albums, onAlbumClick }: ThreeColumnRowProps) {
  return (
    <>
      {albums.map((album, index) => (
        <div 
          key={album.id}
          className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-4 cursor-pointer"
          onClick={(e) => onAlbumClick(album, e)}
        >
          <div className="w-full relative h-[360px]">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-purple-100/80 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <div className="w-full h-full overflow-hidden rounded-lg">
                  <img
                    src={album.coverImage}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                {/* 标签组 */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {index !== 0 && (
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                      <span className="text-sm font-medium text-gray-700">
                        {album.photoCount} Photos
                      </span>
                    </div>
                  )}
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                    <span className="text-sm font-medium text-gray-700">
                      {new Date(album.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
} 