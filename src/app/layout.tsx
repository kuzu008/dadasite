import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Layout } from '@/components';
import { NotionDataService } from '@/lib/notion-service';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// 动态生成元数据
export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteConfig = await NotionDataService.SiteConfig.getConfig();
    
    return {
      title: siteConfig?.siteName || 'AI金融科技 - 专业的证券AI解决方案提供商',
      description: siteConfig?.description ||
        '我们专注于为证券行业提供AI驱动的智能解决方案，包括智能行情、智能交易、智能资讯等产品，助力金融机构实现数字化转型。',
      keywords: siteConfig?.keywords?.join(',') || 'AI金融,证券科技,智能交易,量化投资,金融AI,证券软件',
    };
  } catch (error) {
    console.error('Error loading site config for metadata:', error);
    // 失败时使用默认值
    return {
      title: 'AI金融科技 - 专业的证券AI解决方案提供商',
      description:
        '我们专注于为证券行业提供AI驱动的智能解决方案，包括智能行情、智能交易、智能资讯等产品，助力金融机构实现数字化转型。',
      keywords: 'AI金融,证券科技,智能交易,量化投资,金融AI,证券软件',
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
