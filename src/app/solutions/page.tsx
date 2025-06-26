'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Section, Container } from '@/components';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import Link from 'next/link';
import { SOLUTION_CATEGORIES } from '@/config/solutions';

const SolutionCenter = () => {
  const [activeTab, setActiveTab] = useState('digital-transformation');
  const [loading, setLoading] = useState(false);

  const tabs = [
    {
      key: 'digital-transformation',
      label: '券商数字化转型',
      description: '全面的数字化转型解决方案',
      link: '/solutions/digital-transformation'
    },
    {
      key: 'wealth-management',
      label: '财富管理赋能',
      description: 'AI驱动的智能投顾服务',
      link: '/solutions/wealth-management'
    },
    {
      key: 'quantitative-trading',
      label: '量化交易平台',
      description: '专业的量化交易基础设施',
      link: '/solutions/quantitative-trading'
    },
    {
      key: 'compliance-risk',
      label: '合规与风控',
      description: '智能合规与风险管理系统',
      link: '/solutions/compliance-risk'
    },
  ];

  const currentCategory = SOLUTION_CATEGORIES[activeTab];
  const solutions = currentCategory ? currentCategory.solutions : [];

  const SolutionCard = ({ solution }: { solution: any }) => (
    <Card className="p-6 h-full">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {solution.title}
          </h3>
          
          <p className="text-gray-600 mb-4">
            {solution.description}
          </p>

          {solution.advantages && solution.advantages.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">核心优势</h4>
              <div className="flex flex-wrap gap-2">
                {solution.advantages.map((advantage: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                  >
                    {advantage}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">
            状态: <span className="text-green-600 font-medium">{solution.status}</span>
          </span>
          <Button variant="outline" size="sm">
            <Link href={`/solutions/${activeTab}/${solution.id}`}>
              了解详情
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );

  const EmptyState = ({ category }: { category: string }) => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-gray-400 text-2xl">📋</span>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">暂无{category}解决方案</h3>
      <p className="text-gray-500">相关解决方案正在开发中，敬请期待</p>
    </div>
  );

  return (
    <Layout>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              行业解决方案
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              针对金融行业不同业务场景，提供专业的AI驱动解决方案
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-blue-600">4+</div>
                <div className="text-sm text-gray-600">解决方案类别</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-green-600">100+</div>
                <div className="text-sm text-gray-600">成功案例</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-purple-600">99%</div>
                <div className="text-sm text-gray-600">客户满意度</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-orange-600">24/7</div>
                <div className="text-sm text-gray-600">技术支持</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Solution Categories */}
      <Section className="py-16">
        <Container>
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category Info */}
          {currentCategory && (
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full text-3xl mb-4">
                {currentCategory.icon}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {currentCategory.title}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                {currentCategory.description}
              </p>
              <Button>
                <Link href={`/solutions/${activeTab}`}>
                  查看完整方案
                </Link>
              </Button>
            </div>
          )}

          {/* Solutions Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loading size="lg" />
            </div>
          ) : (
            <>
              {solutions.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {solutions.map((solution) => (
                    <SolutionCard key={solution.id} solution={solution} />
                  ))}
                </div>
              ) : (
                <EmptyState category={currentCategory?.title || ''} />
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
              需要定制化解决方案？
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              我们的专业团队将根据您的具体需求，提供量身定制的解决方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                申请方案咨询
              </Button>
              <Button variant="outline" size="lg">
                查看成功案例
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default SolutionCenter;
