import React from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm fixed w-full top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <a href="/" className="flex items-center" aria-label="Balsam Home">
              <img src="/balsam-logo.png" alt="Balsam" className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain" />
            </a>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-600 hover:text-sky-600 transition-colors duration-200 font-medium">
              About
            </a>
            <a href="#features" className="text-gray-600 hover:text-sky-600 transition-colors duration-200 font-medium">
              Features
            </a>
            <a href="/contact.html" className="text-gray-600 hover:text-sky-600 transition-colors duration-200 font-medium">
              Contact
            </a>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden bg-white border-t border-gray-100`}>
        <nav className="px-4 py-4 space-y-4">
          <a href="#about" className="block text-gray-600 hover:text-sky-600 transition-colors duration-200 font-medium">
            About
          </a>
          <a href="#features" className="block text-gray-600 hover:text-sky-600 transition-colors duration-200 font-medium">
            Features
          </a>
          <a href="/contact.html" className="block text-gray-600 hover:text-sky-600 transition-colors duration-200 font-medium">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}