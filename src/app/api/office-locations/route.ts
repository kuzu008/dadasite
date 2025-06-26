import { NextResponse } from 'next/server';
import { getOfficeLocations } from '@/lib/notion';
import { transformOfficeLocations } from '@/lib/notion-transformer';

export async function GET() {
  try {
    const data = await getOfficeLocations();
    
    if (!data || data.length === 0) {
      return NextResponse.json([]);
    }

    const offices = transformOfficeLocations(data);
    
    // 按照order字段排序，总部优先
    offices.sort((a, b) => {
      if (a.isHeadquarters && !b.isHeadquarters) return -1;
      if (!a.isHeadquarters && b.isHeadquarters) return 1;
      return a.order - b.order;
    });
    
    return NextResponse.json(offices);
  } catch (error) {
    console.error('Error fetching office locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch office locations' },
      { status: 500 }
    );
  }
} 