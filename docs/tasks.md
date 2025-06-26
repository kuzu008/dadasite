# 项目开发任务看板

## To Do

- [ ] **页面开发 - 首页**
  - [ ] 开发【首屏】组件
  - [ ] 开发【核心优势】组件
  - [ ] 开发【产品概览】组件
  - [ ] 开发【解决方案】组件
  - [ ] 开发【客户案例】组件
  - [ ] 开发【企业动态】组件
  - [ ] 开发【联系我们】组件
  - [ ] 组合所有组件并从Notion获取数据
- [ ] **页面开发 - 产品中心**
  - [ ] 开发产品中心主页面布局及Tab切换
  - [ ] 开发"智能行情"产品列表与详情页
  - [ ] 开发"智能交易"产品列表与详情页
  - [ ] 开发"智能资讯"产品列表与详情页
- [ ] **页面开发 - 解决方案**
  - [ ] 开发解决方案主页面布局
  - [ ] 开发各解决方案详情页
- [ ] **页面开发 - 关于我们**
  - [ ] 开发关于我们页面
- [ ] **页面开发 - 企业动态**
  - [ ] 开发新闻列表页
  - [ ] 开发新闻详情页
- [ ] **部署与优化**
  - [ ] 部署到 Vercel 或其他平台
  - [ ] 进行性能优化 (图片、代码分割等)
  - [ ] SEO 基础设置

## Doing

- [ ] 暂无

## Done

- [x] **项目规划**
  - [x] PRD需求梳理与确认
- [x] **项目初始化与基础设置**
  - [x] 创建 Next.js 项目
  - [x] 引入并配置 Tailwind CSS
  - [x] 设置项目结构 (components, pages, styles, lib等)
  - [x] 配置 ESLint 和 Prettier 保证代码规范
- [x] **Notion API 集成**
  - [x] 设置 Notion Integration Token
  - [x] 编写 Notion 数据获取的通用模块 (`lib/notion.ts`)
  - [x] 定义并创建 Notion 端的数据结构 (Database)
  - [x] 创建数据转换工具 (`lib/notion-transformer.ts`)
  - [x] 创建高级服务层 (`lib/notion-service.ts`)
  - [x] 编写 Notion 设置文档 (`docs/notion-setup.md`)
  - [x] 配置环境变量和数据库权限
  - [x] 测试验证集成成功
- [x] **公共组件开发**
  - [x] 导航栏 (Header)
  - [x] 页脚 (Footer)
  - [x] 响应式布局框架 (Layout, Container, Section)
  - [x] 基础按钮、卡片等UI组件 (Button, Card, Loading)
  - [x] 组件导出索引文件 (`components/index.ts`)
  - [x] 工具函数库 (`lib/utils.ts`)
  - [x] 更新根布局应用新组件
  - [x] 创建组件测试页面 (`/test-components`)
- [x] **导航增强和远程配置**
  - [x] 开发 DropdownMenu 组件，支持鼠标悬停的下拉菜单
  - [x] 为 Header 添加产品中心和解决方案的下拉子菜单
  - [x] 为 Footer 添加微信公众号二维码展示功能
  - [x] 扩展 Notion 类型定义，支持网站配置和导航菜单
  - [x] 实现网站配置服务，支持 Logo、联系方式等远程配置
  - [x] 实现导航菜单服务，支持菜单的远程管理
  - [x] 更新 Notion 设置文档，添加新的数据库字段说明
  - [x] 创建配置测试页面 `/test-config` 验证远程配置功能
  - [x] 创建配置验证脚本 `verify-config.js` 检查配置状态
  - [x] 创建实战配置向导 `notion-setup-wizard.html` 指导用户配置
