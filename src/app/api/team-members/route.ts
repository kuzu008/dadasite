import { NextResponse } from 'next/server';
import { getTeamMembers } from '@/lib/notion';
import { transformTeamMembers } from '@/lib/notion-transformer';

export async function GET() {
  try {
    const data = await getTeamMembers();
    
    if (!data || data.length === 0) {
      return NextResponse.json([]);
    }

    const teamMembers = transformTeamMembers(data);
    
    // 按照order字段排序
    teamMembers.sort((a, b) => a.order - b.order);
    
    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
} 