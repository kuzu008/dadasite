'use client';

import React, { useState, useEffect } from 'react';
import { Section, Container } from '@/components';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const TestNotionPage = () => {
  const [results, setResults] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const endpoints = [
    { name: '公司信息', url: '/api/company-info', key: 'company' },
    { name: '团队成员', url: '/api/team-members', key: 'team' },
    { name: '公司价值观', url: '/api/company-values', key: 'values' },
    { name: '公司里程碑', url: '/api/company-milestones', key: 'milestones' },
    { name: '办公地址', url: '/api/office-locations', key: 'offices' },
    { name: '企业动态', url: '/api/news', key: 'news' },
  ];

  const testEndpoint = async (endpoint: typeof endpoints[0]) => {
    setLoading(prev => ({ ...prev, [endpoint.key]: true }));
    setErrors(prev => ({ ...prev, [endpoint.key]: '' }));
    
    try {
      const response = await fetch(endpoint.url);
      const data = await response.json();
      
      if (response.ok) {
        setResults(prev => ({ ...prev, [endpoint.key]: data }));
      } else {
        setErrors(prev => ({ ...prev, [endpoint.key]: data.error || '请求失败' }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, [endpoint.key]: '网络错误或服务器错误' }));
    } finally {
      setLoading(prev => ({ ...prev, [endpoint.key]: false }));
    }
  };

  const testAllEndpoints = async () => {
    for (const endpoint of endpoints) {
      await testEndpoint(endpoint);
    }
  };

  return (
    <Section className="py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Notion 数据库连接测试
            </h1>
            <p className="text-gray-600 mb-8">
              测试所有 Notion API 端点是否正常工作
            </p>
            <Button onClick={testAllEndpoints} size="lg">
              测试所有端点
            </Button>
          </div>

          <div className="grid gap-6">
            {endpoints.map((endpoint) => (
              <Card key={endpoint.key} className="p-6">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {endpoint.name}
                    </CardTitle>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500 font-mono">
                        {endpoint.url}
                      </span>
                      <Button
                        onClick={() => testEndpoint(endpoint)}
                        disabled={loading[endpoint.key]}
                        size="sm"
                      >
                        {loading[endpoint.key] ? '测试中...' : '测试'}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {loading[endpoint.key] && (
                    <div className="text-blue-600">正在获取数据...</div>
                  )}
                  
                  {errors[endpoint.key] && (
                    <div className="bg-red-50 border border-red-200 rounded p-3">
                      <div className="text-red-800 font-medium">错误:</div>
                      <div className="text-red-600 text-sm">{errors[endpoint.key]}</div>
                    </div>
                  )}
                  
                  {results[endpoint.key] && !loading[endpoint.key] && (
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      <div className="text-green-800 font-medium mb-2">
                        ✅ 成功获取数据
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        数据类型: {Array.isArray(results[endpoint.key]) ? '数组' : '对象'}
                        {Array.isArray(results[endpoint.key]) && 
                          ` (${results[endpoint.key].length} 条记录)`
                        }
                      </div>
                      <details className="mt-2">
                        <summary className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">
                          查看原始数据
                        </summary>
                        <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto max-h-40">
                          {JSON.stringify(results[endpoint.key], null, 2)}
                        </pre>
                      </details>
                    </div>
                  )}
                  
                  {!results[endpoint.key] && !loading[endpoint.key] && !errors[endpoint.key] && (
                    <div className="text-gray-500 text-sm">
                      点击"测试"按钮检查此端点
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">
              配置说明
            </h2>
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                <strong>如果看到错误:</strong> 请检查 `.env.local` 文件中的 Notion 配置
              </p>
              <p>
                <strong>如果数据为空:</strong> 请确认 Notion 数据库中有相应的数据记录
              </p>
              <p>
                <strong>配置文档:</strong> 查看 `docs/notion-setup.md` 了解详细配置步骤
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default TestNotionPage;
