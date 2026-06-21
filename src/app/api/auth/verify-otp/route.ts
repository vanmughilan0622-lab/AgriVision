import { NextRequest, NextResponse } from 'next/server';
import { verifyOTP, signToken } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { phone, otp } = await request.json();
    
    // Verify OTP
    const isValid = await verifyOTP(phone, otp);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 401 });
    }
    
    // Create or update user
    let user = await prisma.user.findUnique({
      where: { phone }
    });
    
    const isNewUser = !user;
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          phone,
          role: "farmer",
          language: "hi" // default, user can change later
        }
      });
    }
    
    // Create session token
    const token = await signToken(user.id);
    
    return NextResponse.json({
      success: true,
      token,
      userId: user.id,
      isNewUser, // frontend can use this to route to Onboarding wizard
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
