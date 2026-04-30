'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RefundPolicyPage() {
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
          <h1 className="text-white text-2xl sm:text-3xl font-bold mb-3">Refund Policy</h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            We believe in transparency and fairness. Please review our refund policy to understand how we handle refund requests for tournament registrations and payments.
          </p>
          <p className="text-gray-500 text-xs mt-2">Last Updated: April 2025</p>
        </div>

        {/* Section 1 */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 sm:p-6 mb-5">
          <div className="flex items-start gap-3 mb-3">
            <span className="flex-shrink-0 w-7 h-7 bg-green-500/20 text-green-400 rounded-md flex items-center justify-center font-bold text-xs">1</span>
            <h2 className="text-white font-bold text-base sm:text-lg">Tournament Registration Fees</h2>
          </div>
          <div className="ml-10 text-gray-400 text-sm leading-relaxed space-y-2">
            <p>Registration fees paid for tournament participation are considered confirmed once the payment is successfully processed and the registration is approved.</p>
            <p><span className="text-white font-medium">Policy:</span> Registration fees, once confirmed, are generally <span className="text-white font-medium">non-refundable</span> unless the tournament or event is cancelled by the organizer.</p>
            <p>This policy exists because tournament slots are limited and confirmed registrations block availability for other participants. We encourage users to confirm their availability before completing registration.</p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 sm:p-6 mb-5">
          <div className="flex items-start gap-3 mb-3">
            <span className="flex-shrink-0 w-7 h-7 bg-blue-500/20 text-blue-400 rounded-md flex items-center justify-center font-bold text-xs">2</span>
            <h2 className="text-white font-bold text-base sm:text-lg">Duplicate Payment</h2>
          </div>
          <div className="ml-10 text-gray-400 text-sm leading-relaxed space-y-2">
            <p>In the event that a user is charged more than once for the same registration due to a technical error or payment gateway issue:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>The duplicate transaction amount will be refunded in full after verification</li>
              <li>Refund will be processed within <span className="text-white font-medium">7-10 business days</span> from the date of verification</li>
              <li>The refund will be credited to the original payment method used</li>
            </ul>
            <p>Please contact our support team with your transaction details for quick resolution.</p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 sm:p-6 mb-5">
          <div className="flex items-start gap-3 mb-3">
            <span className="flex-shrink-0 w-7 h-7 bg-purple-500/20 text-purple-400 rounded-md flex items-center justify-center font-bold text-xs">3</span>
            <h2 className="text-white font-bold text-base sm:text-lg">Cancelled Tournament</h2>
          </div>
          <div className="ml-10 text-gray-400 text-sm leading-relaxed space-y-2">
            <p>If a tournament or event is cancelled by the organizer or by TPL due to unforeseen circumstances:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Eligible participants may receive a full or partial refund of their registration fees</li>
              <li>Refund eligibility and amount will be determined based on the timing of cancellation and expenses already incurred</li>
              <li>Affected participants will be notified via email and/or SMS regarding the cancellation and refund process</li>
              <li>Alternatively, participants may be offered the option to transfer their registration to a rescheduled event</li>
            </ul>
          </div>
        </div>

        {/* Section 4 */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 sm:p-6 mb-5">
          <div className="flex items-start gap-3 mb-3">
            <span className="flex-shrink-0 w-7 h-7 bg-orange-500/20 text-orange-400 rounded-md flex items-center justify-center font-bold text-xs">4</span>
            <h2 className="text-white font-bold text-base sm:text-lg">Technical Payment Failure</h2>
          </div>
          <div className="ml-10 text-gray-400 text-sm leading-relaxed space-y-2">
            <p>If money is deducted from your account but the registration is not confirmed due to a technical failure:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>The amount will be refunded after reconciliation with our payment gateway partner</li>
              <li>Reconciliation typically takes <span className="text-white font-medium">3-5 business days</span></li>
              <li>If the amount is not auto-refunded, please raise a support request with your transaction ID</li>
              <li>Our team will investigate and process the refund within 7-10 business days</li>
            </ul>
            <p>We recommend waiting 24-48 hours before raising a support request, as many failed transactions are automatically reversed by the payment gateway.</p>
          </div>
        </div>

        {/* Section 5 */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 sm:p-6 mb-5">
          <div className="flex items-start gap-3 mb-3">
            <span className="flex-shrink-0 w-7 h-7 bg-teal-500/20 text-teal-400 rounded-md flex items-center justify-center font-bold text-xs">5</span>
            <h2 className="text-white font-bold text-base sm:text-lg">Refund Processing Time</h2>
          </div>
          <div className="ml-10 text-gray-400 text-sm leading-relaxed space-y-2">
            <p>Once a refund is approved and initiated:</p>
            <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden mt-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2.5 px-4 text-white font-medium">Payment Method</th>
                    <th className="text-left py-2.5 px-4 text-white font-medium">Processing Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="py-2.5 px-4 text-gray-400">UPI / Wallet</td>
                    <td className="py-2.5 px-4 text-gray-400">3-5 business days</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2.5 px-4 text-gray-400">Debit / Credit Card</td>
                    <td className="py-2.5 px-4 text-gray-400">5-7 business days</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2.5 px-4 text-gray-400">Net Banking</td>
                    <td className="py-2.5 px-4 text-gray-400">7-10 business days</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-gray-400">Other Methods</td>
                    <td className="py-2.5 px-4 text-gray-400">7-10 business days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3">Processing times may vary depending on your bank or payment partner. TPL is not responsible for delays caused by third-party financial institutions.</p>
          </div>
        </div>

        {/* Section 6 */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 sm:p-6 mb-5">
          <div className="flex items-start gap-3 mb-3">
            <span className="flex-shrink-0 w-7 h-7 bg-indigo-500/20 text-indigo-400 rounded-md flex items-center justify-center font-bold text-xs">6</span>
            <h2 className="text-white font-bold text-base sm:text-lg">How to Request a Refund</h2>
          </div>
          <div className="ml-10 text-gray-400 text-sm leading-relaxed space-y-2">
            <p>To request a refund, please send an email to <span className="text-green-400 font-medium">support@tpl.devinpro.co.in</span> with the following details:</p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-3 space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span><span className="text-white font-medium">Full Name</span> — as registered on the platform</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span><span className="text-white font-medium">Registered Mobile Number</span> — linked to your account</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span><span className="text-white font-medium">Transaction ID</span> — from your payment confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span><span className="text-white font-medium">Reason for Refund</span> — brief description of your request</span>
              </div>
            </div>
            <p className="mt-3">Our support team will review your request and respond within <span className="text-white font-medium">24-48 business hours</span> with the status of your refund.</p>
          </div>
        </div>

        {/* Section 7 */}
        <div className="bg-gray-800 border border-red-500/30 rounded-lg p-5 sm:p-6 mb-5">
          <div className="flex items-start gap-3 mb-3">
            <span className="flex-shrink-0 w-7 h-7 bg-red-500/20 text-red-400 rounded-md flex items-center justify-center font-bold text-xs">7</span>
            <h2 className="text-white font-bold text-base sm:text-lg">Non-Refundable Cases</h2>
          </div>
          <div className="ml-10 text-gray-400 text-sm leading-relaxed space-y-2">
            <p>Refunds will <span className="text-white font-medium">not</span> be provided in the following circumstances:</p>
            <div className="space-y-2.5 mt-3">
              <div className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">✕</span>
                <span><span className="text-white font-medium">Late Withdrawals:</span> Withdrawing from a tournament after the registration deadline has passed</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">✕</span>
                <span><span className="text-white font-medium">No-Show:</span> Failure to attend or participate in the registered tournament without prior notice</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">✕</span>
                <span><span className="text-white font-medium">Rule Violations:</span> Disqualification due to violation of tournament rules, code of conduct, or platform terms</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">✕</span>
                <span><span className="text-white font-medium">Fraudulent Activity:</span> Accounts involved in fraudulent registrations or misuse of the platform</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">✕</span>
                <span><span className="text-white font-medium">Change of Mind:</span> Personal decision to not participate after successful registration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-5 mt-8">
          <h3 className="text-white font-bold text-sm mb-2">Important Note</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            TPL reserves the right to modify this Refund Policy at any time. Any changes will be posted on this page with an updated revision date. For any refund-related queries, please contact us at <span className="text-green-400">support@tpl.devinpro.co.in</span>. We are committed to resolving all payment-related concerns promptly and fairly.
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