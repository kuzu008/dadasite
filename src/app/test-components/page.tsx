import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Container,
  Section,
  Loading,
} from '@/components';

export default function TestComponentsPage() {
  return (
    <div>
      {/* Hero Section */}
      <Section background="blue" padding="xl">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
              组件库测试页面
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              展示我们创建的所有 UI 组件的效果和样式
            </p>
          </div>
        </Container>
      </Section>

      {/* Buttons Section */}
      <Section>
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">按钮组件</h2>
          <div className="space-y-6">
            {/* Primary Buttons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">主要按钮</h3>
              <div className="flex flex-wrap gap-4">
                <Button size="sm">小尺寸</Button>
                <Button size="md">中等尺寸</Button>
                <Button size="lg">大尺寸</Button>
                <Button loading>加载中</Button>
              </div>
            </div>

            {/* Button Variants */}
            <div>
              <h3 className="text-lg font-semibold mb-4">按钮变体</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">主要按钮</Button>
                <Button variant="secondary">次要按钮</Button>
                <Button variant="outline">边框按钮</Button>
                <Button variant="ghost">幽灵按钮</Button>
                <Button variant="link">链接按钮</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Cards Section */}
      <Section background="gray">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">卡片组件</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Default Card */}
            <Card>
              <CardHeader>
                <CardTitle>默认卡片</CardTitle>
                <CardDescription>这是一个默认样式的卡片组件</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  卡片内容区域，可以放置任何内容，如文本、图片、表单等。
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm">查看详情</Button>
              </CardFooter>
            </Card>

            {/* Bordered Card */}
            <Card variant="bordered">
              <CardHeader>
                <CardTitle>边框卡片</CardTitle>
                <CardDescription>
                  这是一个带有悬停效果的边框卡片
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  鼠标悬停时边框颜色会发生变化，提供更好的交互反馈。
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  了解更多
                </Button>
              </CardFooter>
            </Card>

            {/* Elevated Card */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>阴影卡片</CardTitle>
                <CardDescription>这是一个带有阴影效果的卡片</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  具有阴影效果，悬停时阴影会增强，营造立体感。
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm">
                  立即体验
                </Button>
              </CardFooter>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Loading Section */}
      <Section>
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">加载组件</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">不同尺寸</h3>
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <Loading size="sm" />
                  <p className="mt-2 text-sm text-gray-600">小尺寸</p>
                </div>
                <div className="text-center">
                  <Loading size="md" />
                  <p className="mt-2 text-sm text-gray-600">中等尺寸</p>
                </div>
                <div className="text-center">
                  <Loading size="lg" />
                  <p className="mt-2 text-sm text-gray-600">大尺寸</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">带文本的加载</h3>
              <Loading size="md" text="正在加载数据..." />
            </div>
          </div>
        </Container>
      </Section>

      {/* Layout Examples */}
      <Section background="gray">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">布局示例</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card padding="sm">
                <div className="text-center">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <span className="text-blue-600 text-xl">📊</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">智能行情</h3>
                  <p className="text-sm text-gray-600 mt-1">实时市场数据分析</p>
                </div>
              </Card>

              <Card padding="sm">
                <div className="text-center">
                  <div className="h-12 w-12 bg-green-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <span className="text-green-600 text-xl">💹</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">智能交易</h3>
                  <p className="text-sm text-gray-600 mt-1">自动化交易执行</p>
                </div>
              </Card>

              <Card padding="sm">
                <div className="text-center">
                  <div className="h-12 w-12 bg-purple-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <span className="text-purple-600 text-xl">📰</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">智能资讯</h3>
                  <p className="text-sm text-gray-600 mt-1">AI驱动的资讯分析</p>
                </div>
              </Card>

              <Card padding="sm">
                <div className="text-center">
                  <div className="h-12 w-12 bg-orange-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <span className="text-orange-600 text-xl">🔒</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">风险控制</h3>
                  <p className="text-sm text-gray-600 mt-1">智能风险管理</p>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Container Sizes */}
      <Section>
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">容器尺寸</h2>
          <div className="space-y-4">
            <Container size="sm" className="bg-blue-50 py-4 rounded-lg">
              <p className="text-center text-gray-600">小容器 (max-w-3xl)</p>
            </Container>
            <Container size="md" className="bg-green-50 py-4 rounded-lg">
              <p className="text-center text-gray-600">中等容器 (max-w-5xl)</p>
            </Container>
            <Container size="lg" className="bg-purple-50 py-4 rounded-lg">
              <p className="text-center text-gray-600">
                大容器 (max-w-7xl) - 默认
              </p>
            </Container>
          </div>
        </Container>
      </Section>
    </div>
  );
}
