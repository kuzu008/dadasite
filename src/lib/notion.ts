import { Client } from '@notionhq/client';

// 初始化 Notion 客户端
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// 数据库 ID 配置
export const DATABASE_IDS = {
  PRODUCTS: process.env.NOTION_PRODUCTS_DB_ID || '',
  SOLUTIONS: process.env.NOTION_SOLUTIONS_DB_ID || '',
  NEWS: process.env.NOTION_NEWS_DB_ID || '',
  COMPANY: process.env.NOTION_COMPANY_DB_ID || '',
  TEAM: process.env.NOTION_TEAM_DB_ID || '',
  VALUES: process.env.NOTION_VALUES_DB_ID || '',
  MILESTONES: process.env.NOTION_MILESTONES_DB_ID || '',
  OFFICES: process.env.NOTION_OFFICES_DB_ID || '',
};

// 通用的数据库查询函数
export async function queryDatabase(databaseId: string, filter?: any) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter,
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
    });
    return response.results;
  } catch (error) {
    console.error('Error querying database:', error);
    return [];
  }
}

// 获取页面内容
export async function getPageContent(pageId: string) {
  try {
    const response = await notion.pages.retrieve({ page_id: pageId });
    return response;
  } catch (error) {
    console.error('Error retrieving page:', error);
    return null;
  }
}

// 获取页面的块内容
export async function getPageBlocks(pageId: string) {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
    });
    return response.results;
  } catch (error) {
    console.error('Error retrieving page blocks:', error);
    return [];
  }
}

// 产品相关的数据获取函数
export async function getProducts() {
  if (!DATABASE_IDS.PRODUCTS) {
    console.warn('NOTION_PRODUCTS_DB_ID not configured');
    return [];
  }

  return await queryDatabase(DATABASE_IDS.PRODUCTS, {
    property: 'Status',
    select: {
      equals: '已发布',
    },
  });
}

// 解决方案相关的数据获取函数
export async function getSolutions() {
  if (!DATABASE_IDS.SOLUTIONS) {
    console.warn('NOTION_SOLUTIONS_DB_ID not configured');
    return [];
  }

  return await queryDatabase(DATABASE_IDS.SOLUTIONS, {
    property: 'Status',
    select: {
      equals: '已发布',
    },
  });
}

// 新闻/企业动态相关的数据获取函数
export async function getNews(limit: number = 10) {
  if (!DATABASE_IDS.NEWS) {
    console.warn('NOTION_NEWS_DB_ID not configured');
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.NEWS,
      filter: {
        property: 'Status',
        select: {
          equals: '已发布',
        },
      },
      sorts: [
        {
          property: 'PublishDate',
          direction: 'descending',
        },
      ],
      page_size: limit,
    });
    return response.results;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

// 公司信息相关的数据获取函数
export async function getCompanyInfo() {
  if (!DATABASE_IDS.COMPANY) {
    console.warn('NOTION_COMPANY_DB_ID not configured');
    return null;
  }

  const results = await queryDatabase(DATABASE_IDS.COMPANY, {
    property: 'Type',
    select: {
      equals: '公司基本信息',
    },
  });
  return results.length > 0 ? results[0] : null;
}

// 辅助函数：从 Notion 属性中提取文本
export function getPlainText(richText: any[]): string {
  if (!richText || !Array.isArray(richText)) return '';
  return richText.map((text) => text.plain_text).join('');
}

// 辅助函数：从 Notion 属性中提取标题
export function getTitle(titleProperty: any): string {
  if (!titleProperty || !titleProperty.title) return '';
  return getPlainText(titleProperty.title);
}

// 辅助函数：从 Notion 属性中提取选择项
export function getSelect(selectProperty: any): string {
  if (!selectProperty || !selectProperty.select) return '';
  return selectProperty.select.name || '';
}

// 辅助函数：从 Notion 属性中提取日期
export function getDate(dateProperty: any): string {
  if (!dateProperty || !dateProperty.date) return '';
  return dateProperty.date.start || '';
}

// 辅助函数：从 Notion 属性中提取多选项
export function getMultiSelect(multiSelectProperty: any): string[] {
  if (!multiSelectProperty || !multiSelectProperty.multi_select) return [];
  return multiSelectProperty.multi_select.map((item: any) => item.name);
}

// 辅助函数：从 Notion 属性中提取电话号码
export function getPhoneNumber(phoneProperty: any): string {
  if (!phoneProperty) return '';
  return phoneProperty.phone_number || '';
}

// 辅助函数：从 Notion 属性中提取邮箱
export function getEmail(emailProperty: any): string {
  if (!emailProperty) return '';
  return emailProperty.email || '';
}

// 辅助函数：从 Notion 属性中提取URL
export function getUrl(urlProperty: any): string {
  if (!urlProperty) return '';
  return urlProperty.url || '';
}

// 辅助函数：从 Notion 属性中提取数字
export function getNumber(numberProperty: any): number {
  if (!numberProperty) return 0;
  return numberProperty.number || 0;
}

// 辅助函数：从 Notion 属性中提取复选框
export function getCheckbox(checkboxProperty: any): boolean {
  if (!checkboxProperty) return false;
  return checkboxProperty.checkbox || false;
}

// 团队成员相关的数据获取函数
export async function getTeamMembers() {
  if (!DATABASE_IDS.TEAM) {
    console.warn('NOTION_TEAM_DB_ID not configured');
    return [];
  }

  return await queryDatabase(DATABASE_IDS.TEAM, {
    property: 'Status',
    select: {
      equals: '在职',
    },
  });
}

// 公司价值观相关的数据获取函数
export async function getCompanyValues() {
  if (!DATABASE_IDS.VALUES) {
    console.warn('NOTION_VALUES_DB_ID not configured');
    return [];
  }

  return await queryDatabase(DATABASE_IDS.VALUES, {
    property: 'Status',
    select: {
      equals: '启用',
    },
  });
}

// 公司里程碑相关的数据获取函数
export async function getCompanyMilestones() {
  if (!DATABASE_IDS.MILESTONES) {
    console.warn('NOTION_MILESTONES_DB_ID not configured');
    return [];
  }

  return await queryDatabase(DATABASE_IDS.MILESTONES, {
    property: 'Status',
    select: {
      equals: '已发布',
    },
  });
}

// 办公地址相关的数据获取函数
export async function getOfficeLocations() {
  if (!DATABASE_IDS.OFFICES) {
    console.warn('NOTION_OFFICES_DB_ID not configured');
    return [];
  }

  return await queryDatabase(DATABASE_IDS.OFFICES, {
    property: 'Status',
    select: {
      equals: '开放',
    },
  });
}
