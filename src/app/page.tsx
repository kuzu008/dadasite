'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Loading } from '@/components/ui/Loading';
import { NotionDataService } from '@/lib/notion-service';
import { Product, Solution, NewsItem, CompanyInfo, CoreAdvantage, ClientCase } from '@/types/notion';

interface HomepageData {
  products: Product[];
  solutions: Solution[];
  news: NewsItem[];
  companyInfo: CompanyInfo | null;
  coreAdvantages: CoreAdvantage[];
  clientCases: ClientCase[];
}

export default function Home() {
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPageData = async () => {
      try {
        const [config, data] = await Promise.all([
          NotionDataService.SiteConfig.getConfig(),
          NotionDataService.getHomepageData(),
        ]);
        
        setSiteConfig(config);
        setHomepageData(data);
      } catch (error) {
        console.error('Error loading page data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPageData();
  }, []);

  // 获取三个主要产品类别的产品
  const getProductsByCategory = (category: Product['category']) => {
    return homepageData?.products.filter(p => p.category === category).slice(0, 1) || [];
  };

  // 获取三个主要解决方案类别的方案
  const getSolutionsByCategory = (category: Solution['category']) => {
    return homepageData?.solutions.filter(s => s.category === category).slice(0, 1) || [];
  };

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white text-center py-2">
          <div className="flex items-center justify-center space-x-2">
            <Loading size="sm" />
            <span>正在加载页面数据...</span>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                赋能证券行业的
                <span className="text-blue-600 block">AI智能解决方案</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {siteConfig?.description || homepageData?.companyInfo?.description || 
                  '我们专注于为证券行业提供AI驱动的智能解决方案，包括智能行情、智能交易、智能资讯等产品，助力金融机构实现数字化转型。'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="text-lg px-8">
                    了解产品
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="text-lg px-8">
                    申请演示
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">99.9%</div>
                    <div className="text-sm text-gray-600">系统稳定性</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">&lt;1ms</div>
                    <div className="text-sm text-gray-600">响应延迟</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">500+</div>
                    <div className="text-sm text-gray-600">服务客户</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">24/7</div>
                    <div className="text-sm text-gray-600">技术支持</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Core Advantages */}
      {homepageData?.coreAdvantages && homepageData.coreAdvantages.length > 0 && (
        <Section className="py-20">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                我们的核心优势
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                凭借多年的行业经验和技术积累，我们为客户提供专业、可靠的AI解决方案
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {homepageData.coreAdvantages.slice(0, 4).map((advantage) => (
                <Card key={advantage.id} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="text-4xl mb-4">{advantage.icon}</div>
                    <CardTitle className="text-xl">{advantage.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {advantage.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Products Preview */}
      <Section className="bg-gray-50 py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              产品与解决方案
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              为不同业务场景提供专业的AI解决方案
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 智能行情产品 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-600 text-2xl">📈</span>
                </div>
                <CardTitle>智能行情</CardTitle>
                <CardDescription>
                  {getProductsByCategory('智能行情')[0]?.description || 
                   '实时市场数据分析与智能预测，助力投资决策'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/products/market-intelligence">
                  <Button variant="outline" className="w-full">
                    了解更多
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 智能交易产品 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-green-600 text-2xl">⚡</span>
                </div>
                <CardTitle>智能交易</CardTitle>
                <CardDescription>
                  {getProductsByCategory('智能交易')[0]?.description || 
                   '自动化交易执行与风险控制，提升交易效率'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/products/smart-trading">了解更多</Link>
                </Button>
              </CardContent>
            </Card>

            {/* 智能资讯产品 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-purple-600 text-2xl">📊</span>
                </div>
                <CardTitle>智能资讯</CardTitle>
                <CardDescription>
                  {getProductsByCategory('智能资讯')[0]?.description || 
                   'AI驱动的资讯分析与研究报告，洞察市场趋势'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/products#ai-research">了解更多</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Solutions Preview */}
      <Section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              行业解决方案
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              针对不同业务场景，提供定制化的AI解决方案
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 券商数字化转型 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-600 text-2xl">🏢</span>
                </div>
                <CardTitle className="text-lg">券商数字化转型</CardTitle>
                <CardDescription className="text-sm">
                  {getSolutionsByCategory('券商数字化转型')[0]?.description || 
                   '全面的数字化转型解决方案，助力券商业务升级'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/solutions#digital-transformation">了解详情</Link>
                </Button>
              </CardContent>
            </Card>

            {/* 财富管理赋能 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-green-600 text-2xl">💰</span>
                </div>
                <CardTitle className="text-lg">财富管理赋能</CardTitle>
                <CardDescription className="text-sm">
                  {getSolutionsByCategory('财富管理赋能')[0]?.description || 
                   '智能投顾与财富管理解决方案'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/solutions#wealth-management">了解详情</Link>
                </Button>
              </CardContent>
            </Card>

            {/* 量化交易平台 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-purple-600 text-2xl">⚙️</span>
                </div>
                <CardTitle className="text-lg">量化交易平台</CardTitle>
                <CardDescription className="text-sm">
                  {getSolutionsByCategory('量化交易平台')[0]?.description || 
                   '专业的量化交易和策略回测平台'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/solutions#quant-trading">了解详情</Link>
                </Button>
              </CardContent>
            </Card>

            {/* 合规与风控 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-orange-600 text-2xl">🛡️</span>
                </div>
                <CardTitle className="text-lg">合规与风控</CardTitle>
                <CardDescription className="text-sm">
                  {getSolutionsByCategory('合规与风控')[0]?.description || 
                   '智能合规监控与风险管理解决方案'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/solutions#compliance">了解详情</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Client Cases */}
      {homepageData?.clientCases && homepageData.clientCases.length > 0 && (
        <Section className="bg-gray-50 py-20">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                客户案例
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                我们服务过的优秀客户，共同见证成功
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {homepageData.clientCases.slice(0, 3).map((case_) => {
                // 根据行业类型显示不同的图标
                const getIndustryIcon = (industry: string) => {
                  switch (industry) {
                    case '证券': return '📈';
                    case '财富管理': return '💰';
                    case '私募': return '💼';
                    case '银行': return '🏦';
                    case '保险': return '🛡️';
                    default: return '🏢';
                  }
                };

                const getIndustryColor = (industry: string) => {
                  switch (industry) {
                    case '证券': return 'bg-blue-100 text-blue-600';
                    case '财富管理': return 'bg-green-100 text-green-600';
                    case '私募': return 'bg-purple-100 text-purple-600';
                    case '银行': return 'bg-indigo-100 text-indigo-600';
                    case '保险': return 'bg-orange-100 text-orange-600';
                    default: return 'bg-gray-100 text-gray-600';
                  }
                };

                return (
                  <Card key={case_.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className={`w-16 h-16 ${getIndustryColor(case_.industry)} rounded-lg flex items-center justify-center mb-4`}>
                        {case_.logo ? (
                          <img 
                            src={case_.logo} 
                            alt={case_.clientName || case_.name} 
                            className="max-w-full max-h-full object-contain"
                          />
                        ) : (
                          <span className="text-2xl">{getIndustryIcon(case_.industry)}</span>
                        )}
                      </div>
                      <CardTitle className="text-lg">{case_.clientName || case_.name}</CardTitle>
                      <CardDescription className="text-blue-600 font-medium">
                        {case_.industry}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 text-sm">{case_.description}</p>
                      {case_.implementationDate && (
                        <div className="text-xs text-gray-500">
                          实施时间: {case_.implementationDate}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {homepageData.clientCases.length > 3 && (
              <div className="text-center mt-12">
                <Button variant="outline" asChild>
                  <Link href="/about#clients">查看更多案例</Link>
                </Button>
              </div>
            )}
          </Container>
        </Section>
      )}

      {/* Enterprise News */}
      {homepageData?.news && homepageData.news.length > 0 && (
        <Section className="py-20">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                企业动态
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                了解我们的最新动态、行业洞察和技术分享
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {homepageData.news.slice(0, 4).map((news) => (
                <Card key={news.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="text-xs text-blue-600 font-medium mb-2">
                      {news.category}
                    </div>
                    <CardTitle className="text-base line-clamp-2">
                      {news.title}
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-500">
                      {new Date(news.publishDate).toLocaleDateString('zh-CN')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {news.summary}
                    </p>
                    <Button variant="ghost" size="sm" className="mt-4 p-0 h-auto" asChild>
                      <Link href={`/news/${news.id}`}>阅读更多 →</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button variant="outline" asChild>
                <Link href="/news">查看更多动态</Link>
              </Button>
            </div>
          </Container>
        </Section>
      )}


    </>
  );
}
