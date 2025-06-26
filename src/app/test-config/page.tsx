import { NotionDataService } from '@/lib/notion-service';

export default async function TestConfigPage() {
  let siteConfig = null;
  let navigation = null;
  let configError = null;
  let navError = null;

  // 测试网站配置
  try {
    siteConfig = await NotionDataService.SiteConfig.getConfig();
  } catch (error) {
    configError = error instanceof Error ? error.message : 'Unknown error';
  }

  // 测试导航菜单
  try {
    navigation = await NotionDataService.Navigation.getMenus();
  } catch (error) {
    navError = error instanceof Error ? error.message : 'Unknown error';
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">🧪 远程配置功能测试</h1>
      
      <div className="space-y-8">
        {/* 网站配置测试 */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="mr-2">🌐</span>
            网站配置测试
          </h2>
          
          {configError ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-medium text-red-800 mb-2">❌ 配置加载失败</h3>
              <p className="text-red-600 text-sm">{configError}</p>
              <div className="mt-4 text-sm text-red-700">
                <p>可能的原因：</p>
                <ul className="list-disc list-inside mt-2">
                  <li>数据库中没有 Type="网站配置" 的记录</li>
                  <li>缺少必要的数据库字段</li>
                  <li>Integration 权限不足</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-800 mb-4">✅ 配置加载成功</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border">
                    <span className="font-medium text-gray-700">网站名称:</span>
                    <span className="ml-2">{siteConfig?.siteName || '未配置'}</span>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <span className="font-medium text-gray-700">联系电话:</span>
                    <span className="ml-2">{siteConfig?.contactPhone || '未配置'}</span>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <span className="font-medium text-gray-700">联系邮箱:</span>
                    <span className="ml-2">{siteConfig?.contactEmail || '未配置'}</span>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <span className="font-medium text-gray-700">Logo:</span>
                    <span className="ml-2">
                      {siteConfig?.logo ? (
                        <a href={siteConfig.logo} target="_blank" className="text-blue-600 hover:underline">
                          查看图片
                        </a>
                      ) : '未配置'}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <span className="font-medium text-gray-700">微信二维码:</span>
                    <span className="ml-2">
                      {siteConfig?.wechatQrCode ? (
                        <a href={siteConfig.wechatQrCode} target="_blank" className="text-blue-600 hover:underline">
                          查看二维码
                        </a>
                      ) : '未配置'}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <span className="font-medium text-gray-700">关键词:</span>
                    <span className="ml-2">
                      {siteConfig?.keywords?.length ? siteConfig.keywords.join(', ') : '未配置'}
                    </span>
                  </div>
                </div>
                
                {/* 社交媒体链接 */}
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-medium text-gray-800 mb-2">社交媒体链接</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">微信:</span>
                      <span className="ml-2 text-sm">{siteConfig?.socialLinks?.wechat || '未配置'}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">LinkedIn:</span>
                      <span className="ml-2 text-sm">{siteConfig?.socialLinks?.linkedin || '未配置'}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">微博:</span>
                      <span className="ml-2 text-sm">{siteConfig?.socialLinks?.weibo || '未配置'}</span>
                    </div>
                  </div>
                </div>

                {/* 原始数据 */}
                <details className="bg-gray-50 p-4 rounded">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700">
                    查看原始配置数据
                  </summary>
                  <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto">
                    {JSON.stringify(siteConfig, null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          )}
        </section>

        {/* 导航菜单测试 */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="mr-2">🧭</span>
            导航菜单测试
          </h2>
          
          {navError ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-medium text-red-800 mb-2">❌ 导航菜单加载失败</h3>
              <p className="text-red-600 text-sm">{navError}</p>
              <div className="mt-4 text-sm text-red-700">
                <p>可能的原因：</p>
                <ul className="list-disc list-inside mt-2">
                  <li>数据库中没有 Type="导航菜单" 的记录</li>
                  <li>缺少必要的导航菜单字段</li>
                  <li>所有菜单状态都是"已禁用"</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-800 mb-4">✅ 导航菜单加载成功</h3>
              <p className="text-green-700 text-sm mb-4">
                找到 {navigation?.length || 0} 个菜单项
              </p>
              
              {navigation && navigation.length > 0 ? (
                <div className="space-y-3">
                  {navigation.map((menu) => (
                    <div key={menu.id} className="bg-white p-3 rounded border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="font-medium">{menu.name}</span>
                          <span className="text-sm text-gray-500">{menu.href}</span>
                          {menu.isDropdown && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              下拉菜单
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">Order: {menu.order}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            menu.status === '已启用' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {menu.status}
                          </span>
                        </div>
                      </div>
                      {menu.description && (
                        <p className="text-sm text-gray-600 mt-2">{menu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">当前使用默认导航菜单</p>
              )}

              {/* 原始数据 */}
              <details className="bg-gray-50 p-4 rounded mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700">
                  查看原始导航数据
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto">
                  {JSON.stringify(navigation, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </section>

        {/* 配置指南 */}
        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center text-blue-800">
            <span className="mr-2">📖</span>
            配置指南
          </h2>
          
          <div className="space-y-4 text-blue-700">
            <p>要启用远程配置功能，请在 Notion 数据库中添加以下数据：</p>
            
            <div className="bg-white p-4 rounded border">
              <h3 className="font-medium mb-2">网站配置记录</h3>
              <ul className="text-sm space-y-1">
                <li>• Name: "网站基础配置"</li>
                <li>• Type: "网站配置"</li>
                <li>• SiteName: "您的网站名称"</li>
                <li>• ContactPhone: "400-123-4567"</li>
                <li>• ContactEmail: "info@yoursite.com"</li>
                <li>• 可选：上传 Logo 和微信二维码图片</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded border">
              <h3 className="font-medium mb-2">导航菜单记录</h3>
              <ul className="text-sm space-y-1">
                <li>• 为每个菜单项创建一条记录</li>
                <li>• Type: "导航菜单"</li>
                <li>• 设置 Name, Href, Order, Status 等字段</li>
                <li>• Status 必须设为"已启用"才会显示</li>
              </ul>
            </div>
            
            <p className="text-sm">
              详细配置步骤请参考：
              <a href="/notion-config-helper.html" target="_blank" className="underline">
                Notion 配置指南
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
