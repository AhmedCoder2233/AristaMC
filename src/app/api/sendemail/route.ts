import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { username, email, rank, price } = await request.json();

    if (!username || !email || !rank || !price) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Email credentials not configured');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.verify();

    const referenceNumber = `ARISTA-${Math.floor(10000 + Math.random() * 90000)}`;
    const adminEmail = process.env.ADMIN_EMAIL || 'ahmedmemon3344@gmail.com';

    const mailOptions = {
      from: `AristaMC <${process.env.EMAIL_USER}>`,
      to: email,
      bcc: adminEmail,
      subject: `AristaMC Rank Purchase: ${rank}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h1 style="color: #6b46c1; font-size: 24px; margin-bottom: 20px;">
            Thank you for your purchase!
          </h1>
          <p style="margin-bottom: 20px;">
            Your <strong>${rank}</strong> rank is pending payment confirmation.
          </p>
          
          <h2 style="color: #6b46c1; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; font-size: 20px; margin-bottom: 15px;">
            Order Details
          </h2>
          <div style="margin-bottom: 20px;">
            <p><strong>Username:</strong> ${username}</p>
            <p><strong>Rank:</strong> ${rank}</p>
            <p><strong>Amount:</strong> ${price}</p>
            <p><strong>Reference:</strong> ${referenceNumber}</p>
          </div>
          
          <h2 style="color: #6b46c1; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; font-size: 20px; margin-bottom: 15px;">
            Payment Instructions
          </h2>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p>Please complete your payment via bank transfer:</p>
            <ul style="padding-left: 20px; margin-top: 10px;">
              <li><strong>Bank Name:</strong> Chase Bank</li>
              <li><strong>Account Name:</strong> AristaMC Inc.</li>
              <li><strong>Account Number:</strong> 1234567890</li>
              <li><strong>Amount:</strong> ${price}</li>
            </ul>
          </div>
          
          <p style="margin-bottom: 20px;">
            Once payment is received, your rank will be activated within 24 hours.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #718096;">
            <p>AristaMC Team</p>
            <p>If you have any questions, please reply to this email.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send email' 
      },
      { status: 500 }
    );
  }
}