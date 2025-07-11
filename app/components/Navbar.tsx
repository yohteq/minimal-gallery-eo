'use client'

import Link from 'next/link'
import { useRef } from 'react'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Nature', href: '/gallery/nature' },
  { name: 'Urban', href: '/gallery/urban' },
  { name: 'Travel', href: '/gallery/travel' },
  { name: 'Architecture', href: '/gallery/architecture' },
]

export default function Navbar() {
  const mobileMenuRef = useRef<HTMLInputElement>(null)

  const handleMobileMenuClick = () => {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.checked = false
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-800">
            Gallery
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <label htmlFor="mobile-menu" className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer">
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        </div>

        {/* Mobile Menu Checkbox (hidden) */}
        <input 
          type="checkbox" 
          id="mobile-menu" 
          className="hidden peer" 
          ref={mobileMenuRef}
        />

        {/* Mobile Menu */}
        <div className="md:hidden absolute left-0 right-0 bg-white shadow-lg transform transition-all duration-300 ease-in-out max-h-0 peer-checked:max-h-96 overflow-hidden">
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-600 hover:text-gray-900 transition-colors"
                onClick={handleMobileMenuClick}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
} 