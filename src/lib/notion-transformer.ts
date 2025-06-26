import {
  Product,
  Solution,
  NewsItem,
  CompanyInfo,
  CoreAdvantage,
  ClientCase,
  TeamMember,
  CompanyValue,
  CompanyMilestone,
  OfficeLocation,
  NotionPage,
} from '@/types/notion';
import {
  getPlainText,
  getTitle,
  getSelect,
  getDate,
  getMultiSelect,
  getNumber,
  getCheckbox,
  getEmail,
  getUrl,
} from './notion';

// 转换产品数据
export function transformProduct(page: any): Product {
  const properties = page.properties;

  return {
    id: page.id,
    title: getTitle(properties.Name || properties.Title),
    description: getPlainText(properties.Description?.rich_text || []),
    category: getSelect(properties.Category) as Product['category'],
    features: getMultiSelect(properties.Features),
    status: getSelect(properties.Status),
    image:
      properties.Image?.files?.[0]?.file?.url ||
      properties.Image?.files?.[0]?.external?.url,
    createdTime: page.created_time,
    updatedTime: page.last_edited_time,
  };
}

// 转换解决方案数据
export function transformSolution(page: any): Solution {
  const properties = page.properties;

  return {
    id: page.id,
    title: getTitle(properties.Name || properties.Title),
    description: getPlainText(properties.Description?.rich_text || []),
    category: getSelect(properties.Category) as Solution['category'],
    challenges: getPlainText(properties.Challenges?.rich_text || []),
    approach: getPlainText(properties.Approach?.rich_text || []),
    advantages: getMultiSelect(properties.Advantages),
    relatedProducts: getMultiSelect(properties.RelatedProducts),
    status: getSelect(properties.Status),
    image:
      properties.Image?.files?.[0]?.file?.url ||
      properties.Image?.files?.[0]?.external?.url,
    createdTime: page.created_time,
    updatedTime: page.last_edited_time,
  };
}

// 转换新闻数据
export function transformNewsItem(page: any): NewsItem {
  const properties = page.properties;

  return {
    id: page.id,
    title: getTitle(properties.Name || properties.Title),
    summary: getPlainText(properties.Summary?.rich_text || []),
    content: getPlainText(properties.Content?.rich_text || []),
    category: getSelect(properties.Category) as NewsItem['category'],
    publishDate: getDate(properties.PublishDate),
    status: getSelect(properties.Status),
    author: getPlainText(properties.Author?.rich_text || []),
    image:
      properties.Image?.files?.[0]?.file?.url ||
      properties.Image?.files?.[0]?.external?.url,
    tags: getMultiSelect(properties.Tags),
    createdTime: page.created_time,
    updatedTime: page.last_edited_time,
  };
}

// 转换公司信息数据
export function transformCompanyInfo(page: any): CompanyInfo {
  const properties = page.properties;

  return {
    id: page.id,
    name: getTitle(properties.Name || properties.CompanyName),
    description: getPlainText(properties.Description?.rich_text || []),
    vision: getPlainText(properties.Vision?.rich_text || []),
    mission: getPlainText(properties.Mission?.rich_text || []),
    values: getMultiSelect(properties.Values),
    history: getPlainText(properties.History?.rich_text || []),
    address: getPlainText(properties.Address?.rich_text || []),
    phone: getPlainText(properties.Phone?.rich_text || []),
    email: getPlainText(properties.Email?.rich_text || []),
    website: getPlainText(properties.Website?.rich_text || []),
    foundedYear: properties.FoundedYear?.number || 0,
    employeeCount: getSelect(properties.EmployeeCount),
    logo:
      properties.Logo?.files?.[0]?.file?.url ||
      properties.Logo?.files?.[0]?.external?.url,
    createdTime: page.created_time,
    updatedTime: page.last_edited_time,
  };
}

// 转换核心优势数据
export function transformCoreAdvantage(page: any): CoreAdvantage {
  const properties = page.properties;

  return {
    id: page.id,
    title: getTitle(properties.Name || properties.Title),
    description: getPlainText(properties.Description?.rich_text || []),
    icon: getPlainText(properties.Icon?.rich_text || []),
    order: properties.Order?.number || 0,
  };
}

// 转换客户案例数据
export function transformClientCase(page: any): ClientCase {
  const properties = page.properties;

  return {
    id: page.id,
    name: getTitle(properties.Name || properties.ClientName),
    logo:
      properties.Logo?.files?.[0]?.file?.url ||
      properties.Logo?.files?.[0]?.external?.url ||
      '',
    description: getPlainText(properties.Description?.rich_text || []),
    industry: getSelect(properties.Industry),
    order: properties.Order?.number || 0,
  };
}

