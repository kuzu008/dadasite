import { NextResponse } from 'next/server';
import { getCompanyInfo } from '@/lib/notion';
import { transformCompanyInfo } from '@/lib/notion-transformer';

export async function GET() {
  try {
    const data = await getCompanyInfo();
    
    if (!data) {
      return NextResponse.json(null);
    }

    const companyInfo = transformCompanyInfo(data);
    return NextResponse.json(companyInfo);
  } catch (error) {
    console.error('Error fetching company info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company info' },
      { status: 500 }
    );
  }
} 