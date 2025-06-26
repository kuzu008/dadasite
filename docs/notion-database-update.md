# Notion 数据库更新指南

## 新增功能说明

我们刚刚为网站添加了以下新功能：

1. **导航栏下拉菜单** - 产品中心和解决方案支持子菜单
2. **微信公众号二维码** - 页脚可展示二维码
3. **远程配置支持** - Logo、联系信息等可通过 Notion 管理

## 数据库字段更新

### 第一步：更新 Type 选择项

在您的"公司信息"数据库中，找到 `Type` 字段，添加以下新选项：

- `网站配置`
- `导航菜单`

### 第二步：添加网站配置相关字段

在数据库中添加以下新属性：

#### 基础配置字段
- `SiteName` (Rich text) - 网站名称
- `Favicon` (Files & media) - 网站图标
- `Keywords` (Multi-select) - 关键词

#### 联系信息字段
- `ContactPhone` (Rich text) - 联系电话
- `ContactEmail` (Rich text) - 联系邮箱

#### 社交媒体字段
- `WechatLink` (Rich text) - 微信链接
- `LinkedinLink` (Rich text) - LinkedIn链接
- `WeiboLink` (Rich text) - 微博链接
- `WechatQrCode` (Files & media) - 微信公众号二维码

#### 导航菜单字段
- `Href` (Rich text) - 链接地址
- `ParentId` (Rich text) - 父级菜单ID (用于子菜单)
- `IsDropdown` (Checkbox) - 是否下拉菜单
- `Status` (Select) - 状态
  - 选项: `已启用`, `已禁用`

### 第三步：创建示例数据

#### 网站配置示例

创建一条记录：
- **Name**: "网站基础配置"
- **Type**: "网站配置"
- **SiteName**: "AI金融科技"
- **ContactPhone**: "400-123-4567"
- **ContactEmail**: "info@aifintech.com"
- **Keywords**: ["AI金融", "证券科技", "智能交易"]

#### 微信二维码配置

如果您有微信公众号二维码：
- 将二维码图片上传到 `WechatQrCode` 字段
- 页脚会自动显示二维码和扫码提示

#### 导航菜单示例

创建以下导航菜单记录：

1. **首页**
   - Name: "首页"
   - Type: "导航菜单"
   - Href: "/"
   - Order: 1
   - IsDropdown: false
   - Status: "已启用"

2. **产品中心** (父菜单)
   - Name: "产品中心"
   - Type: "导航菜单"
   - Href: "/products"
   - Order: 2
   - IsDropdown: true
   - Status: "已启用"

3. **智能行情** (子菜单)
   - Name: "智能行情"
   - Type: "导航菜单"
   - Href: "/products/market-intelligence"
   - Description: "实时市场数据分析与智能预测"
   - Order: 1
   - ParentId: "products"
   - IsDropdown: false
   - Status: "已启用"

## 配置验证

完成配置后，您可以：

1. 访问 http://localhost:3001 查看主页
2. 鼠标悬停在"产品中心"和"解决方案"上查看下拉菜单
3. 查看页脚是否显示了配置的联系信息和二维码
4. 检查 Header 中的 Logo 是否从 Notion 加载

## 故障排除

### 如果看不到配置效果：

1. **检查数据库 ID**
   ```bash
   # 确认环境变量中的数据库 ID 是否正确
   cat .env.local | grep NOTION_COMPANY_DB_ID
   ```

2. **检查 Integration 权限**
   - 在 Notion 数据库页面点击 "Share"
   - 确认 Integration 有 "Can edit" 权限

3. **检查数据格式**
   - Type 字段必须完全匹配："网站配置"、"导航菜单"
   - 字段名称必须完全匹配（区分大小写）

### 调试命令

```bash
# 重启开发服务器
npm run dev

# 查看 Notion API 调用日志
# 在浏览器控制台查看是否有错误信息
```

## 效果预览

配置完成后，您的网站将具备：

- ✅ 动态导航菜单（支持从 Notion 管理）
- ✅ 智能下拉子菜单
- ✅ 微信公众号二维码展示
- ✅ 远程配置的 Logo 和联系信息
- ✅ 社交媒体链接管理

这样您就可以通过 Notion 轻松管理网站的所有配置信息，无需修改代码！ 