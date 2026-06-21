import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { farmerId, message, type } = await request.json();

    if (!farmerId || !message) {
      return NextResponse.json({ error: "Missing farmerId or message" }, { status: 400 });
    }

    const farmer = await prisma.user.findUnique({
      where: { id: farmerId }
    });

    if (!farmer) {
      return NextResponse.json({ error: "Farmer not found" }, { status: 404 });
    }

    // Rate Limiting (Simple check: Max 3 SMS per day per user)
    // In production, use Redis or check the DB for SMS sent today
    
    // Simulate SMS dispatch via Exotel
    console.log(`[EXOTEL SMS TO ${farmer.phone}]: ${message}`);

    // Log the action for compliance/audit
    await prisma.auditLog.create({
      data: {
        action: `SMS_SENT_${type || 'GENERAL'}`,
        entityType: "User",
        entityId: farmer.id,
      }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("SMS Alert Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
