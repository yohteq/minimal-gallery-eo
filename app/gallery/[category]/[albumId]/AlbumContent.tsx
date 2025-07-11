'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { Album } from '@/app/types/config'

// Layout template definitions
const layoutTemplates = [
  // Template 1: Staggered layout
  {
    id: 1,
    name: 'Staggered',
    layout: [
      { size: 'medium', position: 'left' },
      { size: 'large', position: 'center' },
      { size: 'small', position: 'right-top' },
      { size: 'small', position: 'right-bottom' }
    ]
  },
  // Template 2: Center focus with side images
  {
    id: 2,
    name: 'Center Focus',
    layout: [
      { size: 'small', position: 'top-left' },
      { size: 'large', position: 'center' },
      { size: 'small', position: 'top-right' },
      { size: 'medium', position: 'bottom-left' },
      { size: 'medium', position: 'bottom-right' }
    ]
  },
  // Template 3: Symmetric layout
  {
    id: 3,
    name: 'Symmetric',
    layout: [
      { size: 'large', position: 'left' },
      { size: 'medium', position: 'right-top' },
      { size: 'medium', position: 'right-bottom' }
    ]
  }
]

interface AlbumContentProps {
  albumData: Album
  category: string
}

export default function AlbumContent({ albumData, category }: AlbumContentProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [currentLayout, setCurrentLayout] = useState(0)

  // Get all photos
  const getAllPhotos = () => {
    return albumData?.photos || [];
  }

  // Get current layout photos
  const getCurrentLayoutPhotos = () => {
    const template = layoutTemplates[currentLayout]
    return template.layout.map((item, index) => ({
      ...albumData.photos[index % albumData.photos.length],
      size: item.size
    }))
  }

  const handlePhotoClick = (index: number) => {
    // Calculate index in full photo list
    const photoInLayout = getCurrentLayoutPhotos()[index]
    const globalIndex = albumData.photos.findIndex(p => p.id === photoInLayout.id)
    setSelectedPhoto(globalIndex)
  }

  const handleClose = () => {
    setSelectedPhoto(null)
  }

  const handlePrevious = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto - 1 + getAllPhotos().length) % getAllPhotos().length)
    }
  }

  const handleNext = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto + 1) % getAllPhotos().length)
    }
  }

  const handleLayoutChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentLayout((prev) => (prev - 1 + layoutTemplates.length) % layoutTemplates.length)
    } else {
      setCurrentLayout((prev) => (prev + 1) % layoutTemplates.length)
    }
  }

  // Get photo size class
  const getPhotoSizeClass = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2'
      case 'medium':
        return 'col-span-1 row-span-2'
      case 'small':
        return 'col-span-1 row-span-1'
      default:
        return 'col-span-1 row-span-1'
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation bar */}
      <Navbar />

      {/* Main content area */}
      <main className="flex-grow pt-40 pb-4">
        {/* Background layer */}
        <div className="fixed inset-0 bg-gradient-to-b from-white via-yellow-50 to-yellow-100 opacity-50" />
        
        {/* Content layer */}
        <div className="container mx-auto px-4 relative z-10">
          {/* Back button */}
          <div className="max-w-6xl mx-auto mb-2">
            <Link
              href={`/gallery/${category}`}
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft size={20} className="mr-2" />
              Back to Gallery
            </Link>
          </div>

          {/* Album information area */}
          <div className="max-w-6xl mx-auto mb-2">
            <div className="text-center">
              <h1 className="text-2xl font-light text-gray-900">{albumData.title}</h1>
              <p className="text-sm text-gray-600 mt-1 max-w-2xl mx-auto">{albumData.description}</p>
            </div>
          </div>

          {/* Photos grid */}
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLayout}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {getCurrentLayoutPhotos().map((photo, index) => (
                  <motion.div
                    key={`${currentLayout}-${photo.id}`}
                    className={`relative group cursor-pointer ${getPhotoSizeClass(photo.size)}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => handlePhotoClick(index)}
                  >
                    <div className="w-full h-full overflow-hidden rounded-lg">
                      <img
                        src={photo.url}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination controls */}
          <div className="max-w-6xl mx-auto mt-4 mb-4 flex justify-center items-center gap-4">
            <button
              onClick={() => handleLayoutChange('prev')}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
              disabled={currentLayout === 0}
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm font-medium text-gray-600">
              {currentLayout + 1} / {layoutTemplates.length}
            </span>
            <button
              onClick={() => handleLayoutChange('next')}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
              disabled={currentLayout === layoutTemplates.length - 1}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Photo preview overlay */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex flex-col"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Top close button */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Main image area */}
            <div className="flex-grow flex items-center justify-center p-4">
              <div className="flex items-center gap-8">
                {/* Left switch button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="hidden md:block text-white hover:text-gray-300 transition-colors p-2"
                >
                  <ChevronLeft size={40} />
                </button>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative max-w-4xl w-full overflow-hidden"
                  onClick={e => e.stopPropagation()}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedPhoto}
                      src={getAllPhotos()[selectedPhoto].url}
                      className="w-full h-auto rounded-lg shadow-2xl"
                      initial={{ 
                        opacity: 0,
                        x: selectedPhoto > (selectedPhoto - 1 + getAllPhotos().length) % getAllPhotos().length ? 100 : -100
                      }}
                      animate={{ 
                        opacity: 1,
                        x: 0
                      }}
                      exit={{ 
                        opacity: 0,
                        x: selectedPhoto > (selectedPhoto - 1 + getAllPhotos().length) % getAllPhotos().length ? -100 : 100
                      }}
                      transition={{ 
                        duration: 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  </AnimatePresence>
                </motion.div>

                {/* Right switch button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="hidden md:block text-white hover:text-gray-300 transition-colors p-2"
                >
                  <ChevronRight size={40} />
                </button>
              </div>
            </div>

            {/* Bottom thumbnail list */}
            <div className="h-24 bg-black/50 backdrop-blur-sm p-4">
              <div className="max-w-4xl mx-auto flex gap-2 overflow-x-auto">
                {getAllPhotos().map((photo, index) => (
                  <div
                    key={photo.id}
                    className={`flex-shrink-0 w-16 h-16 rounded cursor-pointer transition-all ${
                      index === selectedPhoto ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-75'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPhoto(index);
                    }}
                  >
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 