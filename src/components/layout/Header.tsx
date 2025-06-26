'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { DropdownMenu } from '@/components/ui/DropdownMenu';
import { cn } from '@/lib/utils';


// 产品下拉菜单项
const productItems = [
  {
    name: '智能行情',
    href: '/products/market-intelligence',
    description: '实时市场数据分析与智能预测',
  },
  {
    name: '智能交易',
    href: '/products/smart-trading',
    description: '自动化交易执行与风险控制',
  },
  {
    name: '智能资讯',
    href: '/products/ai-research',
    description: 'AI驱动的资讯分析与研究报告',
  },
];

// 解决方案下拉菜单项
const solutionItems = [
  {
    name: '券商数字化转型',
    href: '/solutions/digital-transformation',
    description: '全面的数字化升级解决方案',
  },
  {
    name: '财富管理赋能',
    href: '/solutions/wealth-management',
    description: 'AI驱动的智能投顾服务',
  },
  {
    name: '量化交易平台',
    href: '/solutions/quantitative-trading',
    description: '高性能量化交易基础设施',
  },
  {
    name: '合规与风控',
    href: '/solutions/compliance-risk',
    description: '智能合规与风险管理系统',
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const loadSiteConfig = async () => {
      try {
        const response = await fetch('/api/site-config');
        if (response.ok) {
          const config = await response.json();
          setSiteConfig(config);
          setLogoError(false); // Reset logo error when new config loads
        } else {
          console.error('Header: Failed to fetch site config:', response.statusText);
        }
      } catch (error) {
        console.error('Header: Error loading site config:', error);
      }
    };
    loadSiteConfig();
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              {siteConfig?.logo && !logoError ? (
                <img
                  src={siteConfig.logo}
                  alt={siteConfig.siteName || 'Logo'}
                  className="h-8 w-8 rounded-lg object-cover"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
              )}
              <span className="text-xl font-bold text-gray-900">
                {siteConfig?.siteName || '金融科技'}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              首页
            </Link>

            <DropdownMenu
              trigger={
                <span className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  产品中心
                </span>
              }
              items={productItems}
            />

            <DropdownMenu
              trigger={
                <span className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  解决方案
                </span>
              }
              items={solutionItems}
            />

            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              关于我们
            </Link>

            <Link
              href="/news"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              企业动态
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button variant="outline" size="sm">
              申请演示
            </Button>
            <Button size="sm">联系我们</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">打开主菜单</span>
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            'md:hidden transition-all duration-300 ease-in-out',
            mobileMenuOpen
              ? 'max-h-96 opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          )}
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              首页
            </Link>
            <Link
              href="/products"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              产品中心
            </Link>
            <Link
              href="/solutions"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              解决方案
            </Link>
            <Link
              href="/about"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              关于我们
            </Link>
            <Link
              href="/news"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              企业动态
            </Link>
            <div className="flex flex-col space-y-2 px-3 pt-4">
              <Button variant="outline" size="sm" className="w-full">
                申请演示
              </Button>
              <Button size="sm" className="w-full">
                联系我们
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
