import { NextResponse } from 'next/server';
import { getNews } from '@/lib/notion';
import { transformNewsItem } from '@/lib/notion-transformer';

export async function GET() {
  try {
    const data = await getNews();
    
    if (!data || data.length === 0) {
      return NextResponse.json([]);
    }

    const news = data.map(transformNewsItem);
    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
} 