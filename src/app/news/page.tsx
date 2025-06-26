'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Section, Container } from '@/components';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageLoading } from '@/components/ui/Loading';
import { NewsItem } from '@/types/notion';

const NewsPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['全部', '公司新闻', '产品更新', '行业洞察', '技术分享'];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/news');
        
        if (response.ok) {
          const newsData = await response.json();
          setNews(newsData);
          setFilteredNews(newsData);
        } else {
          setError('获取企业动态失败');
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('加载数据时出现错误');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // 筛选和搜索逻辑
  useEffect(() => {
    let filtered = news;

    // 按分类筛选
    if (selectedCategory !== '全部') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // 按搜索词筛选
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNews(filtered);
  }, [news, selectedCategory, searchTerm]);

  if (loading) {
    return <PageLoading />;
  }

  if (error) {
    return (
      <Section className="py-20">
        <Container>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">加载失败</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Button onClick={() => window.location.reload()}>重新加载</Button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              企业动态
            </h1>
            <p className="text-xl text-blue-600 font-medium mb-6">
              了解我们的最新动态、行业洞察和技术分享
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              掌握金融科技前沿资讯，洞察行业发展趋势
            </p>
          </div>
        </Container>
      </Section>

      {/* Filters and Search */}
      <Section className="py-8 border-b">
        <Container>
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="w-full md:w-auto">
              <input
                type="text"
                placeholder="搜索文章..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            {selectedCategory !== '全部' || searchTerm ? (
              <>显示 {filteredNews.length} 条结果</>
            ) : (
              <>共 {news.length} 篇文章</>
            )}
          </div>
        </Container>
      </Section>

      {/* News List */}
      <Section className="py-16">
        <Container>
          {filteredNews.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                暂无相关文章
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedCategory !== '全部' 
                  ? '尝试调整筛选条件或搜索关键词' 
                  : '敬请期待我们的最新动态'}
              </p>
              {(searchTerm || selectedCategory !== '全部') && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedCategory('全部');
                    setSearchTerm('');
                  }}
                >
                  清除筛选
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((newsItem) => {
                const categoryColors = {
                  '公司新闻': 'text-blue-600 bg-blue-50',
                  '产品更新': 'text-green-600 bg-green-50', 
                  '行业洞察': 'text-purple-600 bg-purple-50',
                  '技术分享': 'text-orange-600 bg-orange-50'
                };

                return (
                  <Card key={newsItem.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    {newsItem.image && (
                      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                        <img 
                          src={newsItem.image} 
                          alt={newsItem.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <CardHeader>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3 w-fit ${
                        categoryColors[newsItem.category] || 'text-gray-600 bg-gray-50'
                      }`}>
                        {newsItem.category}
                      </div>
                      
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                        {newsItem.title}
                      </CardTitle>
                      
                      <CardDescription className="text-sm text-gray-500">
                        {new Date(newsItem.publishDate).toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                        {newsItem.author && <span className="ml-2">• {newsItem.author}</span>}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                        {newsItem.summary}
                      </p>
                      
                      {newsItem.tags && newsItem.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {newsItem.tags.slice(0, 3).map((tag) => (
                            <span 
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <Link href={`/news/${newsItem.id}`}>
                        <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                          阅读全文 →
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
};

export default NewsPage; 