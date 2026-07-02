import { execSync } from 'child_process';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const out = execSync('npx prisma db push --accept-data-loss', {
      encoding: 'utf-8',
      env: { ...process.env } // Pass down Vercel's runtime env variables!
    });
    return NextResponse.json({ success: true, message: "Migration completed!", output: out });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message, output: error.stdout?.toString() },
      { status: 500 }
    );
  }
}
