'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';



const navigation = {
  products: [
    { name: '智能行情', href: '/products/market-intelligence' },
    { name: '智能交易', href: '/products/smart-trading' },
    { name: '智能资讯', href: '/products/ai-research' },
  ],
  solutions: [
    { name: '券商数字化转型', href: '/solutions/digital-transformation' },
    { name: '财富管理赋能', href: '/solutions/wealth-management' },
    { name: '量化交易平台', href: '/solutions/quantitative-trading' },
    { name: '合规与风控', href: '/solutions/compliance-risk' },
  ],
  company: [
    { name: '关于我们', href: '/about' },
    { name: '企业动态', href: '/news' },
    { name: '联系我们', href: '/contact' },
    { name: '隐私政策', href: '/privacy' },
  ],
};

export function Footer() {
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [logoError, setLogoError] = useState(false);
  const [qrCodeError, setQrCodeError] = useState(false);

  useEffect(() => {
    const loadSiteConfig = async () => {
      try {
        const response = await fetch('/api/site-config');
        if (response.ok) {
          const config = await response.json();
          setSiteConfig(config);
          setLogoError(false);
          setQrCodeError(false);
        } else {
          console.error('Footer: Failed to fetch site config:', response.statusText);
        }
      } catch (error) {
        console.error('Footer: Error loading site config:', error);
      }
    };
    loadSiteConfig();
  }, []);
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
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
              </div>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {siteConfig?.description ||
                  '专注于为证券行业提供AI驱动的智能解决方案，助力金融机构实现数字化转型和业务创新。'}
              </p>
              <div className="flex space-x-4 mb-6">
                {siteConfig?.socialLinks?.wechat && (
                  <a
                    href={siteConfig.socialLinks.wechat}
                    className="text-gray-400 hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg hover:bg-blue-50"
                  >
                    <span className="sr-only">微信</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.5 11.5c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5-1.5.7-1.5 1.5.7 1.5 1.5 1.5z" />
                      <path d="M15.5 11.5c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5-1.5.7-1.5 1.5.7 1.5 1.5 1.5z" />
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                    </svg>
                  </a>
                )}
                {siteConfig?.socialLinks?.linkedin && (
                  <a
                    href={siteConfig.socialLinks.linkedin}
                    className="text-gray-400 hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg hover:bg-blue-50"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
              </div>

              {/* WeChat QR Code - 优化后的布局 */}
              {siteConfig?.wechatQrCode && !qrCodeError && (
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-sm">
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                      <img
                        src={siteConfig.wechatQrCode}
                        alt="微信公众号二维码"
                        className="w-16 h-16 rounded object-cover"
                        onError={() => setQrCodeError(true)}
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.5 11.5c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5-1.5.7-1.5 1.5.7 1.5 1.5 1.5z" />
                        <path d="M15.5 11.5c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5-1.5.7-1.5 1.5.7 1.5 1.5 1.5z" />
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                      </svg>
                      <h4 className="text-sm font-semibold text-gray-900">
                        关注我们
                      </h4>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      扫码关注微信公众号，获取最新资讯和产品动态
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Products */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                产品中心
              </h3>
              <ul className="space-y-3">
                {navigation.products.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                解决方案
              </h3>
              <ul className="space-y-3">
                {navigation.solutions.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                公司信息
              </h3>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info - 独立的联系信息列 */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                联系我们
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 text-blue-600 mt-0.5">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">电话</p>
                    <p className="text-sm text-gray-900 font-medium">
                      {siteConfig?.contactPhone || '400-800-1234'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 text-blue-600 mt-0.5">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">邮箱</p>
                    <p className="text-sm text-gray-900 font-medium break-all">
                      {siteConfig?.contactEmail || 'contact@ruisi-fintech.com'}
                    </p>
                  </div>
                </div>

                {siteConfig?.address && (
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 text-blue-600 mt-0.5">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">地址</p>
                      <p className="text-sm text-gray-900 font-medium leading-relaxed">
                        {siteConfig.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} AI金融科技有限公司.
              保留所有权利.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-500 hover:text-blue-600"
              >
                隐私政策
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-500 hover:text-blue-600"
              >
                服务条款
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-500 hover:text-blue-600"
              >
                Cookie政策
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
