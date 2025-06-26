'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { Section, Container } from '@/components';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getCategoryById, getProductById } from '@/config/products';

const ProductDetailPage = () => {
  const params = useParams();
  const productId = params?.id as string;
  
  const category = getCategoryById('market-intelligence');
  const product = getProductById('market-intelligence', productId);

  if (!category || !product) {
    notFound();
  }

  return (
    <>
      <Section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Link 
                href="/products/market-intelligence"
                className="text-blue-600 hover:text-blue-700 mr-4"
              >
                ← 返回智能行情
              </Link>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                {product.status}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              {product.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">申请试用</Button>
              <Button variant="outline" size="lg">预约演示</Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">产品详情</h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.detailDescription}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">核心特性</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default ProductDetailPage;
