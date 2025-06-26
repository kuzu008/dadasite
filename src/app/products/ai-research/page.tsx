'use client';

import React from 'react';
import Link from 'next/link';
import { Section, Container } from '@/components';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getCategoryById } from '@/config/products';

const AIResearchPage = () => {
  const config = getCategoryById('ai-research');
  
  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">页面配置错误</h1>
          <p className="text-gray-600">无法加载智能资讯页面配置</p>
        </div>
      </div>
    );
  }

  const ProductCard = ({ product }: { product: any }) => (
    <Card className="hover:shadow-lg transition-shadow h-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${
            product.status === '正式版' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {product.status}
          </span>
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <span className="text-purple-600 text-2xl">��</span>
          </div>
        </div>
        
        <CardTitle className="text-xl">{product.title}</CardTitle>
        <CardDescription className="text-gray-600 leading-relaxed">
          {product.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {product.features && product.features.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">核心特性</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {product.features.slice(0, 3).map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button className="flex-1">
              <Link href={`/products/ai-research/${product.id}`}>
                了解详情
              </Link>
            </Button>
            <Button variant="outline" className="flex-1">
              预约演示
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Section className="bg-gradient-to-br from-purple-50 to-violet-100 py-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center text-3xl text-white mr-4">
                {config.icon}
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold text-gray-900">
                  {config.title}
                </h1>
                <p className="text-purple-600 font-medium">{config.englishTitle}</p>
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
              产品矩阵
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              基于AI技术的智能资讯服务，提供精准、及时的金融信息
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {config.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
};

export default AIResearchPage;
