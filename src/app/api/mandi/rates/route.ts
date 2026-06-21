import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const crop = searchParams.get('crop');
  const state = searchParams.get('state');

  try {
    // In production, this would hit agmarknet.gov.in API
    // GET /api/mandi/rates?crop=wheat&state=maharashtra
    
    // For MVP demonstration, return structured realistic data
    const mockData = {
      crop: crop || 'Wheat',
      state: state || 'Maharashtra',
      mandis: [
        {
          name: 'Pune APMC',
          minPrice: 2200,
          maxPrice: 2450,
          modalPrice: 2350,
          unit: 'quintal',
          trend: 'up',
          lastUpdated: new Date().toISOString()
        },
        {
          name: 'Nashik APMC',
          minPrice: 2150,
          maxPrice: 2400,
          modalPrice: 2300,
          unit: 'quintal',
          trend: 'stable',
          lastUpdated: new Date().toISOString()
        }
      ]
    };

    return NextResponse.json(mockData);

  } catch (error) {
    console.error("Mandi Rates Error:", error);
    return NextResponse.json({ error: "Failed to fetch Mandi rates" }, { status: 500 });
  }
}
