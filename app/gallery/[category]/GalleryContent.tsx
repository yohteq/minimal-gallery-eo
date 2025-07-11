'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '@/app/components/Footer'
import { Cormorant } from 'next/font/google'
import TwoColumnRow from '@/app/components/gallery/TwoColumnRow'
import ThreeColumnRow from '@/app/components/gallery/ThreeColumnRow'
import MixedRow from '@/app/components/gallery/MixedRow'
import TwoEqualRow from '@/app/components/gallery/TwoEqualRow'
import TwoUnequalRow from '@/app/components/gallery/TwoUnequalRow'
import { getAlbumsByCategory } from '@/app/utils/config'
import { Album } from '@/app/types/config'
import Link from 'next/link'

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-cormorant'
})

interface GalleryContentProps {
  category: string;
  info: {
    title: string;
    description: string;
  };
}

// 定义布局类型
type LayoutType = 'three' | 'mixed' | 'twoEqual' | 'twoUnequal';

// 定义每个布局类型需要的照片数量
const LAYOUT_PHOTO_COUNTS: Record<LayoutType, number> = {
  three: 3,
  mixed: 3, // 1个主图 + 2个侧边图
  twoEqual: 2,
  twoUnequal: 2
};

export default function GalleryContent({ category, info }: GalleryContentProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  const [selectedAlbumPosition, setSelectedAlbumPosition] = useState<DOMRect | null>(null)
  const [currentGalleryInfo, setCurrentGalleryInfo] = useState<{ title: string; description: string }>({
    title: '',
    description: ''
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentLayout, setCurrentLayout] = useState<'staggered' | 'center' | 'symmetric'>('staggered')
  
  // 从配置中获取相册数据
  const albums = useMemo(() => {
    const albums = getAlbumsByCategory(category)
    return albums;
  }, [category])

  // 生成随机布局
  const layouts = useMemo(() => {
    const availableLayouts: LayoutType[] = ['three', 'mixed', 'twoEqual', 'twoUnequal'];
    const result: LayoutType[] = [];
    let remainingAlbums = albums.length - 2; // 减去第一行的两张照片

    while (remainingAlbums > 0) {
      // 过滤出当前可用的布局类型
      const possibleLayouts = availableLayouts.filter(layout => 
        LAYOUT_PHOTO_COUNTS[layout] <= remainingAlbums
      );

      if (possibleLayouts.length === 0) break;

      // 随机选择一个布局
      const randomLayout = possibleLayouts[Math.floor(Math.random() * possibleLayouts.length)];
      result.push(randomLayout);
      remainingAlbums -= LAYOUT_PHOTO_COUNTS[randomLayout];
    }

    return result;
  }, []);

  const handleAlbumClick = (album: Album, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    setSelectedAlbumPosition(rect)
    setSelectedAlbum(album)
    setCurrentGalleryInfo(album)
  }

  const handleClose = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setSelectedAlbum(null)
    setSelectedAlbumPosition(null)
  }

  const handleNextGallery = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!selectedAlbum) return
    const currentIndex = albums.findIndex(p => p.id === selectedAlbum.id)
    const nextAlbum: Album = albums[(currentIndex + 1) % albums.length]
    setSelectedAlbum(nextAlbum);
    setCurrentGalleryInfo(nextAlbum)
  }

  // 计算每个布局的起始索引
  const getLayoutStartIndex = (layoutIndex: number) => {
    let startIndex = 2; // 从第三张照片开始（前两张用于第一行）
    for (let i = 0; i < layoutIndex; i++) {
      startIndex += LAYOUT_PHOTO_COUNTS[layouts[i]];
    }
    return startIndex;
  };

  return (
    <div className={`flex flex-col min-h-screen ${cormorant.variable} font-cormorant`}>
      {/* Background Layer */}
      <div className="fixed inset-0 bg-gradient-to-b from-white via-yellow-50 to-yellow-100 opacity-50" />
      
      {/* Content Layer */}
      <div className="flex-1 pt-40 relative z-10">
        <div className="container mx-auto px-4">
          {/* Photo Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* First row - Always Two columns */}
              <TwoColumnRow 
                albums={albums.slice(0, 2)} 
                onAlbumClick={handleAlbumClick}
                info={info}
                hideFirstPhotoLabels={true}
              />

              {/* Random layouts for remaining photos */}
              {layouts.map((layout, index) => {
                const startIndex = getLayoutStartIndex(index);
                
                switch (layout) {
                  case 'three':
                    return (
                      <ThreeColumnRow 
                        key={`three-${index}`}
                        albums={albums.slice(startIndex, startIndex + 3)} 
                        onAlbumClick={handleAlbumClick}
                      />
                    );
                  case 'mixed':
                    return (
                      <MixedRow 
                        key={`mixed-${index}`}
                        mainAlbum={albums[startIndex]}
                        sideAlbums={albums.slice(startIndex + 1, startIndex + 3)}
                        onAlbumClick={handleAlbumClick}
                      />
                    );
                  case 'twoEqual':
                    return (
                      <TwoEqualRow 
                        key={`twoEqual-${index}`}
                        albums={albums.slice(startIndex, startIndex + 2)} 
                        onAlbumClick={handleAlbumClick}
                      />
                    );
                  case 'twoUnequal':
                    return (
                      <TwoUnequalRow 
                        key={`twoUnequal-${index}`}
                        albums={albums.slice(startIndex, startIndex + 2)} 
                        onAlbumClick={handleAlbumClick}
                      />
                    );
                }
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating Layer */}
      <AnimatePresence>
        {selectedAlbum && selectedAlbumPosition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 bg-black/80 z-50"
            onClick={(e) => handleClose(e)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                initial={{
                  x: selectedAlbumPosition.left - window.innerWidth / 2 + selectedAlbumPosition.width / 2,
                  y: selectedAlbumPosition.top - window.innerHeight / 2 + selectedAlbumPosition.height / 2,
                  width: selectedAlbumPosition.width,
                  height: selectedAlbumPosition.height,
                }}
                animate={{
                  x: 0,
                  y: 0,
                  width: '1200px',
                  height: '600px',
                }}
                exit={{
                  x: selectedAlbumPosition.left - window.innerWidth / 2 + selectedAlbumPosition.width / 2,
                  y: selectedAlbumPosition.top - window.innerHeight / 2 + selectedAlbumPosition.height / 2,
                  width: selectedAlbumPosition.width,
                  height: selectedAlbumPosition.height,
                }}
                transition={{
                  type: "spring", 
                  duration: 1.2,
                  bounce: 0.1
                }}
                className="bg-white rounded-lg overflow-hidden flex md:flex-row flex-col w-[95%] md:w-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="w-full md:w-2/3 relative h-[300px] md:h-auto">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedAlbum.id}
                      src={selectedAlbum.coverImage}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ 
                        duration: 0.5,
                        ease: "easeInOut"
                      }}
                    />
                  </AnimatePresence>
                </div>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '33.333%' }}
                  exit={{ width: 0 }}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.4
                  }}
                  className="p-6 md:p-8 flex flex-col overflow-hidden bg-white w-full md:w-auto min-w-[280px]"
                >
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.6,
                      delay: 0.8 
                    }}
                    className="flex flex-col h-full w-full min-w-[280px] md:w-auto md:min-w-0"
                  >
                    <div className="flex-1 overflow-y-auto mb-4 md:mb-0">
                      {/* Album name */}
                      <h2 className="text-3xl font-medium mb-4 text-gray-900">
                        {selectedAlbum?.title}
                      </h2>
                      {/* Album description */}
                      <p className="text-gray-600 mb-6">
                        {selectedAlbum?.description}
                      </p>
                      {/* Album detail */}
                      {selectedAlbum?.detail && (
                        <p className="text-gray-600 mb-6">
                          {selectedAlbum.detail}
                        </p>
                      )}
                    </div>
                    {/* Button group */}
                    <div className="space-y-4 w-[90%]">
                      <button 
                        className="w-full py-2 px-4 bg-amber-100/80 text-gray-800 rounded-lg hover:bg-amber-100 transition-colors"
                        onClick={() => window.location.href = `/gallery/${category}/${selectedAlbum.id}`}
                      >
                        View Gallery Details
                      </button>
                      
                      <button
                        className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={handleNextGallery}
                      >
                        Next Gallery
                      </button>

                      <button
                        className="w-full py-2 px-4 text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={handleClose}
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 