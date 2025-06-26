import { NextResponse } from 'next/server';
import { getCompanyMilestones } from '@/lib/notion';
import { transformCompanyMilestones } from '@/lib/notion-transformer';

export async function GET() {
  try {
    const data = await getCompanyMilestones();
    
    if (!data || data.length === 0) {
      return NextResponse.json([]);
    }

    const milestones = transformCompanyMilestones(data);
    
    // 按照order字段排序
    milestones.sort((a, b) => a.order - b.order);
    
    return NextResponse.json(milestones);
  } catch (error) {
    console.error('Error fetching company milestones:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company milestones' },
      { status: 500 }
    );
  }
} 