// 批量转换函数
export function transformProducts(pages: any[]): Product[] {
  return pages.map(transformProduct);
}

export function transformSolutions(pages: any[]): Solution[] {
  return pages.map(transformSolution);
}

export function transformNewsItems(pages: any[]): NewsItem[] {
  return pages.map(transformNewsItem);
}

export function transformCoreAdvantages(pages: any[]): CoreAdvantage[] {
  return pages.map(transformCoreAdvantage);
}

export function transformClientCases(pages: any[]): ClientCase[] {
  return pages.map(transformClientCase);
}

// 转换团队成员数据
export function transformTeamMember(page: any): TeamMember {
  const properties = page.properties;

  return {
    id: page.id,
    name: getTitle(properties.Name || properties.Title),
    position: getPlainText(properties.Position?.rich_text || []),
    department: getSelect(properties.Department),
    bio: getPlainText(properties.Bio?.rich_text || []),
    avatar:
      properties.Avatar?.files?.[0]?.file?.url ||
      properties.Avatar?.files?.[0]?.external?.url,
    expertise: getMultiSelect(properties.Expertise),
    experience: getPlainText(properties.Experience?.rich_text || []),
    email: getEmail(properties.Email),
    linkedIn: getUrl(properties.LinkedIn),
    order: getNumber(properties.Order),
    status: getSelect(properties.Status),
    createdTime: page.created_time,
    updatedTime: page.last_edited_time,
  };
}

// 转换公司价值观数据
export function transformCompanyValue(page: any): CompanyValue {
  const properties = page.properties;

  return {
    id: page.id,
    title: getTitle(properties.Name || properties.Title),
    description: getPlainText(properties.Description?.rich_text || []),
    icon: getPlainText(properties.Icon?.rich_text || []),
    color: getPlainText(properties.Color?.rich_text || []) || '#3B82F6',
    order: getNumber(properties.Order),
    status: getSelect(properties.Status),
    createdTime: page.created_time,
    updatedTime: page.last_edited_time,
  };
}

// 转换公司里程碑数据
export function transformCompanyMilestone(page: any): CompanyMilestone {
  const properties = page.properties;

  return {
    id: page.id,
    year: getPlainText(properties.Year?.rich_text || []),
    quarter: getPlainText(properties.Quarter?.rich_text || []),
    title: getTitle(properties.Name || properties.Title),
    description: getPlainText(properties.Description?.rich_text || []),
    impact: getPlainText(properties.Impact?.rich_text || []),
    icon: getPlainText(properties.Icon?.rich_text || []),
    order: getNumber(properties.Order),
    status: getSelect(properties.Status),
    createdTime: page.created_time,
    updatedTime: page.last_edited_time,
  };
}

// 转换办公地址数据
export function transformOfficeLocation(page: any): OfficeLocation {
  const properties = page.properties;

  // 处理坐标信息
  const coordinatesText = getPlainText(properties.Coordinates?.rich_text || []);
  let coordinates: { lat: number; lng: number } | undefined;
  
  if (coordinatesText) {
    try {
      const coords = coordinatesText.split(',').map(coord => parseFloat(coord.trim()));
      if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
        coordinates = { lat: coords[0], lng: coords[1] };
      }
    } catch (error) {
      console.warn('Failed to parse coordinates:', coordinatesText);
    }
  }

  return {
    id: page.id,
    city: getTitle(properties.City || properties.Name),
    address: getPlainText(properties.Address?.rich_text || []),
    phone: getPlainText(properties.Phone?.rich_text || []),
    email: getPlainText(properties.Email?.rich_text || []),
    isHeadquarters: getCheckbox(properties.IsHeadquarters),
    coordinates,
    order: getNumber(properties.Order),
    status: getSelect(properties.Status),
    createdTime: page.created_time,
    updatedTime: page.last_edited_time,
  };
}

// 新增批量转换函数
export function transformTeamMembers(pages: any[]): TeamMember[] {
  return pages.map(transformTeamMember);
}

export function transformCompanyValues(pages: any[]): CompanyValue[] {
  return pages.map(transformCompanyValue);
}

export function transformCompanyMilestones(pages: any[]): CompanyMilestone[] {
  return pages.map(transformCompanyMilestone);
}

export function transformOfficeLocations(pages: any[]): OfficeLocation[] {
  return pages.map(transformOfficeLocation);
}
