export interface SolutionItem {
  id: string;
  title: string;
  description: string;
  status: '正式版' | '测试版' | '即将发布';
  challenges: string;
  approach: string;
  advantages: string[];
  relatedProducts: string[];
  image?: string;
  detailDescription: string;
}

export interface SolutionCategory {
  id: string;
  title: string;
  englishTitle: string;
  description: string;
  icon: string;
  themeColor: string;
  bgGradient: string;
  solutions: SolutionItem[];
}

export const SOLUTION_CATEGORIES: Record<string, SolutionCategory> = {
  'digital-transformation': {
    id: 'digital-transformation',
    title: '券商数字化转型',
    englishTitle: 'Digital Transformation',
    description: '全面的数字化转型解决方案，助力券商在数字时代的业务升级与创新发展',
    icon: '🏢',
    themeColor: 'blue',
    bgGradient: 'from-blue-50 to-indigo-100',
    solutions: [
      {
        id: 'broker-digital-platform',
        title: '券商数字化交易平台',
        description: '构建现代化的数字交易基础设施，提升客户体验和运营效率',
        status: '正式版',
        challenges: '传统券商面临客户体验落后、系统架构老化、业务效率低下等挑战',
        approach: '通过云原生技术重构交易系统，引入AI技术优化业务流程，建设统一的数字化平台',
        advantages: ['云原生架构', '微服务设计', '实时数据处理', '智能运营'],
        relatedProducts: ['智能交易系统', '智能行情分析'],
        detailDescription: '全面的券商数字化交易平台解决方案，采用先进的技术架构和理念，帮助券商实现业务的全面数字化转型。',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop'
      },
      {
        id: 'client-service-ai',
        title: '智能客服与营销系统',
        description: 'AI驱动的客户服务和智能营销解决方案，提升客户满意度和业务转化率',
        status: '正式版',
        challenges: '人工客服效率低、营销精准度不足、客户流失率高',
        approach: '整合NLP、机器学习等AI技术，打造智能客服机器人和精准营销系统',
        advantages: ['24/7智能客服', '精准营销推荐', '客户画像分析', '自动化运营'],
        relatedProducts: ['智能资讯分析', '客户行为分析'],
        detailDescription: '基于人工智能技术的客户服务和营销解决方案，显著提升服务质量和营销效果。'
      }
    ]
  },
  'wealth-management': {
    id: 'wealth-management',
    title: '财富管理赋能',
    englishTitle: 'Wealth Management',
    description: '基于人工智能的智能投顾与财富管理解决方案，为客户提供个性化的投资建议',
    icon: '💰',
    themeColor: 'green',
    bgGradient: 'from-green-50 to-emerald-100',
    solutions: [
      {
        id: 'robo-advisor',
        title: '智能投顾平台',
        description: 'AI驱动的投资顾问服务，为客户提供个性化的投资组合建议',
        status: '正式版',
        challenges: '传统投顾服务成本高、覆盖面有限、个性化程度不足',
        approach: '运用机器学习算法分析市场数据和客户风险偏好，提供智能化投资建议',
        advantages: ['智能资产配置', '风险评估', '个性化推荐', '实时调仓'],
        relatedProducts: ['智能交易系统', '风险管理系统'],
        detailDescription: '专业的智能投顾平台，通过AI技术为客户提供科学的投资决策支持。'
      },
      {
        id: 'portfolio-management',
        title: '投资组合管理系统',
        description: '智能化的投资组合构建与管理解决方案，优化资产配置效率',
        status: '正式版',
        challenges: '投资组合管理复杂、再平衡成本高、风险控制困难',
        approach: '基于现代投资组合理论和机器学习算法，实现智能化的组合管理',
        advantages: ['智能再平衡', '风险分散', '成本优化', '绩效跟踪'],
        relatedProducts: ['算法交易系统', '风险分析工具'],
        detailDescription: '先进的投资组合管理系统，帮助投资者实现更优的资产配置和风险管理。'
      }
    ]
  },
  'quantitative-trading': {
    id: 'quantitative-trading',
    title: '量化交易平台',
    englishTitle: 'Quantitative Trading',
    description: '专业的量化交易基础设施和策略研发平台，支持高频交易和复杂策略执行',
    icon: '⚙️',
    themeColor: 'purple',
    bgGradient: 'from-purple-50 to-violet-100',
    solutions: [
      {
        id: 'quant-platform',
        title: '量化交易基础平台',
        description: '高性能的量化交易基础设施，支持策略研发、回测和实盘交易',
        status: '正式版',
        challenges: '策略开发效率低、回测环境不真实、交易延迟高',
        approach: '构建统一的量化交易平台，提供完整的策略生命周期管理',
        advantages: ['低延迟执行', '高精度回测', '策略管理', '风险监控'],
        relatedProducts: ['算法交易系统', '市场数据服务'],
        detailDescription: '专业级的量化交易平台，为量化投资者提供完整的交易基础设施和工具链。'
      },
      {
        id: 'strategy-factory',
        title: '策略工厂系统',
        description: '自动化的策略生成和优化系统，基于机器学习发现投资机会',
        status: '测试版',
        challenges: '策略开发依赖人工、策略衰减快、参数优化困难',
        approach: '运用自动化机器学习技术，实现策略的自动发现和优化',
        advantages: ['自动化策略生成', '参数优化', '策略评估', '风险控制'],
        relatedProducts: ['量化研究平台', 'AI算法库'],
        detailDescription: '创新的策略工厂系统，通过AI技术实现投资策略的自动化开发和优化。'
      }
    ]
  },
  'compliance-risk': {
    id: 'compliance-risk',
    title: '合规与风控',
    englishTitle: 'Compliance & Risk Management',
    description: '智能化的合规监控与风险管理解决方案，确保业务合规和风险可控',
    icon: '🛡️',
    themeColor: 'orange',
    bgGradient: 'from-orange-50 to-red-100',
    solutions: [
      {
        id: 'compliance-monitor',
        title: '智能合规监控系统',
        description: '实时监控交易行为，自动识别违规操作和合规风险',
        status: '正式版',
        challenges: '合规检查人工成本高、监控覆盖不全、响应速度慢',
        approach: '运用机器学习和规则引擎，实现智能化的合规监控和预警',
        advantages: ['实时监控', '智能预警', '自动报告', '合规追踪'],
        relatedProducts: ['交易监控系统', '数据分析平台'],
        detailDescription: '先进的智能合规监控系统，帮助金融机构实现全面的合规管理。'
      },
      {
        id: 'risk-management',
        title: '实时风险管理平台',
        description: '多维度风险监控和管理平台，实现风险的实时识别和控制',
        status: '正式版',
        challenges: '风险识别滞后、风险度量不准确、应急响应不及时',
        approach: '建立多层次风险管理体系，运用AI技术提升风险识别和应对能力',
        advantages: ['实时风险监控', '多维度分析', '智能预警', '自动风控'],
        relatedProducts: ['风险计算引擎', '压力测试工具'],
        detailDescription: '综合性风险管理平台，为金融机构提供全方位的风险管控能力。'
      }
    ]
  }
};

export const getCategoryById = (id: string): SolutionCategory | null => {
  return SOLUTION_CATEGORIES[id] || null;
};

export const getSolutionById = (categoryId: string, solutionId: string): SolutionItem | null => {
  const category = getCategoryById(categoryId);
  if (!category) return null;
  
  return category.solutions.find(solution => solution.id === solutionId) || null;
};

export const getAllSolutions = (): SolutionItem[] => {
  return Object.values(SOLUTION_CATEGORIES).flatMap(category => category.solutions);
};

export const getSolutionsByCategory = (categoryId: string): SolutionItem[] => {
  const category = getCategoryById(categoryId);
  return category ? category.solutions : [];
};
