import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { deviceId, sensorType, value } = data;

    // Basic Validation
    if (!deviceId || !sensorType || value === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Outlier Validation
    if (sensorType === 'temperature' && (value < -10 || value > 60)) {
      return NextResponse.json({ error: "Temperature value out of plausible range" }, { status: 400 });
    }
    if (sensorType === 'humidity' && (value < 0 || value > 100)) {
      return NextResponse.json({ error: "Humidity value out of plausible range" }, { status: 400 });
    }

    // Verify Device
    const device = await prisma.sensorDevice.findUnique({
      where: { macAddress: deviceId }
    });

    if (!device) {
      // For MVP, we might auto-register or just reject
      return NextResponse.json({ error: "Unregistered device" }, { status: 403 });
    }

    // Store reading
    const reading = await prisma.sensorReading.create({
      data: {
        sensorDeviceId: device.id,
        sensorType,
        value,
        quality: 100,
      }
    });

    // Update last seen
    await prisma.sensorDevice.update({
      where: { id: device.id },
      data: { lastReadingAt: new Date(), status: 'active' }
    });

    return NextResponse.json({ success: true, readingId: reading.id });

  } catch (error) {
    console.error("Sensor Ingestion Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
