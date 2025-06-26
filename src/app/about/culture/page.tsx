'use client';

import React from 'react';
import Link from 'next/link';
import { Section, Container } from '@/components';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { COMPANY_VALUES, COMPANY_MILESTONES } from '@/config/about';

const CulturePage = () => {
  const benefits = [
    {
      category: '薪酬福利',
      icon: '💰',
      items: [
        '具有竞争力的薪资待遇',
        '年终奖金与股权激励',
        '五险一金+ 补充商业保险',
        '年度调薪与晋升机会'
      ]
    },
    {
      category: '学习成长',
      icon: '��',
      items: [
        '技术培训与认证支持',
        '行业会议与研讨会',
        '内部技术分享与交流',
        '导师制与职业规划'
      ]
    },
    {
      category: '工作环境',
      icon: '🏢',
      items: [
        '现代化办公环境',
        '灵活的工作时间',
        '远程办公支持',
        '团队建设活动'
      ]
    },
    {
      category: '生活平衡',
      icon: '⚖️',
      items: [
        '带薪年假与病假',
        '健康体检与健身补贴',
        '员工餐厅与下午茶',
        '节日礼品与生日关怀'
      ]
    }
  ];

  const workEnvironment = [
    {
      title: '开放协作',
      description: '扁平化组织结构，鼓励跨部门协作与交流',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      features: ['开放办公', '跨部门协作', '定期team building']
    },
    {
      title: '创新驱动',
      description: '鼓励创新思维，支持新技术探索与应用',
      image: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400&h=300&fit=crop',
      features: ['技术创新', '产品创新', '流程优化']
    },
    {
      title: '学习成长',
      description: '提供丰富的学习资源和成长机会',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop',
      features: ['培训体系', '知识分享', '职业发展']
    }
  ];

  return (
    <>
      {/* Header */}
      <Section className="bg-gradient-to-br from-purple-50 to-pink-100 py-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <Link 
                href="/about"
                className="text-purple-600 hover:text-purple-700 inline-flex items-center"
              >
                ← 返回关于我们
              </Link>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              企业文化
            </h1>
            <p className="text-xl text-gray-600">
              塑造积极向上的企业文化，打造有归属感的工作环境
            </p>
          </div>
        </Container>
      </Section>

      {/* Core Values */}
      <Section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">核心价值观</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              我们的价值观是企业文化的基石，指导着每个人的行为和决策
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {COMPANY_VALUES.map((value) => (
              <Card key={value.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      value.color === 'blue' ? 'bg-blue-100' :
                      value.color === 'green' ? 'bg-green-100' :
                      value.color === 'red' ? 'bg-red-100' :
                      'bg-purple-100'
                    }`}>
                      <span className="text-2xl">{value.icon}</span>
                    </div>
                    <CardTitle className="text-2xl">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Work Environment */}
      <Section className="bg-gray-50 py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">工作环境</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              创造有利于创新和协作的工作环境
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {workEnvironment.map((env, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={env.image} 
                    alt={env.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{env.title}</CardTitle>
                  <CardDescription>{env.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {env.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">员工福利</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              全面的员工福利体系，关爱每一位团队成员
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">{benefit.icon}</span>
                  </div>
                  <CardTitle className="text-xl">{benefit.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {benefit.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Employee Stories */}
      <Section className="bg-gray-50 py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">员工心声</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              听听我们团队成员的真实感受
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "在这里工作两年了，最大的感受是团队氛围特别好，大家互相帮助，共同成长。技术栈也很前沿，能学到很多东西。",
                author: "李工程师",
                role: "后端开发工程师",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
              },
              {
                quote: "公司给了我很多学习和成长的机会，从初级工程师到现在的技术专家，感谢团队的支持和信任。",
                author: "王专家",
                role: "前端技术专家",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
              },
              {
                quote: "作为产品经理，我很喜欢这里的工作节奏和创新氛围。每个想法都能得到重视和讨论，很有成就感。",
                author: "张经理",
                role: "产品经理",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b0e8?w=60&h=60&fit=crop&crop=face"
              }
            ].map((story, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <blockquote className="text-gray-600 italic mb-4">
                    "{story.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <img 
                      src={story.avatar} 
                      alt={story.author}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{story.author}</div>
                      <div className="text-sm text-gray-500">{story.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-blue-600 py-16">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">加入我们的大家庭</h2>
            <p className="text-xl text-blue-100 mb-8">
              体验我们的企业文化，与优秀的团队一起成长
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-700 hover:bg-blue-800">
                查看招聘职位
              </Button>
              <Button variant="outline" size="lg" className="bg-white text-blue-600 border-white hover:bg-blue-50">
                <Link href="/about/team">认识我们的团队</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default CulturePage;
