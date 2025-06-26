'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Section, Container } from '@/components';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { NotionDataService } from '@/lib/notion-service';
import { Product } from '@/types/notion';

const ProductCenter = () => {
  const [activeTab, setActiveTab] = useState('智能行情');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    {
      key: '智能行情',
      label: '智能行情',
      description: '实时、准确、智能的金融行情数据服务',
      link: '/products/market-intelligence'
    },
    {
      key: '智能交易',
      label: '智能交易',
      description: '高效、安全、智能的交易执行系统',
      link: '/products/smart-trading'
    },
    {
      key: '智能资讯',
      label: '智能资讯',
      description: '个性化、精准、及时的金融资讯服务',
      link: '/products/ai-research'
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const allProducts = await NotionDataService.Product.getAll();
        setProducts(allProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        // 使用默认数据
        setProducts([
          {
            id: 'default-1',
            title: '智能行情分析系统',
            description: '基于大数据和AI算法的实时行情分析平台，为投资决策提供数据支持。',
            category: '智能行情',
            features: ['实时数据处理', '智能预警', '多维度分析', '可视化展示'],
            status: '正式版',
            createdTime: new Date().toISOString(),
            updatedTime: new Date().toISOString(),
          },
          {
            id: 'default-2',
            title: '智能交易执行引擎',
            description: '高性能的交易执行系统，支持多种交易策略和风险控制。',
            category: '智能交易',
            features: ['算法交易', '风险控制', '订单管理', '实时监控'],
            status: '正式版',
            createdTime: new Date().toISOString(),
            updatedTime: new Date().toISOString(),
          },
          {
            id: 'default-3',
            title: '智能资讯推荐系统',
            description: '个性化的金融资讯推荐服务，精准匹配用户投资偏好。',
            category: '智能资讯',
            features: ['个性化推荐', '热点追踪', '舆情分析', '智能摘要'],
            status: '正式版',
            createdTime: new Date().toISOString(),
            updatedTime: new Date().toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => product.category === activeTab);

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="p-6 h-full">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {product.title}
          </h3>
          
          <p className="text-gray-600 mb-4">
            {product.description}
          </p>

          {product.features && product.features.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">核心功能</h4>
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">
            状态: <span className="text-green-600 font-medium">{product.status}</span>
          </span>
          <Button variant="outline" size="sm">
            了解详情
          </Button>
        </div>
      </div>
    </Card>
  );

  const EmptyState = ({ category }: { category: string }) => (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {category}产品正在开发中
      </h3>
      <p className="text-gray-600">
        我们正在为您精心准备更多优质的{category}产品，敬请期待。
      </p>
    </div>
  );

  return (
    <Layout>
      {/* 页面头部 */}
      <Section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              产品中心
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              为证券行业提供全方位的AI智能解决方案，助力数字化转型
            </p>
          </div>
        </Container>
      </Section>

      {/* Tab导航 */}
      <Section className="bg-white border-b border-gray-200">
        <Container>
          <div className="flex justify-center">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-6 text-center transition-colors duration-200 ${
                    activeTab === tab.key
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="font-medium">{tab.label}</div>
                  <div className="text-sm mt-1 opacity-75">{tab.description}</div>
                </button>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 产品内容 */}
      <Section className="py-16">
        <Container>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loading size="lg" />
            </div>
          ) : (
            <>
              {filteredProducts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <EmptyState category={activeTab} />
              )}
            </>
          )}
        </Container>
      </Section>

      {/* CTA区域 */}
      <Section className="bg-gray-50 py-16">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              想了解更多产品信息？
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              我们的专业团队将为您提供详细的产品演示和解决方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                申请产品演示
              </Button>
              <Button variant="outline" size="lg">
                联系销售顾问
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default ProductCenter;
