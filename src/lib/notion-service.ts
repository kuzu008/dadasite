import {
  getProducts as getProductsRaw,
  getSolutions as getSolutionsRaw,
  getNews as getNewsRaw,
  getCompanyInfo as getCompanyInfoRaw,
  queryDatabase,
  DATABASE_IDS,
  getTitle,
  getPlainText,
  getSelect,
  getMultiSelect,
  getPhoneNumber,
  getEmail,
  getUrl,
} from './notion';

import {
  transformProducts,
  transformSolutions,
  transformNewsItems,
  transformCompanyInfo,
  transformCoreAdvantages,
  transformClientCases,
} from './notion-transformer';

import {
  Product,
  Solution,
  NewsItem,
  CompanyInfo,
  CoreAdvantage,
  ClientCase,
  SiteConfig,
  NavigationMenu,
} from '@/types/notion';

// 产品服务
export class ProductService {
  static async getAll(): Promise<Product[]> {
    try {
      const rawData = await getProductsRaw();
      return transformProducts(rawData);
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  static async getByCategory(
    category: Product['category']
  ): Promise<Product[]> {
    try {
      const allProducts = await this.getAll();
      return allProducts.filter((product) => product.category === category);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  }

  static async getById(id: string): Promise<Product | null> {
    try {
      const allProducts = await this.getAll();
      return allProducts.find((product) => product.id === id) || null;
    } catch (error) {
      console.error('Error fetching product by id:', error);
      return null;
    }
  }
}

// 解决方案服务
export class SolutionService {
  static async getAll(): Promise<Solution[]> {
    try {
      const rawData = await getSolutionsRaw();
      return transformSolutions(rawData);
    } catch (error) {
      console.error('Error fetching solutions:', error);
      return [];
    }
  }

  static async getByCategory(
    category: Solution['category']
  ): Promise<Solution[]> {
    try {
      const allSolutions = await this.getAll();
      return allSolutions.filter((solution) => solution.category === category);
    } catch (error) {
      console.error('Error fetching solutions by category:', error);
      return [];
    }
  }

  static async getById(id: string): Promise<Solution | null> {
    try {
      const allSolutions = await this.getAll();
      return allSolutions.find((solution) => solution.id === id) || null;
    } catch (error) {
      console.error('Error fetching solution by id:', error);
      return null;
    }
  }
}

// 新闻服务
export class NewsService {
  static async getAll(limit?: number): Promise<NewsItem[]> {
    try {
      const rawData = await getNewsRaw(limit);
      return transformNewsItems(rawData);
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  }

  static async getLatest(count: number = 3): Promise<NewsItem[]> {
    try {
      return await this.getAll(count);
    } catch (error) {
      console.error('Error fetching latest news:', error);
      return [];
    }
  }

  static async getByCategory(
    category: NewsItem['category']
  ): Promise<NewsItem[]> {
    try {
      const allNews = await this.getAll();
      return allNews.filter((news) => news.category === category);
    } catch (error) {
      console.error('Error fetching news by category:', error);
      return [];
    }
  }

  static async getById(id: string): Promise<NewsItem | null> {
    try {
      const allNews = await this.getAll();
      return allNews.find((news) => news.id === id) || null;
    } catch (error) {
      console.error('Error fetching news by id:', error);
      return null;
    }
  }
}

// 公司信息服务
export class CompanyService {
  static async getInfo(): Promise<CompanyInfo | null> {
    try {
      const rawData = await getCompanyInfoRaw();
      if (!rawData) return null;
      return transformCompanyInfo(rawData);
    } catch (error) {
      console.error('Error fetching company info:', error);
      return null;
    }
  }
}

// 核心优势服务
export class CoreAdvantageService {
  static async getAll(): Promise<CoreAdvantage[]> {
    try {
      if (!DATABASE_IDS.COMPANY) return this.getDefaultAdvantages();

      const rawData = await queryDatabase(DATABASE_IDS.COMPANY, {
        property: 'Type',
        select: {
          equals: '核心优势',
        },
      });

      if (rawData.length === 0) return this.getDefaultAdvantages();

      return transformCoreAdvantages(rawData).sort((a, b) => a.order - b.order);
    } catch (error) {
      console.error('Error fetching core advantages:', error);
      return this.getDefaultAdvantages();
    }
  }

  // 默认核心优势（当 Notion 中没有数据时使用）
  private static getDefaultAdvantages(): CoreAdvantage[] {
    return [
      {
        id: 'default-1',
        title: '领先AI算法',
        description: '基于深度学习的先进算法，为金融决策提供智能支持',
        icon: '🤖',
        order: 1,
      },
      {
        id: 'default-2',
        title: '毫秒级响应',
        description: '超低延迟的数据处理能力，确保实时交易的时效性',
        icon: '⚡',
        order: 2,
      },
      {
        id: 'default-3',
        title: '全维数据洞察',
        description: '多维度数据分析，提供全面的市场洞察和风险评估',
        icon: '📊',
        order: 3,
      },
      {
        id: 'default-4',
        title: '金融级安全',
        description: '银行级别的安全防护，保障客户数据和交易安全',
        icon: '🔒',
        order: 4,
      },
    ];
  }
}

// 客户案例服务
export class ClientCaseService {
  static async getAll(): Promise<ClientCase[]> {
    try {
      if (!DATABASE_IDS.COMPANY) return this.getDefaultCases();

      const rawData = await queryDatabase(DATABASE_IDS.COMPANY, {
        property: 'Type',
        select: {
          equals: '客户案例',
        },
      });

      if (rawData.length === 0) return this.getDefaultCases();

      return transformClientCases(rawData).sort((a, b) => a.order - b.order);
    } catch (error) {
      console.error('Error fetching client cases:', error);
      return this.getDefaultCases();
    }
  }

  // 默认客户案例（当 Notion 中没有数据时使用）
  private static getDefaultCases(): ClientCase[] {
    return [
      {
        id: 'default-client-1',
        name: '某大型券商',
        logo: '', // 不使用图片，改用文字显示
        description: '通过我们的智能交易系统，提升了交易效率50%',
        industry: '证券',
        order: 1,
      },
      {
        id: 'default-client-2',
        name: '某财富管理公司',
        logo: '', // 不使用图片，改用文字显示
        description: '使用我们的智能投顾解决方案，客户满意度提升30%',
        industry: '财富管理',
        order: 2,
      },
      {
        id: 'default-client-3',
        name: '某私募基金',
        logo: '', // 不使用图片，改用文字显示
        description: '借助我们的量化交易平台，年化收益率显著提升',
        industry: '私募',
        order: 3,
      },
    ];
  }
}

// 网站配置服务
export class SiteConfigService {
  static async getConfig(): Promise<SiteConfig | null> {
    try {
      if (!DATABASE_IDS.COMPANY) return this.getDefaultConfig();

      const rawData = await queryDatabase(DATABASE_IDS.COMPANY, {
        property: 'Type',
        select: {
          equals: '网站配置',
        },
      });

      if (rawData.length === 0) return this.getDefaultConfig();

      const configData = rawData[0] as any;
      const properties = configData.properties;

      return {
        id: configData.id,
        siteName:
          getPlainText(properties.SiteName?.rich_text || []) || 
          getTitle(properties.SiteName || properties.Name) || 'AI金融科技',
        logo:
          properties.Logo?.files?.[0]?.file?.url ||
          properties.Logo?.files?.[0]?.external?.url ||
          '',
        favicon:
          properties.Favicon?.files?.[0]?.file?.url ||
          properties.Favicon?.files?.[0]?.external?.url ||
          '',
        description:
          getPlainText(properties.Description?.rich_text || []) ||
          '专业的证券AI解决方案提供商',
        keywords: getMultiSelect(properties.Keywords) || [],
        wechatQrCode:
          properties.WechatQrCode?.files?.[0]?.file?.url ||
          properties.WechatQrCode?.files?.[0]?.external?.url ||
          '',
                 contactPhone:
           getPhoneNumber(properties.ContactPhone) || 
           getPlainText(properties.ContactPhone?.rich_text || []) ||
           '400-123-4567',
         contactEmail:
           getEmail(properties.ContactEmail) || 
           getPlainText(properties.ContactEmail?.rich_text || []) ||
           'info@aifintech.com',
        address: getPlainText(properties.Address?.rich_text || []) || '',
                 socialLinks: {
           wechat: getUrl(properties.WechatLink) || getPlainText(properties.WechatLink?.rich_text || []),
           linkedin: getUrl(properties.LinkedinLink) || getPlainText(properties.LinkedinLink?.rich_text || []),
           weibo: getUrl(properties.WeiboLink) || getPlainText(properties.WeiboLink?.rich_text || []),
         },
        createdTime: configData.created_time,
        updatedTime: configData.last_edited_time,
      };
    } catch (error) {
      console.error('Error fetching site config:', error);
      return this.getDefaultConfig();
    }
  }

  private static getDefaultConfig(): SiteConfig {
    return {
      id: 'default-site-config',
      siteName: 'AI金融科技',
      logo: '',
      favicon: '',
      description: '专业的证券AI解决方案提供商',
      keywords: ['AI金融', '证券科技', '智能交易', '量化投资'],
      wechatQrCode: '',
      contactPhone: '400-123-4567',
      contactEmail: 'info@aifintech.com',
      address: '',
      socialLinks: {},
      createdTime: new Date().toISOString(),
      updatedTime: new Date().toISOString(),
    };
  }
}

// 导航菜单服务
export class NavigationService {
  static async getMenus(): Promise<NavigationMenu[]> {
    try {
      if (!DATABASE_IDS.COMPANY) return this.getDefaultMenus();

      const rawData = await queryDatabase(DATABASE_IDS.COMPANY, {
        property: 'Type',
        select: {
          equals: '导航菜单',
        },
      });

      if (rawData.length === 0) return this.getDefaultMenus();

      const menus = rawData.map((item: any) => {
        const properties = item.properties;
        return {
          id: item.id,
          name: getTitle(properties.Name),
          href: getPlainText(properties.Href?.rich_text || []),
          description: getPlainText(properties.Description?.rich_text || []),
          order: properties.Order?.number || 0,
          parentId: getPlainText(properties.ParentId?.rich_text || []),
          isDropdown: properties.IsDropdown?.checkbox || false,
          status: getSelect(properties.Status),
        };
      });

      return menus
        .filter((menu) => menu.status === '已启用')
        .sort((a, b) => a.order - b.order);
    } catch (error) {
      console.error('Error fetching navigation menus:', error);
      return this.getDefaultMenus();
    }
  }

  private static getDefaultMenus(): NavigationMenu[] {
    return [
      {
        id: 'nav-home',
        name: '首页',
        href: '/',
        order: 1,
        isDropdown: false,
        status: '已启用',
      },
      {
        id: 'nav-products',
        name: '产品中心',
        href: '/products',
        order: 2,
        isDropdown: true,
        status: '已启用',
      },
      {
        id: 'nav-solutions',
        name: '解决方案',
        href: '/solutions',
        order: 3,
        isDropdown: true,
        status: '已启用',
      },
      {
        id: 'nav-about',
        name: '关于我们',
        href: '/about',
        order: 4,
        isDropdown: false,
        status: '已启用',
      },
      {
        id: 'nav-news',
        name: '企业动态',
        href: '/news',
        order: 5,
        isDropdown: false,
        status: '已启用',
      },
    ];
  }
}

// 统一的数据服务
export class NotionDataService {
  static readonly Product = ProductService;
  static readonly Solution = SolutionService;
  static readonly News = NewsService;
  static readonly Company = CompanyService;
  static readonly CoreAdvantage = CoreAdvantageService;
  static readonly ClientCase = ClientCaseService;
  static readonly SiteConfig = SiteConfigService;
  static readonly Navigation = NavigationService;

  // 获取首页所需的所有数据
  static async getHomepageData() {
    try {
      const [
        products,
        solutions,
        news,
        companyInfo,
        coreAdvantages,
        clientCases,
      ] = await Promise.all([
        this.Product.getAll(),
        this.Solution.getAll(),
        this.News.getLatest(4),
        this.Company.getInfo(),
        this.CoreAdvantage.getAll(),
        this.ClientCase.getAll(),
      ]);

      return {
        products,
        solutions,
        news,
        companyInfo,
        coreAdvantages,
        clientCases,
      };
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      return {
        products: [],
        solutions: [],
        news: [],
        companyInfo: null,
        coreAdvantages: CoreAdvantageService['getDefaultAdvantages'](),
        clientCases: ClientCaseService['getDefaultCases'](),
      };
    }
  }
}
