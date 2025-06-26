# Notion 数据库配置指南

## 概述

本项目使用 Notion 作为 CMS (内容管理系统)，需要在 Notion 中创建相应的数据库，并在环境变量中配置数据库 ID。

## 必需的环境变量

在 `.env.local` 文件中添加以下环境变量：

```env
# Notion 配置
NOTION_TOKEN=your_notion_integration_token
NOTION_PRODUCTS_DB_ID=your_products_database_id
NOTION_SOLUTIONS_DB_ID=your_solutions_database_id
NOTION_NEWS_DB_ID=your_news_database_id
NOTION_COMPANY_DB_ID=your_company_database_id

# 关于我们页面相关数据库
NOTION_TEAM_DB_ID=your_team_database_id
NOTION_VALUES_DB_ID=your_values_database_id
NOTION_MILESTONES_DB_ID=your_milestones_database_id
NOTION_OFFICES_DB_ID=your_offices_database_id
```

## 数据库结构要求

### 1. 团队成员数据库 (NOTION_TEAM_DB_ID)

| 属性名 | 类型 | 说明 |
|--------|------|------|
| Name/Title | 标题 | 成员姓名 |
| Position | 富文本 | 职位 |
| Department | 选择 | 部门 (管理层、技术团队、产品团队等) |
| Bio | 富文本 | 个人简介 |
| Avatar | 文件 | 头像照片 |
| Expertise | 多选 | 专业技能 |
| Experience | 富文本 | 工作经验 |
| Email | 邮箱 | 联系邮箱 |
| LinkedIn | URL | LinkedIn 链接 |
| Order | 数字 | 排序权重 |
| Status | 选择 | 状态 (在职、离职等) |

### 2. 公司价值观数据库 (NOTION_VALUES_DB_ID)

