import React from 'react';
import { MessageCircle, Heart, Shield, Users } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            How Balsam Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Balsam provides a safe space for users to share their feelings, track their emotions, 
            and receive supportive suggestions — all in one easy-to-use app.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-4 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" 
                  alt="Person using mental health app on phone" 
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div>
                <img 
                  src="https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" 
                  alt="Peaceful therapy session" 
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>

          <div className="text-center group">
            <div className="mb-6 flex justify-center">
              <div className="p-4 bg-gradient-to-br from-sky-100 to-sky-200 rounded-full group-hover:from-sky-200 group-hover:to-sky-300 transition-all duration-300 transform group-hover:scale-110">
                <MessageCircle className="h-8 w-8 text-sky-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Share Your Feelings</h3>
            <p className="text-gray-600 leading-relaxed">
              Express yourself in a judgment-free environment through our intuitive chat interface.
            </p>
          </div>

          <div className="text-center group">
            <div className="mb-6 flex justify-center">
              <div className="p-4 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full group-hover:from-emerald-200 group-hover:to-emerald-300 transition-all duration-300 transform group-hover:scale-110">
                <Heart className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Track Emotions</h3>
            <p className="text-gray-600 leading-relaxed">
              Monitor your mental wellness journey with personalized insights and progress tracking.
            </p>
          </div>

          <div className="text-center group">
            <div className="mb-6 flex justify-center">
              <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full group-hover:from-purple-200 group-hover:to-purple-300 transition-all duration-300 transform group-hover:scale-110">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Support</h3>
            <p className="text-gray-600 leading-relaxed">
              Receive personalized guidance and supportive suggestions tailored to your needs.
            </p>
          </div>

          <div className="text-center group">
            <div className="mb-6 flex justify-center">
              <div className="p-4 bg-gradient-to-br from-rose-100 to-rose-200 rounded-full group-hover:from-rose-200 group-hover:to-rose-300 transition-all duration-300 transform group-hover:scale-110">
                <Users className="h-8 w-8 text-rose-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Build Community</h3>
            <p className="text-gray-600 leading-relaxed">
              Connect with others on similar journeys while maintaining complete privacy and security.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}