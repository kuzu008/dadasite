// Notion 数据库记录的基础类型
export interface NotionPage {
  id: string;
  created_time: string;
  last_edited_time: string;
  properties: Record<string, any>;
  url: string;
}

// 产品类型
export interface Product {
  id: string;
  title: string;
  description: string;
  category: '智能行情' | '智能交易' | '智能资讯';
  features: string[];
  status: string;
  image?: string;
  createdTime: string;
  updatedTime: string;
}

// 解决方案类型
export interface Solution {
  id: string;
  title: string;
  description: string;
  category: '券商数字化转型' | '财富管理赋能' | '量化交易平台' | '合规与风控';
  challenges: string;
  approach: string;
  advantages: string[];
  relatedProducts: string[];
  status: string;
  image?: string;
  createdTime: string;
  updatedTime: string;
}

// 新闻/企业动态类型
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: '公司新闻' | '产品更新' | '行业洞察' | '技术分享';
  publishDate: string;
  status: string;
  author?: string;
  image?: string;
  tags: string[];
  createdTime: string;
  updatedTime: string;
}

// 公司信息类型
export interface CompanyInfo {
  id: string;
  name: string;
  description: string;
  vision: string;
  mission: string;
  values: string[];
  history: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  foundedYear: number;
  employeeCount: string;
  logo?: string;
  createdTime: string;
  updatedTime: string;
}

// 核心优势类型
export interface CoreAdvantage {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

// 客户案例类型
export interface ClientCase {
  id: string;
  name: string;
  logo: string;
  description?: string;
  industry: string;
  order: number;
  clientName?: string; // 兼容字段，映射到 name
  implementationDate?: string; // 可选的实施日期字段
}

// API 响应类型
export interface NotionResponse<T> {
  results: T[];
  next_cursor: string | null;
  has_more: boolean;
}

// 网站配置类型
export interface SiteConfig {
  id: string;
  siteName: string;
  logo: string;
  favicon: string;
  description: string;
  keywords: string[];
  wechatQrCode: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  socialLinks: {
    wechat?: string;
    linkedin?: string;
    weibo?: string;
  };
  createdTime: string;
  updatedTime: string;
}

// 导航菜单类型
export interface NavigationMenu {
  id: string;
  name: string;
  href: string;
  description?: string;
  order: number;
  parentId?: string;
  isDropdown: boolean;
  status: string;
}

// 团队成员类型
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  bio: string;
  avatar?: string;
  expertise: string[];
  experience: string;
  email?: string;
  linkedIn?: string;
  order: number;
  status: string;
  createdTime: string;
  updatedTime: string;
}

// 公司价值观类型
export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  status: string;
  createdTime: string;
  updatedTime: string;
}

// 公司里程碑类型
export interface CompanyMilestone {
  id: string;
  year: string;
  quarter?: string;
  title: string;
  description: string;
  impact?: string;
  icon?: string;
  order: number;
  status: string;
  createdTime: string;
  updatedTime: string;
}

// 办公地址类型
export interface OfficeLocation {
  id: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  isHeadquarters: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
  order: number;
  status: string;
  createdTime: string;
  updatedTime: string;
}

// 错误类型
export interface NotionError {
  message: string;
  code: string;
}
