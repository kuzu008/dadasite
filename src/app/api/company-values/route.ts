import { NextResponse } from 'next/server';
import { getCompanyValues } from '@/lib/notion';
import { transformCompanyValues } from '@/lib/notion-transformer';

export async function GET() {
  try {
    const data = await getCompanyValues();
    
    if (!data || data.length === 0) {
      return NextResponse.json([]);
    }

    const companyValues = transformCompanyValues(data);
    
    // 按照order字段排序
    companyValues.sort((a, b) => a.order - b.order);
    
    return NextResponse.json(companyValues);
  } catch (error) {
    console.error('Error fetching company values:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company values' },
      { status: 500 }
    );
  }
} 