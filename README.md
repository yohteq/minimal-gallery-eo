# Nimmal Gallery

Nimmal Gallery is a modern image showcase website template built with Next.js. It provides an elegant interface to display your photography works, supporting category display, album management, and responsive design.

## Quick Deploy

You can quickly deploy to Tencent Cloud EdgeOne using the button below:

[![Deploy to Tencent Cloud](https://img.shields.io/badge/Deploy%20to-Tencent%20Cloud-blue)](https://edgeone.ai/pages/new?template=https://github.com/tomcomtang/nimmal-gallery&output-directory=./out&build-command=npm%20run%20build&install-command=npm%20install)

## Live Demo

🌐 **Online Preview**: [https://minimal-gallery.edgeone.app/](https://minimal-gallery.edgeone.app/)

## Website Content Configuration

### Homepage Content

1. Navigate to `app/config/home.json`
2. Modify the content according to your needs:
   ```json
   {
     "hero": {
       "title": "Your Title",
       "subtitle": "Your Subtitle",
       "description": "Your Description",
       "cta": {
         "primary": "Primary Button Text",
         "secondary": "Secondary Button Text"
       },
       "backgroundImage": "/images/hero-bg.jpg"
     },
     "featuredCollections": [
       {
         "id": "collection-1",
         "title": "Collection Title",
         "description": "Collection Description",
         "image": "/images/collection-1.jpg",
         "link": "/gallery/category"
       }
     ],
     "services": [
       {
         "id": "service-1",
         "title": "Service Title",
         "description": "Service Description",
         "icon": "icon-name"
       }
     ],
     "testimonials": [
       {
         "id": "testimonial-1",
         "content": "Testimonial Content",
         "author": "Author Name",
         "role": "Author Role"
       }
     ]
   }
   ```

### Gallery Content

1. Navigate to `app/config/gallery.json`
2. Modify the content according to your needs:
   ```json
   {
     "categories": {
       "nature": {
         "title": "Nature",
         "description": "Nature Photography Collection",
         "albums": [
           {
             "id": "nature-1",
             "title": "Mountain Majesty",
             "description": "Capturing the majestic beauty of mountain landscapes",
             "coverImage": "/images/gallery/nature/your-image.jpg",
             "photoCount": 4,
             "createdAt": "2024-03-15",
             "photos": [
               {
                 "id": "photo-1",
                 "url": "/images/gallery/nature/photo1.jpg",
                 "title": "Photo Title",
                 "description": "Photo Description"
               }
             ]
           }
         ]
       }
     }
   }
   ```

## Image Resources

### Download Default Images

1. Visit [Unsplash](https://unsplash.com/) to download your preferred images
2. Place the images in the `public/images/gallery` directory following this structure:
   ```
   public/images/gallery/
   ├── nature/
   ├── urban/
   ├── travel/
   └── architecture/
   ```

## Project Structure

```
nimmal-gallery/
├── app/                    # Next.js application directory
│   ├── components/        # Reusable components
│   ├── config/           # Configuration files
│   ├── gallery/          # Gallery related pages
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── public/               # Static assets
│   └── images/          # Image resources
└── out/                 # Build output directory
```

## Local Development

1. Clone the repository

   ```bash
   git clone https://github.com/tomcomtang/nimmal-gallery.git
   cd nimmal-gallery
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start development server

   ```bash
   npm run dev
   ```

4. Build the project

   ```bash
   npm run build
   ```

5. Preview the build
   ```bash
   npm run start
   ```

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- ESLint
- Prettier

## License

MIT License
