import { NextResponse } from 'next/server';
import { NotionDataService } from '@/lib/notion-service';

export async function GET() {
  try {
    const config = await NotionDataService.SiteConfig.getConfig();
    
    if (!config) {
      return NextResponse.json(
        { error: 'Site config not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error('API Error: Failed to fetch site config:', error);
    return NextResponse.json(
      { error: 'Failed to fetch site config' },
      { status: 500 }
    );
  }
}