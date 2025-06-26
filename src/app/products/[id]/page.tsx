'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loading } from '@/components/ui/Loading';

const ProductDetailRedirect = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  useEffect(() => {
    if (productId) {
      // 根据产品ID重定向到对应的类别页面
      if (productId.includes('smart-trading') || 
          productId.includes('algo-trading') || 
          productId.includes('portfolio-trading') || 
          productId.includes('hft-system') || 
          productId.includes('risk-management')) {
        router.replace(`/products/smart-trading/${productId}`);
      } else if (productId.includes('market-intelligence') || 
                 productId.includes('market-')) {
        router.replace(`/products/market-intelligence/${productId}`);
      } else {
        // 默认重定向到产品中心
        router.replace('/products');
      }
    }
  }, [productId, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loading size="lg" />
    </div>
  );
};

export default ProductDetailRedirect;