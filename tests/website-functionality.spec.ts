import { test, expect } from '@playwright/test';

test.describe('智能交易产品中心测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001');
    await page.waitForLoadState('networkidle');
  });

  test('应该能从首页导航到智能交易页面', async ({ page }) => {
    // 点击首页智能交易的"了解更多"按钮
    const smartTradingButton = page.locator('text=智能交易').first().locator('..').locator('text=了解更多');
    await smartTradingButton.click();
    
    // 验证导航到智能交易页面
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*\/products\/smart-trading/);
    
    // 验证页面标题
    await expect(page.locator('h1')).toContainText('智能交易');
    await expect(page.locator('text=Smart Trading')).toBeVisible();
  });

  test('智能交易页面应该显示产品矩阵', async ({ page }) => {
    await page.goto('http://localhost:3001/products/smart-trading');
    await page.waitForLoadState('networkidle');
    
    // 验证产品矩阵标题
    await expect(page.locator('h2')).toContainText('产品矩阵');
    
    // 验证默认产品展示
    await expect(page.locator('text=算法交易系统')).toBeVisible();
    await expect(page.locator('text=投资组合交易')).toBeVisible();
    
    // 验证产品状态标签
    await expect(page.locator('text=正式版')).toBeVisible();
    
    // 验证产品功能特性
    await expect(page.locator('text=核心特性')).toBeVisible();
  });

  test('应该能导航到产品详情页', async ({ page }) => {
    await page.goto('http://localhost:3001/products/smart-trading');
    await page.waitForLoadState('networkidle');
    
    // 点击算法交易系统的"了解详情"按钮
    const detailButton = page.locator('text=算法交易系统').locator('..').locator('..').locator('text=了解详情');
    await detailButton.click();
    
    // 验证导航到详情页
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*\/products\/smart-trading\/algo-trading/);
    
    // 验证详情页内容
    await expect(page.locator('h1')).toContainText('算法交易系统');
    await expect(page.locator('text=功能特点')).toBeVisible();
    await expect(page.locator('text=相关产品')).toBeVisible();
  });

  test('页面不应该有重复的导航和页脚', async ({ page }) => {
    await page.goto('http://localhost:3001/products/smart-trading');
    await page.waitForLoadState('networkidle');
    
    // 验证只有一个导航栏
    const headers = await page.locator('header').count();
    expect(headers).toBe(1);
    
    // 验证只有一个页脚
    const footers = await page.locator('footer').count();
    expect(footers).toBe(1);
  });

  test('智能交易详情页不应该有重复的布局', async ({ page }) => {
    await page.goto('http://localhost:3001/products/smart-trading/algo-trading');
    await page.waitForLoadState('networkidle');
    
    // 验证只有一个导航栏
    const headers = await page.locator('header').count();
    expect(headers).toBe(1);
    
    // 验证只有一个页脚
    const footers = await page.locator('footer').count();
    expect(footers).toBe(1);
    
    // 验证页面内容正常显示
    await expect(page.locator('h1')).toContainText('算法交易系统');
    await expect(page.locator('text=免费试用')).toBeVisible();
    await expect(page.locator('text=预约演示')).toBeVisible();
  });
});