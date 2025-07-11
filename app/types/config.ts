export interface Category {
  title: string
  description: string
  detail?: string
  albums: Album[]
}

export interface Album {
  id: string
  title: string
  description: string
  detail?: string
  coverImage: string
  photoCount: number
  createdAt: string
  photos: Photo[]
}

export interface Photo {
  id: string
  url: string
  alt?: string
  title: string
  description: string
}

export interface GalleryConfig {
  categories: {
    [key: string]: Category
  }
}

export interface HeroSection {
  title: string
  subtitle: string
  description: string
  backgroundImage: string
  ctaText: string
  ctaLink: string
}

export interface FeaturedCollection {
  id: string
  title: string
  description: string
  image: string
  link: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export interface Testimonial {
  id: string
  content: string
  author: string
  role: string
}

export interface HomeConfig {
  hero: {
    title: string
    subtitle: string
    description: string
    cta: {
      primary: string
      secondary: string
    }
    backgroundImage: string
  }
  featuredCollections: FeaturedCollection[]
  services: Service[]
  testimonials: Testimonial[]
} 