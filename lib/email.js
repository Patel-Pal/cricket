import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = 'patelpal.93130@gmail.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'ma-notification-center@resend.dev';

export const sendPlayerRegistrationEmail = async ({ playerName, mobile, category, amount, paymentId }) => {
  const amountInRupees = (amount / 100).toLocaleString('en-IN');

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Player Registered — ${playerName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 8px;">
        <div style="background: #16a34a; padding: 16px 24px; border-radius: 6px 6px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">🏏 New Player Registration</h1>
        </div>
        <div style="background: white; padding: 24px; border-radius: 0 0 6px 6px; border: 1px solid #e5e7eb;">
          <p style="color: #374151; margin-top: 0;">A new player has successfully registered and completed payment.</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Player Name</td>
              <td style="padding: 10px 0; color: #111827; font-weight: 600;">${playerName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Mobile</td>
              <td style="padding: 10px 0; color: #111827; font-weight: 600;">${mobile}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Category</td>
              <td style="padding: 10px 0; color: #111827; font-weight: 600; text-transform: capitalize;">${category}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Amount Paid</td>
              <td style="padding: 10px 0; color: #16a34a; font-weight: 700;">₹${amountInRupees}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Payment ID</td>
              <td style="padding: 10px 0; color: #111827; font-size: 13px; font-family: monospace;">${paymentId}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; color: #6b7280; font-size: 13px;">
            Please review and approve the player from the admin dashboard.
          </p>
        </div>
      </div>
    `,
  });
};
