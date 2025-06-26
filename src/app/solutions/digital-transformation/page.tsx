'use client';

import React from 'react';
import Link from 'next/link';
import { Section, Container } from '@/components';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getCategoryById } from '@/config/solutions';

const DigitalTransformationPage = () => {
  const config = getCategoryById('digital-transformation');
  
  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">页面配置错误</h1>
          <p className="text-gray-600">无法加载券商数字化转型页面配置</p>
        </div>
      </div>
    );
  }

  const SolutionCard = ({ solution }: { solution: any }) => (
    <Card className="hover:shadow-lg transition-shadow h-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${
            solution.status === '正式版' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {solution.status}
          </span>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 text-2xl">🏢</span>
          </div>
        </div>
        
        <CardTitle className="text-xl">{solution.title}</CardTitle>
        <CardDescription className="text-gray-600 leading-relaxed">
          {solution.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {solution.advantages && solution.advantages.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">核心优势</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {solution.advantages.slice(0, 3).map((advantage: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    {advantage}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button className="flex-1" asChild>
              <Link href={`/solutions/digital-transformation/${solution.id}`}>
                了解详情
              </Link>
            </Button>
            <Button variant="outline" className="flex-1">
              申请方案
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-3xl text-white mr-4">
                {config.icon}
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold text-gray-900">
                  {config.title}
                </h1>
                <p className="text-blue-600 font-medium">{config.englishTitle}</p>
              </div>
            </div>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {config.description}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              解决方案矩阵
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              全方位的数字化转型解决方案，助力券商实现业务升级
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {config.solutions.map((solution) => (
              <SolutionCard key={solution.id} solution={solution} />
            ))}
          </div>

          {/* 转型价值 */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              数字化转型价值
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">提升客户体验</h4>
                <p className="text-gray-600 text-sm">
                  通过数字化服务提升客户满意度和忠诚度
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">运营效率提升</h4>
                <p className="text-gray-600 text-sm">
                  自动化业务流程，显著降低运营成本
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">业务创新</h4>
                <p className="text-gray-600 text-sm">
                  基于数据驱动的新业务模式和产品创新
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">竞争优势</h4>
                <p className="text-gray-600 text-sm">
                  构建可持续的数字化竞争优势
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default DigitalTransformationPage;
