#!/usr/bin/env node

const https = require('https');

// 从环境变量读取配置
const NOTION_TOKEN = process.env.NOTION_TOKEN || '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';
const DATABASE_ID = process.env.NOTION_COMPANY_DB_ID || '21a2e95687e980a2afa2c1be32e3d8c6';

async function verifyNotionConfig() {
  console.log('🔍 检查 Notion 配置状态...\n');

  try {
    // 检查数据库连接
    console.log('📡 测试数据库连接...');
    const response = await queryNotionDatabase();
    
    if (!response.results) {
      throw new Error('无法获取数据库数据');
    }

    console.log('✅ 数据库连接成功');
    console.log(`📊 找到 ${response.results.length} 条记录\n`);

    // 分析记录类型
    const records = response.results;
    const typeStats = {};
    let siteConfigFound = false;
    let navigationMenuFound = false;

    records.forEach(record => {
      const typeProperty = record.properties.Type;
      if (typeProperty && typeProperty.select) {
        const type = typeProperty.select.name;
        typeStats[type] = (typeStats[type] || 0) + 1;
        
        if (type === '网站配置') siteConfigFound = true;
        if (type === '导航菜单') navigationMenuFound = true;
      }
    });

    console.log('📋 记录类型统计:');
    Object.entries(typeStats).forEach(([type, count]) => {
      console.log(`  ${type}: ${count} 条`);
    });

    console.log('\n🎯 配置状态检查:');
    console.log(`  网站配置: ${siteConfigFound ? '✅ 已配置' : '❌ 未配置'}`);
    console.log(`  导航菜单: ${navigationMenuFound ? '✅ 已配置' : '❌ 未配置'}`);

    if (siteConfigFound) {
      // 检查网站配置详情
      const siteConfig = records.find(r => 
        r.properties.Type?.select?.name === '网站配置'
      );
      
      console.log('\n🌐 网站配置详情:');
      checkField(siteConfig, 'SiteName', 'Rich text');
      checkField(siteConfig, 'ContactPhone', 'Rich text');
      checkField(siteConfig, 'ContactEmail', 'Rich text');
      checkField(siteConfig, 'Logo', 'Files');
      checkField(siteConfig, 'WechatQrCode', 'Files');
    }

    console.log('\n🚀 测试建议:');
    console.log('  1. 访问 http://localhost:3001/test-config');
    console.log('  2. 查看 http://localhost:3001 首页效果');
    console.log('  3. 检查页脚是否显示配置信息');

  } catch (error) {
    console.error('❌ 配置检查失败:', error.message);
    console.log('\n🔧 建议检查:');
    console.log('  - NOTION_TOKEN 是否正确');
    console.log('  - 数据库 ID 是否正确');
    console.log('  - Integration 是否有数据库访问权限');
  }
}

function checkField(record, fieldName, expectedType) {
  if (!record || !record.properties[fieldName]) {
    console.log(`  ${fieldName}: ❌ 字段不存在`);
    return;
  }

  const field = record.properties[fieldName];
  let hasValue = false;
  
  if (expectedType === 'Rich text' && field.rich_text) {
    hasValue = field.rich_text.length > 0 && field.rich_text[0].plain_text.trim();
  } else if (expectedType === 'Files' && field.files) {
    hasValue = field.files.length > 0;
  }

  const status = hasValue ? '✅ 已配置' : '⚠️ 空值';
  console.log(`  ${fieldName}: ${status}`);
}

function queryNotionDatabase() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      page_size: 50
    });

    const options = {
      hostname: 'api.notion.com',
      port: 443,
      path: `/v1/databases/${DATABASE_ID}/query`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          if (res.statusCode === 200) {
            resolve(result);
          } else {
            reject(new Error(`API Error: ${result.message || 'Unknown error'}`));
          }
        } catch (error) {
          reject(new Error(`Parse Error: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Request Error: ${error.message}`));
    });

    req.write(data);
    req.end();
  });
}

// 运行验证
verifyNotionConfig();
