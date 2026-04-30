'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsAndConditionsPage() {
  const sections = [
    {
      number: '1',
      title: 'Acceptance of Terms',
      content: (
        <>
          <p>By accessing, browsing, or using the TPL platform (accessible at https://tpl.devinpro.co.in), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
          <p>If you do not agree with any part of these terms, you must not use our platform or services. These terms apply to all users, including visitors, registered users, team managers, and tournament participants.</p>
        </>
      ),
    },
    {
      number: '2',
      title: 'Services Provided',
      content: (
        <>
          <p>TPL is a sports event management and tournament registration platform. Our services include:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 mt-2">
            <li>Tournament registration and team onboarding</li>
            <li>Player registration and profile management</li>
            <li>Participation fee collection through authorized payment gateways</li>
            <li>Tournament scheduling and event management</li>
            <li>Team and player information management</li>
            <li>Communication of event updates and notifications</li>
          </ul>
          <p className="mt-3">We act as a technology platform facilitating sports event management and do not organize or conduct the sporting events ourselves unless explicitly stated.</p>
        </>
      ),
    },
    {
      number: '3',
      title: 'User Eligibility',
      content: (
        <>
          <p>To use our platform, you must:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 mt-2">
            <li>Be at least 18 years of age, or have parental/guardian consent if under 18</li>
            <li>Provide accurate, current, and complete information during registration</li>
            <li>Maintain the accuracy of your information and update it as necessary</li>
            <li>Be legally capable of entering into binding agreements</li>
          </ul>
          <p className="mt-3">You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
        </>
      ),
    },
    {
      number: '4',
      title: 'Registration Fees & Payments',
      content: (
        <>
          <p>Certain services on our platform require payment of registration or participation fees. By making a payment, you agree to the following:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 mt-2">
            <li>All payments are processed securely through authorized payment gateways (such as Razorpay or Cashfree)</li>
            <li>You agree to pay all fees and charges associated with your registration</li>
            <li>All fees are displayed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise</li>
            <li>Payment confirmation will be sent to your registered email address</li>
            <li>TPL does not store your payment card details on our servers</li>
          </ul>
          <p className="mt-3">In case of payment failures or discrepancies, please contact our support team with your transaction details.</p>
        </>
      ),
    },
    {
      number: '5',
      title: 'Refund Rules',
      content: (
        <>
          <p>Refunds are governed by our <Link href="/refund" className="text-green-400 hover:underline">Refund Policy</Link>. Key points include:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 mt-2">
            <li>Registration fees are generally non-refundable once confirmed</li>
            <li>Duplicate payments will be refunded after verification</li>
            <li>Refunds for cancelled events are processed as per the refund policy</li>
            <li>Technical payment failures are handled on a case-by-case basis</li>
          </ul>
          <p className="mt-3">Please refer to our complete Refund Policy page for detailed information.</p>
        </>
      ),
    },
    {
      number: '6',
      title: 'User Conduct',
      content: (
        <>
          <p>While using our platform, you agree not to:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 mt-2">
            <li>Submit false, misleading, or fraudulent registration information</li>
            <li>Create fake accounts or register on behalf of others without authorization</li>
            <li>Engage in abusive, threatening, or harassing behavior towards other users or staff</li>
            <li>Attempt to manipulate, hack, or disrupt the platform&apos;s functionality</li>
            <li>Use the platform for any unlawful purpose</li>
            <li>Violate any applicable local, state, national, or international law</li>
          </ul>
          <p className="mt-3">Violation of these conduct guidelines may result in immediate suspension or termination of your account without prior notice.</p>
        </>
      ),
    },
    {
      number: '7',
      title: 'Platform Rights',
      content: (
        <>
          <p>TPL reserves the right to:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 mt-2">
            <li>Suspend or terminate accounts found to be involved in fraudulent activities</li>
            <li>Refuse service to any user at our sole discretion</li>
            <li>Modify, suspend, or discontinue any part of the platform with or without notice</li>
            <li>Remove content that violates these terms or is deemed inappropriate</li>
            <li>Investigate and take appropriate action against violations of these terms</li>
          </ul>
        </>
      ),
    },
    {
      number: '8',
      title: 'Intellectual Property',
      content: (
        <>
          <p>All content on the TPL platform, including but not limited to text, graphics, logos, images, software, and design elements, is the property of TPL or its licensors and is protected by applicable intellectual property laws.</p>
          <p className="mt-3">You may not reproduce, distribute, modify, create derivative works from, publicly display, or exploit any content from our platform without prior written consent from TPL.</p>
          <p className="mt-3">Any content you submit to the platform (such as player photos or team information) remains your property, but you grant TPL a non-exclusive license to use it for platform operations and event management purposes.</p>
        </>
      ),
    },
    {
      number: '9',
      title: 'Limitation of Liability',
      content: (
        <>
          <p>To the maximum extent permitted by applicable law:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 mt-2">
            <li>TPL shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform</li>
            <li>We do not guarantee uninterrupted or error-free operation of the platform</li>
            <li>TPL is not responsible for any loss or damage resulting from unauthorized access to your account</li>
            <li>Our total liability shall not exceed the amount paid by you for the specific service in question</li>
          </ul>
          <p className="mt-3">The platform is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, either express or implied.</p>
        </>
      ),
    },
    {
      number: '10',
      title: 'Changes to Terms',
      content: (
        <>
          <p>TPL reserves the right to update or modify these Terms and Conditions at any time without prior notice. Changes will be effective immediately upon posting on this page.</p>
          <p className="mt-3">We encourage you to review these terms periodically. Your continued use of the platform after any changes constitutes your acceptance of the revised terms.</p>
        </>
      ),
    },
    {
      number: '11',
      title: 'Contact Information',
      content: (
        <>
          <p>If you have any questions regarding these Terms and Conditions, please contact us:</p>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-3 space-y-2">
            <p><span className="text-white font-medium">Email:</span> <span className="text-green-400">support@tpl.devinpro.co.in</span></p>
            <p><span className="text-white font-medium">Phone:</span> <span className="text-green-400">+91 99999 99999</span></p>
            <p><span className="text-white font-medium">Address:</span> <span className="text-gray-400">Ahmedabad, Gujarat, India</span></p>
            <p><span className="text-white font-medium">Business Hours:</span> <span className="text-gray-400">Monday to Saturday, 10:00 AM to 6:00 PM IST</span></p>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl">

        {/* Back Button */}
        <Link href="/players/register" className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors mb-6">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Registration</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-green-400 text-sm font-semibold mb-2">TPL</p>
          <h1 className="text-white text-2xl sm:text-3xl font-bold mb-3">Terms and Conditions</h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            Please read these terms carefully before using our platform. By accessing or using TPL, you agree to be bound by these terms.
          </p>
          <p className="text-gray-500 text-xs mt-2">Last Updated: April 2025</p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.number} className="bg-gray-800 border border-gray-700 rounded-lg p-5 sm:p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-7 h-7 bg-green-500/20 text-green-400 rounded-md flex items-center justify-center font-bold text-xs">
                  {section.number}
                </span>
                <h2 className="text-white font-bold text-base sm:text-lg">{section.title}</h2>
              </div>
              <div className="ml-10 text-gray-400 text-sm leading-relaxed space-y-2">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Governing Law */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-5 mt-8">
          <h3 className="text-white font-bold text-sm mb-2">Governing Law</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Ahmedabad, Gujarat, India.
          </p>
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