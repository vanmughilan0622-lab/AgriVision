import { NextRequest, NextResponse } from 'next/server';
import { storeOTP } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();
    
    // Validate phone (assuming Indian +91 format or just 10 digits for MVP testing)
    if (!phone || phone.length < 10) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }
    
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP in memory (replace with Redis in prod)
    await storeOTP(phone, otp);
    
    // Simulate SMS sending (replace with Exotel in prod)
    console.log(`[SIMULATED SMS to ${phone}]: Your AgriVision OTP is ${otp}. Valid for 5 minutes.`);
    
    return NextResponse.json({ success: true, expiresIn: 300 });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
