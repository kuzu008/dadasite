# 项目设置概览

## 项目信息

- **项目名称**: 软件企业主站
- **技术栈**: Next.js 15.3.4 + TypeScript + Tailwind CSS
- **开发模式**: 使用 Turbopack 进行快速开发

## 已完成的初始化设置

### ✅ 基础项目结构

```
src/
├── app/                 # Next.js App Router 页面
│   ├── layout.tsx      # 根布局
│   ├── page.tsx        # 首页
│   ├── globals.css     # 全局样式
│   └── favicon.ico     # 网站图标
├── components/         # 可复用组件
├── lib/               # 工具函数和库
└── types/             # TypeScript 类型定义

docs/
├── PRD.md             # 产品需求文档
└── tasks.md           # 任务看板
```

### ✅ 开发工具配置

- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化
- **TypeScript**: 类型安全
- **Tailwind CSS**: 样式框架

### ✅ 可用的 NPM 脚本

```bash
npm run dev          # 启动开发服务器 (使用 Turbopack)
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run lint         # 运行 ESLint 检查
npm run lint:fix     # 自动修复 ESLint 问题
npm run format       # 格式化所有代码
npm run format:check # 检查代码格式
```

### ✅ Notion API 集成

- **核心模块**: `src/lib/notion.ts` - 基础 API 调用
- **数据转换**: `src/lib/notion-transformer.ts` - 数据格式转换
- **服务层**: `src/lib/notion-service.ts` - 高级业务逻辑
- **类型定义**: `src/types/notion.ts` - TypeScript 类型
- **设置文档**: `docs/notion-setup.md` - 详细配置指南
- **测试页面**: `/test-notion` - 集成测试页面

### ✅ 公共组件开发

- **UI 组件**: `src/components/ui/` - 基础 UI 组件
  - `Button.tsx` - 多变体按钮组件
  - `Card.tsx` - 卡片组件及子组件
  - `Loading.tsx` - 加载指示器组件
- **布局组件**: `src/components/layout/` - 页面布局组件
  - `Header.tsx` - 导航栏组件
  - `Footer.tsx` - 页脚组件
  - `Layout.tsx` - 响应式布局框架
- **工具函数**: `src/lib/utils.ts` - CSS 类名合并工具
- **组件索引**: `src/components/index.ts` - 统一导出
- **测试页面**: `/test-components` - 组件展示页面

## 下一步计划

根据 `docs/tasks.md` 中的任务看板，下一步将进行：

1. **公共组件开发** - 创建导航栏、页脚等基础组件
2. **页面开发** - 开始构建各个页面模块

## 项目启动

```bash
# 安装依赖 (已完成)
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```
