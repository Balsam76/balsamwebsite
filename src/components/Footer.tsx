import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-full">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                Balsam
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Your trusted companion for mental wellness. We're here to support your journey 
              towards better mental health with privacy, security, and care.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <div className="space-y-4">
              <a href="/contact.html" className="block text-gray-300 hover:text-white transition-colors duration-200">
                Contact Us
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Legal</h3>
            <div className="space-y-4">
              <a href="/privacy-policy.html" className="block text-gray-300 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="/terms-of-service.html" className="block text-gray-300 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Balsam. All Rights Reserved. | Made with ❤️ for mental wellness.
          </p>
        </div>
      </div>
    </footer>
  );
}