'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Section, Container } from '@/components';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageLoading } from '@/components/ui/Loading';
import { NewsItem } from '@/types/notion';

const NewsDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const newsId = params.id as string;

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        
        // 获取所有新闻数据
        const response = await fetch('/api/news');
        
        if (response.ok) {
          const allNews = await response.json();
          
          // 找到当前文章
          const currentNews = allNews.find((news: NewsItem) => news.id === newsId);
          
          if (currentNews) {
            setNewsItem(currentNews);
            
            // 获取相关文章（同分类的其他文章）
            const related = allNews
              .filter((news: NewsItem) => 
                news.id !== newsId && news.category === currentNews.category
              )
              .slice(0, 3);
            setRelatedNews(related);
          } else {
            setError('文章不存在');
          }
        } else {
          setError('获取文章详情失败');
        }
      } catch (err) {
        console.error('Error fetching news detail:', err);
        setError('加载数据时出现错误');
      } finally {
        setLoading(false);
      }
    };

    if (newsId) {
      fetchNewsDetail();
    }
  }, [newsId]);

  if (loading) {
    return <PageLoading />;
  }

  if (error || !newsItem) {
    return (
      <Section className="py-20">
        <Container>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error || '文章不存在'}
            </h1>
            <p className="text-gray-600 mb-8">
              请检查链接是否正确，或者返回企业动态列表页面
            </p>
            <div className="space-x-4">
              <Button onClick={() => router.back()}>返回上页</Button>
              <Button variant="outline">
                <Link href="/news">查看所有动态</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  const categoryColors = {
    '公司新闻': 'text-blue-600 bg-blue-50',
    '产品更新': 'text-green-600 bg-green-50',
    '行业洞察': 'text-purple-600 bg-purple-50',
    '技术分享': 'text-orange-600 bg-orange-50'
  };

  return (
    <>
      {/* Article Header */}
      <Section className="py-12 border-b">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
              <Link href="/" className="hover:text-blue-600">首页</Link>
              <span>/</span>
              <Link href="/news" className="hover:text-blue-600">企业动态</Link>
              <span>/</span>
              <span className="text-gray-900">{newsItem.title}</span>
            </nav>

            {/* Category */}
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
              categoryColors[newsItem.category] || 'text-gray-600 bg-gray-50'
            }`}>
              {newsItem.category}
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {newsItem.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>
                  {new Date(newsItem.publishDate).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              {newsItem.author && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{newsItem.author}</span>
                </div>
              )}
            </div>

            {/* Summary */}
            {newsItem.summary && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {newsItem.summary}
                </p>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Article Content */}
      <Section className="py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            {newsItem.image && (
              <div className="mb-8">
                <img 
                  src={newsItem.image} 
                  alt={newsItem.title}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {newsItem.content}
              </div>
            </div>

            {/* Tags */}
            {newsItem.tags && newsItem.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-sm font-medium text-gray-900 mb-4">标签</h3>
                <div className="flex flex-wrap gap-2">
                  {newsItem.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  返回上页
                </Button>

                <div className="flex gap-3">
                  <Button variant="outline">
                    <Link href="/news">查看更多动态</Link>
                  </Button>
                  <Button>
                    <Link href="/contact">联系我们</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Articles */}
      {relatedNews.length > 0 && (
        <Section className="bg-gray-50 py-16">
          <Container>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                相关文章
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedNews.map((relatedItem) => (
                  <Card key={relatedItem.id} className="hover:shadow-lg transition-shadow">
                    {relatedItem.image && (
                      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                        <img 
                          src={relatedItem.image} 
                          alt={relatedItem.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <CardHeader>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3 w-fit ${
                        categoryColors[relatedItem.category] || 'text-gray-600 bg-gray-50'
                      }`}>
                        {relatedItem.category}
                      </div>
                      
                      <CardTitle className="text-lg line-clamp-2">
                        {relatedItem.title}
                      </CardTitle>
                      
                      <CardDescription className="text-sm text-gray-500">
                        {new Date(relatedItem.publishDate).toLocaleDateString('zh-CN')}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                        {relatedItem.summary}
                      </p>
                      
                      <Link href={`/news/${relatedItem.id}`}>
                        <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600">
                          阅读全文 →
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}
    </>
  );
};

export default NewsDetailPage; 