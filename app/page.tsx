import { Metadata } from 'next'
import Link from 'next/link'
import Footer from './components/Footer'
import { getHomeConfig } from './utils/config'

export const metadata: Metadata = {
  title: 'Photography Gallery',
  description: 'Professional photography services and gallery showcasing nature, urban, travel, and architecture photography.',
}

export default function Home() {
  const config = getHomeConfig()
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* 背景层 */}
      <div className="fixed inset-0 bg-gradient-to-b from-white via-yellow-50 to-yellow-100 opacity-50" />
      
      {/* 内容层 */}
      <div className="flex-1 pt-8 md:pt-16 flex items-center relative z-10">
        <div className="container mx-auto px-4">
          {/* 主要内容区域 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* 移动端图片展示区域 */}
            <div className="md:hidden relative h-[45vh] flex items-center justify-center">
              <div className="w-full max-w-[400px] relative h-[35vh]">
                {/* 移动端第一张图片 */}
                <div className="absolute inset-0 w-full aspect-[4/3] bg-gradient-to-br from-gray-50 to-white p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform -rotate-3 hover:scale-[1.02] transition-transform duration-300 rounded-2xl">
                  <div className="w-full h-full overflow-hidden rounded-xl">
                    <img
                      src={config.featuredCollections[0].image}
                      alt={config.featuredCollections[0].title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                {/* 移动端第二张图片 */}
                <div className="absolute inset-0 w-full aspect-[4/3] bg-gradient-to-br from-gray-50 to-white p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform rotate-2 hover:scale-[1.02] transition-transform duration-300 rounded-2xl">
                  <div className="w-full h-full overflow-hidden rounded-xl">
                    <img
                      src={config.featuredCollections[1].image}
                      alt={config.featuredCollections[1].title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                {/* 移动端第三张图片 */}
                <div className="absolute inset-0 w-full aspect-[4/3] bg-gradient-to-br from-gray-50 to-white p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform -rotate-1 hover:scale-[1.02] transition-transform duration-300 rounded-2xl">
                  <div className="w-full h-full overflow-hidden rounded-xl">
                    <img
                      src={config.featuredCollections[2].image}
                      alt={config.featuredCollections[2].title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* PC端图片展示区域 */}
            <div className="hidden md:block relative h-[600px] flex items-center">
              {/* 第一张图片 - 最底层 */}
              <div className="absolute right-0 top-0 w-[90%] aspect-[4/3] bg-gradient-to-br from-gray-50 to-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform -rotate-3 hover:scale-[1.02] transition-transform duration-300 rounded-2xl">
                <div className="w-full h-full overflow-hidden rounded-xl">
                  <img
                    src={config.featuredCollections[0].image}
                    alt={config.featuredCollections[0].title}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              
              {/* 第二张图片 */}
              <div className="absolute right-[15%] top-[10%] w-[90%] aspect-[4/3] bg-gradient-to-br from-gray-50 to-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform rotate-2 hover:scale-[1.02] transition-transform duration-300 rounded-2xl">
                <div className="w-full h-full overflow-hidden rounded-xl">
                  <img
                    src={config.featuredCollections[1].image}
                    alt={config.featuredCollections[1].title}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              
              {/* 第三张图片 */}
              <div className="absolute right-[30%] top-[20%] w-[90%] aspect-[4/3] bg-gradient-to-br from-gray-50 to-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform -rotate-1 hover:scale-[1.02] transition-transform duration-300 rounded-2xl">
                <div className="w-full h-full overflow-hidden rounded-xl">
                  <img
                    src={config.featuredCollections[2].image}
                    alt={config.featuredCollections[2].title}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* 第四张图片 */}
              <div className="absolute right-[5%] top-[30%] w-[85%] aspect-[4/3] bg-gradient-to-br from-gray-50 to-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform rotate-3 hover:scale-[1.02] transition-transform duration-300 rounded-2xl">
                <div className="w-full h-full overflow-hidden rounded-xl">
                  <img
                    src={config.featuredCollections[0].image}
                    alt={config.featuredCollections[0].title}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* 第五张图片 */}
              <div className="absolute right-[25%] top-[5%] w-[85%] aspect-[4/3] bg-gradient-to-br from-gray-50 to-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform -rotate-2 hover:scale-[1.02] transition-transform duration-300 rounded-2xl">
                <div className="w-full h-full overflow-hidden rounded-xl">
                  <img
                    src={config.featuredCollections[1].image}
                    alt={config.featuredCollections[1].title}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* 第六张图片 */}
              <div className="absolute right-[40%] top-[15%] w-[85%] aspect-[4/3] bg-gradient-to-br from-gray-50 to-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform rotate-1 hover:scale-[1.02] transition-transform duration-300 rounded-2xl">
                <div className="w-full h-full overflow-hidden rounded-xl">
                  <img
                    src={config.featuredCollections[2].image}
                    alt={config.featuredCollections[2].title}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* 右侧介绍区域 */}
            <div className="flex flex-col justify-center relative z-20 mt-8 md:mt-0">
              <h2 className="text-3xl md:text-4xl font-light mb-3 md:mb-4 text-gray-900">
                {config.hero.title}
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 italic">
                {config.hero.subtitle}
              </p>
              <Link
                href={config.featuredCollections[0].link}
                className="inline-flex items-center justify-center px-6 py-3 md:py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors w-fit text-base md:text-sm"
              >
                {config.hero.cta.primary}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <Footer />
    </div>
  )
} 