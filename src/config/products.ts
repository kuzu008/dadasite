export interface ProductItem {
  id: string;
  title: string;
  description: string;
  status: '正式版' | '测试版' | '即将发布';
  features: string[];
  image?: string;
  detailDescription: string;
}

export interface ProductCategory {
  id: string;
  title: string;
  englishTitle: string;
  description: string;
  icon: string;
  themeColor: string;
  bgGradient: string;
  products: ProductItem[];
}

export const PRODUCT_CATEGORIES: Record<string, ProductCategory> = {
  'market-intelligence': {
    id: 'market-intelligence',
    title: '智能行情',
    englishTitle: 'Market Intelligence',
    description: '基于人工智能和大数据技术的智能行情分析平台，为投资决策提供全面、准确、及时的数据支持',
    icon: '��',
    themeColor: 'blue',
    bgGradient: 'from-blue-50 to-indigo-100',
    products: [
      {
        id: 'market-1',
        title: '智能行情分析系统',
        description: '基于大数据和AI算法的实时行情分析平台，为投资决策提供数据支持',
        status: '正式版',
        features: ['实时数据处理', '智能预警', '技术分析', '可视化大屏'],
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=300&fit=crop',
        detailDescription: '智能行情分析系统采用先进的人工智能算法和大数据处理技术，为投资者提供全方位的市场行情分析服务。'
      },
      {
        id: 'market-2',
        title: '行情数据API服务',
        description: '提供高质量、低延迟的行情数据API服务，支持多种金融产品的实时和历史数据查询',
        status: '正式版',
        features: ['RESTful API', 'WebSocket推送', '历史数据', '多格式支持'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
        detailDescription: '专业级的行情数据API服务，为金融机构和开发者提供稳定、高效的数据接口。'
      }
    ]
  },
  'smart-trading': {
    id: 'smart-trading',
    title: '智能交易',
    englishTitle: 'Smart Trading',
    description: '基于人工智能算法的智能交易系统，提供自动化交易执行、智能风险控制和策略优化',
    icon: '⚡',
    themeColor: 'green',
    bgGradient: 'from-green-50 to-emerald-100',
    products: [
      {
        id: 'algo-trading',
        title: '算法交易系统',
        description: '专业的算法交易执行平台，支持多种交易策略和风险控制模式',
        status: '正式版',
        features: ['多策略支持', '实时风控', '低延迟执行', '智能拆单'],
        detailDescription: '专业的算法交易执行平台，采用先进的算法引擎和智能风控技术。'
      },
      {
        id: 'portfolio-trading',
        title: '投资组合交易',
        description: '智能化的投资组合交易系统，支持多资产类别的统一交易管理',
        status: '正式版',
        features: ['多资产支持', '智能再平衡', '组合优化', '绩效分析'],
        detailDescription: '智能化的投资组合交易系统，为资产管理机构提供一站式的组合交易解决方案。'
      }
    ]
  },
  'ai-research': {
    id: 'ai-research',
    title: '智能资讯',
    englishTitle: 'AI Research',
    description: '基于人工智能技术的智能资讯服务平台，提供个性化、精准、及时的金融资讯和研究报告',
    icon: '🔍',
    themeColor: 'purple',
    bgGradient: 'from-purple-50 to-violet-100',
    products: [
      {
        id: 'news-analysis',
        title: '智能资讯分析',
        description: '基于NLP技术的智能资讯分析系统，快速解读市场资讯影响',
        status: '正式版',
        features: ['情感分析', '影响评估', '关键词提取', '关联分析'],
        detailDescription: '基于自然语言处理和机器学习技术的智能资讯分析系统。'
      },
      {
        id: 'research-report',
        title: '智能研报系统',
        description: 'AI驱动的研究报告生成和分析系统，提供专业的投资研究服务',
        status: '正式版',
        features: ['自动生成', '数据挖掘', '观点提取', '报告评级'],
        detailDescription: '基于人工智能技术的研究报告生成和分析系统。'
      }
    ]
  }
};

export const getCategoryById = (id: string): ProductCategory | null => {
  return PRODUCT_CATEGORIES[id] || null;
};

export const getProductById = (categoryId: string, productId: string): ProductItem | null => {
  const category = getCategoryById(categoryId);
  if (!category) return null;
  
  return category.products.find(product => product.id === productId) || null;
};
