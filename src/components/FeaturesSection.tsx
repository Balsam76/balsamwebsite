import React from 'react';
import { Lock, MessageSquare, Clock, CreditCard } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Lock,
      title: 'Private & Secure Conversations',
      description: 'Your conversations are encrypted and completely private. We prioritize your security and confidentiality above all else.',
      gradient: 'from-sky-500 to-sky-600',
      bgGradient: 'from-sky-50 to-sky-100'
    },
    {
      icon: MessageSquare,
      title: 'Chat-Based Interface',
      description: 'Simple, intuitive chat experience that feels natural and comfortable. No complex forms or overwhelming interfaces.',
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100'
    },
    {
      icon: Clock,
      title: 'Always Accessible',
      description: 'Available 24/7 whenever you need support. Your mental health companion is always there when you need it most.',
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100'
    },
    {
      icon: CreditCard,
      title: 'Flexible Pricing',
      description: 'Start with our free plan and upgrade when ready. Affordable subscription options that make mental health care accessible.',
      gradient: 'from-rose-500 to-rose-600',
      bgGradient: 'from-rose-50 to-rose-100'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Why Choose Balsam?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We've designed every feature with your mental wellness and peace of mind in focus.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:gap-8">
          <div className="col-span-2 mb-12">
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop" 
                alt="Mental wellness and self-care concept" 
                className="w-full h-40 sm:h-64 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-sky-600/80 to-emerald-600/80 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2">Your Mental Health Matters</h3>
                  <p className="text-sm sm:text-lg opacity-90">Take the first step towards better well-being</p>
                </div>
              </div>
            </div>
          </div>

          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.bgGradient} mb-6`}>
                  <Icon className={`h-8 w-8 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}