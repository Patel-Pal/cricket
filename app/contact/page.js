'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Send, ArrowLeft } from 'lucide-react';

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">

        {/* Back Button */}
        <Link href="/players/register" className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors mb-6">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Registration</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-green-400 text-sm font-semibold mb-2">TPL</p>
          <h1 className="text-white text-2xl sm:text-3xl font-bold mb-3">Contact Us</h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Thank you for visiting TPL. We are here to help with tournament registrations, payments, support, and account-related queries.
          </p>
        </div>

        {/* Support Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            </div>
            <h3 className="text-white font-semibold mb-1">Customer Support</h3>
            <p className="text-gray-400 text-sm">Account, registrations, and platform usage queries.</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <h3 className="text-white font-semibold mb-1">Business Enquiries</h3>
            <p className="text-gray-400 text-sm">Partnerships, sponsorships, and collaboration.</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </div>
            <h3 className="text-white font-semibold mb-1">Technical Support</h3>
            <p className="text-gray-400 text-sm">Payment issues, login problems, and technical help.</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
            </div>
            <h3 className="text-white font-semibold mb-1">Tournament Registration Help</h3>
            <p className="text-gray-400 text-sm">Team registration, player onboarding, and event participation.</p>
          </div>
        </div>

        {/* Contact Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-green-500 rounded"></div>
              <h2 className="text-white font-bold text-lg">Get In Touch</h2>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-green-400" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Email</p>
                <p className="text-green-400 text-sm">support@tpl.devinpro.co.in</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-green-400" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Phone</p>
                <p className="text-green-400 text-sm">+91 99999 99999</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-green-400" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Address</p>
                <p className="text-gray-400 text-sm">Ahmedabad, Gujarat, India</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock size={18} className="text-green-400" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Business Hours</p>
                <p className="text-gray-400 text-sm">Monday to Saturday</p>
                <p className="text-gray-400 text-sm">10:00 AM to 6:00 PM IST</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 sm:p-6">
            <h3 className="text-white font-bold text-lg mb-5">Send Us a Message</h3>
            <form className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Email Address *</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none text-sm"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Message *</label>
                <textarea
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none text-sm resize-none"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Trust Line */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 text-center">
          <p className="text-green-400 font-semibold text-sm mb-1">We aim to respond within 24-48 business hours.</p>
          <p className="text-gray-500 text-xs">Your queries are important to us and will be handled with priority.</p>
        </div>

        {/* Footer Links */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <Link href="/contact" className="hover:text-green-400 transition-colors">Contact Us</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-green-400 transition-colors">Terms & Conditions</Link>
            <span>•</span>
            <Link href="/refund" className="hover:text-green-400 transition-colors">Refund Policy</Link>
          </div>
          <p className="text-gray-600 text-xs mt-3">© 2025 TPL - Tournament Registration Platform. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}