import { Resend } from 'resend';

let resend;

const getResend = () => {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
};

const ADMIN_EMAIL = 'patelpal.93130@gmail.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@devinpro.co.in';

// ─── Admin notification ───────────────────────────────────────────────────────
export const sendPlayerRegistrationEmail = async ({ playerName, mobile, category, amount, paymentId }) => {
  const amountInRupees = (amount / 100).toLocaleString('en-IN');

  await getResend().emails.send({
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

// ─── Player confirmation email ────────────────────────────────────────────────
export const sendPlayerConfirmationEmail = async ({ playerName, playerEmail, mobile, category, battingStyle, bowlingStyle, amount, paymentId }) => {
  const amountInRupees = (amount / 100).toLocaleString('en-IN');

  const categoryLabel = {
    batsman: 'Batsman',
    bowler: 'Bowler',
    allrounder: 'All-Rounder',
    wicketkeeper: 'Wicket Keeper',
  }[category] || category;

  const battingLabel = {
    'right-hand': 'Right Hand',
    'left-hand': 'Left Hand',
    'none': '—',
  }[battingStyle] || battingStyle;

  const bowlingLabel = {
    'right-arm-fast': 'Right Arm Fast',
    'left-arm-fast': 'Left Arm Fast',
    'right-arm-spin': 'Right Arm Spin',
    'left-arm-spin': 'Left Arm Spin',
    'none': '—',
  }[bowlingStyle] || bowlingStyle;

  await getResend().emails.send({
    from: FROM_EMAIL,
    to: playerEmail,
    subject: `Welcome to TPL Season 3, ${playerName}! 🏏`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0f172a;font-family:'Segoe UI',Arial,sans-serif;">

  <div style="max-width:620px;margin:0 auto;padding:32px 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#14532d 0%,#166534 50%,#15803d 100%);border-radius:16px 16px 0 0;padding:40px 32px;text-align:center;position:relative;overflow:hidden;">
      <div style="position:absolute;top:-20px;right:-20px;width:120px;height:120px;background:rgba(255,255,255,0.05);border-radius:50%;"></div>
      <div style="position:absolute;bottom:-30px;left:-30px;width:160px;height:160px;background:rgba(255,255,255,0.03);border-radius:50%;"></div>
      <p style="margin:0 0 8px 0;color:#86efac;font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">Taluka Premier League</p>
      <h1 style="margin:0 0 4px 0;color:#ffffff;font-size:32px;font-weight:800;line-height:1.2;">Season 3</h1>
      <p style="margin:16px 0 0 0;color:#bbf7d0;font-size:15px;">🏏 &nbsp;Registration Confirmed&nbsp; 🏏</p>
    </div>

    <!-- Green divider stripe -->
    <div style="height:4px;background:linear-gradient(90deg,#16a34a,#4ade80,#16a34a);"></div>

    <!-- Body -->
    <div style="background:#1e293b;padding:36px 32px;">

      <!-- Greeting -->
      <h2 style="margin:0 0 8px 0;color:#f1f5f9;font-size:22px;font-weight:700;">Welcome, ${playerName}! 🎉</h2>
      <p style="margin:0 0 24px 0;color:#94a3b8;font-size:15px;line-height:1.6;">
        You've successfully registered for <strong style="color:#4ade80;">Taluka Premier League Season 3</strong>. 
        Your payment has been received and your profile is now under review by our admin team.
      </p>

      <!-- Status badge -->
      <div style="background:#0f172a;border:1px solid #1e3a2f;border-radius:12px;padding:16px 20px;margin-bottom:28px;display:flex;align-items:center;">
        <div style="width:10px;height:10px;background:#facc15;border-radius:50%;margin-right:12px;flex-shrink:0;"></div>
        <div>
          <p style="margin:0;color:#fef08a;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Status: Pending Approval</p>
          <p style="margin:4px 0 0 0;color:#64748b;font-size:12px;">You'll be notified once your profile is approved for the auction.</p>
        </div>
      </div>

      <!-- Player details card -->
      <div style="background:#0f172a;border-radius:12px;overflow:hidden;margin-bottom:28px;">
        <div style="background:#14532d;padding:12px 20px;">
          <p style="margin:0;color:#86efac;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Your Registration Details</p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <tr style="border-bottom:1px solid #1e293b;">
            <td style="padding:14px 20px;color:#64748b;font-size:13px;width:45%;">Player Name</td>
            <td style="padding:14px 20px;color:#f1f5f9;font-size:13px;font-weight:600;">${playerName}</td>
          </tr>
          <tr style="border-bottom:1px solid #1e293b;">
            <td style="padding:14px 20px;color:#64748b;font-size:13px;">Mobile</td>
            <td style="padding:14px 20px;color:#f1f5f9;font-size:13px;font-weight:600;">${mobile}</td>
          </tr>
          <tr style="border-bottom:1px solid #1e293b;">
            <td style="padding:14px 20px;color:#64748b;font-size:13px;">Category</td>
            <td style="padding:14px 20px;font-size:13px;">
              <span style="background:#14532d;color:#86efac;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:700;">${categoryLabel}</span>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #1e293b;">
            <td style="padding:14px 20px;color:#64748b;font-size:13px;">Batting Style</td>
            <td style="padding:14px 20px;color:#f1f5f9;font-size:13px;font-weight:600;">${battingLabel}</td>
          </tr>
          <tr style="border-bottom:1px solid #1e293b;">
            <td style="padding:14px 20px;color:#64748b;font-size:13px;">Bowling Style</td>
            <td style="padding:14px 20px;color:#f1f5f9;font-size:13px;font-weight:600;">${bowlingLabel}</td>
          </tr>
          <tr style="border-bottom:1px solid #1e293b;">
            <td style="padding:14px 20px;color:#64748b;font-size:13px;">Amount Paid</td>
            <td style="padding:14px 20px;color:#4ade80;font-size:15px;font-weight:800;">₹${amountInRupees}</td>
          </tr>
          <tr>
            <td style="padding:14px 20px;color:#64748b;font-size:13px;">Payment ID</td>
            <td style="padding:14px 20px;color:#475569;font-size:11px;font-family:monospace;">${paymentId}</td>
          </tr>
        </table>
      </div>

      <!-- What's next -->
      <div style="margin-bottom:28px;">
        <p style="margin:0 0 16px 0;color:#cbd5e1;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">What Happens Next?</p>
        <div style="display:flex;flex-direction:column;gap:12px;">

          <div style="display:flex;align-items:flex-start;gap:14px;">
            <div style="width:28px;height:28px;background:#14532d;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#4ade80;font-size:13px;font-weight:800;text-align:center;line-height:28px;">1</div>
            <div>
              <p style="margin:0;color:#f1f5f9;font-size:13px;font-weight:600;">Profile Review</p>
              <p style="margin:2px 0 0 0;color:#64748b;font-size:12px;">Our admin team will review your registration details.</p>
            </div>
          </div>

          <div style="display:flex;align-items:flex-start;gap:14px;">
            <div style="width:28px;height:28px;background:#14532d;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#4ade80;font-size:13px;font-weight:800;text-align:center;line-height:28px;">2</div>
            <div>
              <p style="margin:0;color:#f1f5f9;font-size:13px;font-weight:600;">Approval & Auction Pool</p>
              <p style="margin:2px 0 0 0;color:#64748b;font-size:12px;">Once approved, you'll be added to the live auction pool.</p>
            </div>
          </div>

          <div style="display:flex;align-items:flex-start;gap:14px;">
            <div style="width:28px;height:28px;background:#14532d;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#4ade80;font-size:13px;font-weight:800;text-align:center;line-height:28px;">3</div>
            <div>
              <p style="margin:0;color:#f1f5f9;font-size:13px;font-weight:600;">Live Auction</p>
              <p style="margin:2px 0 0 0;color:#64748b;font-size:12px;">Team owners will bid for you in the live TPL Season 3 auction.</p>
            </div>
          </div>

        </div>
      </div>

      <!-- CTA -->
      <div style="text-align:center;margin-bottom:8px;">
        <p style="margin:0;color:#64748b;font-size:13px;">Questions? Reach out to us anytime.</p>
      </div>

    </div>

    <!-- Footer -->
    <div style="background:#0f172a;border-radius:0 0 16px 16px;padding:24px 32px;text-align:center;border-top:1px solid #1e293b;">
      <p style="margin:0 0 4px 0;color:#4ade80;font-size:15px;font-weight:800;letter-spacing:1px;">🏏 TALUKA PREMIER LEAGUE</p>
      <p style="margin:0 0 12px 0;color:#475569;font-size:12px;letter-spacing:2px;">SEASON 3 — 2025</p>
      <p style="margin:0;color:#334155;font-size:11px;">© 2025 TPL · All rights reserved</p>
    </div>

  </div>
</body>
</html>
    `,
  });
};
