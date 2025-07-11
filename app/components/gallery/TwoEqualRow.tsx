import { Album } from "@/app/types/config"


interface TwoEqualRowProps {
  albums: Album[]
  onAlbumClick: (album: Album, e: React.MouseEvent) => void
}

export default function TwoEqualRow({ albums, onAlbumClick }: TwoEqualRowProps) {
  return (
    <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-8">
      <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        {albums.map((album) => (
          <div 
            key={album.id}
            className="md:col-span-6 group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={(e) => onAlbumClick(album, e)}
          >
            <div className="w-full h-[360px] relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-purple-100/80 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <div className="w-full h-full overflow-hidden rounded-lg">
                  <img
                    src={album.coverImage}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* 标签组 */}
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
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 