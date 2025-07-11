import { Album } from '@/app/types/config'

interface MixedRowProps {
  mainAlbum: Album
  sideAlbums: Album[]
  onAlbumClick: (album: Album, e: React.MouseEvent) => void
}

export default function MixedRow({ mainAlbum, sideAlbums, onAlbumClick }: MixedRowProps) {
  return (
    <>
      <div 
        className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-7 h-[500px] cursor-pointer"
        onClick={(e) => onAlbumClick(mainAlbum, e)}
      >
        <div className="w-full relative h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-purple-100/80 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="w-full h-full overflow-hidden rounded-lg">
              {(
                <img
                  src={mainAlbum.coverImage}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              )}
              {/* 标签组 */}
              <div className="absolute top-4 right-4 flex gap-2">
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                  <span className="text-sm font-medium text-gray-700">
                    {mainAlbum.photoCount} Photos
                  </span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                  <span className="text-sm font-medium text-gray-700">
                    {new Date(mainAlbum.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side vertical cards */}
      <div className="md:col-span-5 flex flex-col h-[500px] gap-4">
        {sideAlbums.map((album, index) => (
          <div 
            key={`right-${index}`} 
            className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex-1 cursor-pointer"
            onClick={(e) => onAlbumClick(album, e)}
          >
            <div className="w-full h-full relative">
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
    </>
  )
} 