| 属性名 | 类型 | 说明 |
|--------|------|------|
| Name/Title | 标题 | 价值观标题 |
| Description | 富文本 | 价值观描述 |
| Icon | 富文本 | 图标 (emoji) |
| Color | 富文本 | 主题色 (#3B82F6 或 blue) |
| Order | 数字 | 排序权重 |
| Status | 选择 | 状态 (启用、禁用) |

### 3. 公司里程碑数据库 (NOTION_MILESTONES_DB_ID)

| 属性名 | 类型 | 说明 |
|--------|------|------|
| Name/Title | 标题 | 里程碑标题 |
| Year | 富文本 | 年份 |
| Quarter | 富文本 | 季度 (可选) |
| Description | 富文本 | 详细描述 |
| Impact | 富文本 | 影响和成果 |
| Icon | 富文本 | 图标 (emoji) |
| Order | 数字 | 排序权重 |
| Status | 选择 | 状态 (已发布、草稿) |

### 4. 办公地址数据库 (NOTION_OFFICES_DB_ID)

| 属性名 | 类型 | 说明 |
|--------|------|------|
| City/Name | 标题 | 城市/办公室名称 |
| Address | 富文本 | 详细地址 |
| Phone | 富文本 | 联系电话 |
| Email | 富文本 | 联系邮箱 |
| IsHeadquarters | 复选框 | 是否为总部 |
| Coordinates | 富文本 | 坐标 (格式: "纬度,经度") |
| Order | 数字 | 排序权重 |
| Status | 选择 | 状态 (开放、关闭) |

### 5. 企业动态数据库 (NOTION_NEWS_DB_ID)

| 属性名 | 类型 | 说明 |
|--------|------|------|
| Name/Title | 标题 | 文章标题 |
| Summary | 富文本 | 文章摘要 |
| Content | 富文本 | 文章正文内容 |
| Category | 选择 | 分类 (公司新闻、产品更新、行业洞察、技术分享) |
| PublishDate | 日期 | 发布日期 |
| Status | 选择 | 状态 (已发布、草稿、下线) |
| Author | 富文本 | 作者 |
| Image | 文件 | 文章封面图片 |
| Tags | 多选 | 文章标签 |
| Order | 数字 | 排序权重 |

### 6. 公司信息数据库 (NOTION_COMPANY_DB_ID)

| 属性名 | 类型 | 说明 |
|--------|------|------|
| Name/CompanyName | 标题 | 公司名称 |
| Description | 富文本 | 公司描述 |
| Vision | 富文本 | 愿景 |
| Mission | 富文本 | 使命 |
| Values | 多选 | 核心价值观 |
| History | 富文本 | 公司历史 |
| Address | 富文本 | 公司地址 |
| Phone | 富文本 | 联系电话 |
| Email | 富文本 | 联系邮箱 |
| Website | 富文本 | 官网地址 |
| FoundedYear | 数字 | 成立年份 |
| EmployeeCount | 选择 | 员工数量 |
| Logo | 文件 | 公司logo |

## 数据库设置步骤

1. **创建 Notion Integration**
   - 访问 https://www.notion.so/my-integrations
   - 点击 "New integration"
   - 填写基本信息并创建
   - 复制 "Internal Integration Token"

2. **创建数据库**
   - 在 Notion 中创建新页面
   - 添加数据库，按照上述结构配置属性
   - 确保数据库有适当的权限设置

3. **连接 Integration**
   - 在每个数据库页面，点击右上角的 "Share"
   - 邀请你的 Integration

4. **获取数据库 ID**
   - 打开数据库页面
   - 从 URL 中复制数据库 ID (32位字符串)
   - 格式: https://notion.so/your-workspace/database-id?v=view-id

5. **配置环境变量**
   - 将获取的 token 和数据库 ID 添加到 `.env.local` 文件

## 示例数据

### 团队成员示例
- **Name**: 张明华
- **Position**: 创始人 & CEO
- **Department**: 管理层
- **Bio**: 清华大学计算机科学博士，前高盛量化交易总监，拥有15年金融科技经验
- **Expertise**: 金融科技, 企业战略, 团队管理, 产品规划
- **Experience**: 15年+
- **Status**: 在职

### 公司价值观示例
- **Title**: 技术创新
- **Description**: 持续探索AI前沿技术，用创新驱动产品发展，为客户创造更大价值
- **Icon**: 🚀
- **Color**: blue
- **Status**: 启用

### 里程碑示例
- **Title**: 公司成立
- **Year**: 2019
- **Quarter**: Q3
- **Description**: 智金科技在上海正式成立，专注金融AI解决方案
- **Impact**: 获得天使轮融资
- **Icon**: 🏢
- **Status**: 已发布

### 企业动态示例
- **Title**: 公司荣获2025年度行业创新奖
- **Summary**: 我公司凭借在人工智能领域的突破性技术，荣获2025年度行业创新奖
- **Content**: 近日，在2025年全国科技创新大会上，我公司凭借在人工智能领域的突破性技术和优秀的市场表现...
- **Category**: 公司新闻
- **PublishDate**: 2025-06-20
- **Status**: 已发布
- **Author**: 李婷
- **Tags**: 公司新闻, 重要公告

## 注意事项

1. **权限设置**: 确保 Integration 有读取所有相关数据库的权限
2. **数据格式**: 富文本字段支持 Notion 的格式化文本
3. **图片处理**: 文件字段中的图片会自动生成访问 URL
4. **状态过滤**: API 会自动过滤掉非活跃状态的记录
5. **排序**: 数据会按照 Order 字段排序，数字越小越靠前

## 测试配置

配置完成后，可以访问以下端点测试：

- `/api/company-info` - 公司信息
- `/api/team-members` - 团队成员
- `/api/company-values` - 公司价值观
- `/api/company-milestones` - 公司里程碑
- `/api/office-locations` - 办公地址
- `/api/news` - 企业动态

如果配置正确，这些端点应该返回相应的 JSON 数据。
