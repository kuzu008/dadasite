'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Section, Container } from '@/components';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageLoading } from '@/components/ui/Loading';
import {
  CompanyInfo,
  TeamMember,
  CompanyValue,
  CompanyMilestone,
  OfficeLocation,
} from '@/types/notion';

const AboutPage = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [companyValues, setCompanyValues] = useState<CompanyValue[]>([]);
  const [milestones, setMilestones] = useState<CompanyMilestone[]>([]);
  const [offices, setOffices] = useState<OfficeLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 并行获取所有数据
        const [
          companyResponse,
          teamResponse,
          valuesResponse,
          milestonesResponse,
          officesResponse,
        ] = await Promise.all([
          fetch('/api/company-info'),
          fetch('/api/team-members'),
          fetch('/api/company-values'),
          fetch('/api/company-milestones'),
          fetch('/api/office-locations'),
        ]);

        if (companyResponse.ok) {
          const companyData = await companyResponse.json();
          setCompanyInfo(companyData);
        }

        if (teamResponse.ok) {
          const teamData = await teamResponse.json();
          setTeamMembers(teamData);
        }

        if (valuesResponse.ok) {
          const valuesData = await valuesResponse.json();
          setCompanyValues(valuesData);
        }

        if (milestonesResponse.ok) {
          const milestonesData = await milestonesResponse.json();
          setMilestones(milestonesData);
        }

        if (officesResponse.ok) {
          const officesData = await officesResponse.json();
          setOffices(officesData);
        }

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('加载数据时出现错误');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <PageLoading />;
  }

  if (error) {
    return (
      <Section className="py-20">
        <Container>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">加载失败</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Button onClick={() => window.location.reload()}>重新加载</Button>
          </div>
        </Container>
      </Section>
    );
  }

  // 从团队成员中筛选管理层
  const managementTeam = teamMembers.filter(member => 
    member.department === '管理层'
  ).slice(0, 3);

  // 获取最近的里程碑
  const recentMilestones = milestones
    .sort((a, b) => b.year.localeCompare(a.year))
    .slice(0, 4);

  // 获取总部信息
  const headquarters = offices.find(office => office.isHeadquarters);

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              关于{companyInfo?.name || '智金科技'}
            </h1>
            <p className="text-xl text-blue-600 font-medium mb-6">
              用AI驱动金融智能化未来
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {companyInfo?.description || '专注于为证券、银行、基金等金融机构提供人工智能解决方案'}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
                <div className="text-sm text-gray-600">服务客户</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-sm text-gray-600">成功项目</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl font-bold text-purple-600 mb-2">5年+</div>
                <div className="text-sm text-gray-600">行业经验</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
                <div className="text-sm text-gray-600">客户满意度</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section className="py-16">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">我们的使命</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {companyInfo?.mission || '通过人工智能技术，为金融机构提供智能化解决方案，推动行业数字化转型，让金融服务更高效、更精准、更普惠。'}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">我们的愿景</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {companyInfo?.vision || '成为全球领先的金融AI技术服务商，引领金融科技创新，构建智能化金融生态。'}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Company Values */}
      <Section className="bg-gray-50 py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">核心价值观</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              这些价值观指导着我们的日常工作和长期发展
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value) => (
              <Card key={value.id} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                    value.color === '#3B82F6' || value.color === 'blue' ? 'bg-blue-100' :
                    value.color === '#10B981' || value.color === 'green' ? 'bg-green-100' :
                    value.color === '#EF4444' || value.color === 'red' ? 'bg-red-100' :
                    'bg-purple-100'
                  }`}>
                    <span className="text-3xl">{value.icon}</span>
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Management Team */}
      {managementTeam.length > 0 && (
        <Section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">管理团队</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                经验丰富的管理团队，引领公司持续发展
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {managementTeam.map((member) => (
                <Card key={member.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                      <img 
                        src={member.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-blue-600 font-medium">
                      {member.position}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/about/team">
                <Button>查看完整团队</Button>
              </Link>
            </div>
          </Container>
        </Section>
      )}

      {/* Timeline */}
      {recentMilestones.length > 0 && (
        <Section className="bg-gray-50 py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">发展历程</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                见证我们在金融AI领域的重要里程碑
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentMilestones.map((milestone) => (
                <Card key={milestone.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">{milestone.icon || '📈'}</span>
                    </div>
                    <CardTitle className="text-lg">{milestone.year}</CardTitle>
                    {milestone.quarter && (
                      <CardDescription className="text-blue-600 font-medium">
                        {milestone.quarter}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="text-center">
                    <h3 className="font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {milestone.description}
                    </p>
                    {milestone.impact && (
                      <p className="text-blue-600 text-sm font-medium">
                        {milestone.impact}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Office Locations */}
      {offices.length > 0 && (
        <Section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">办公地址</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                我们在全国各地设有办公室，为客户提供就近服务
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {offices.map((office) => (
                <Card key={office.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg">{office.city}</CardTitle>
                      {office.isHeadquarters && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          总部
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-3">{office.address}</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-500">📞 {office.phone}</p>
                      <p className="text-gray-500">✉️ {office.email}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

                         <div className="text-center mt-12">
               <Link href="/about/contact">
                 <Button>联系我们</Button>
               </Link>
             </div>
          </Container>
        </Section>
      )}

      {/* CTA Section */}
      <Section className="bg-blue-600 py-16">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">加入我们的团队</h2>
            <p className="text-xl text-blue-100 mb-8">
              与顶尖人才一起，用技术改变金融服务
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="bg-white text-blue-600 border-white hover:bg-blue-50">
                查看招聘职位
              </Button>
                             <Link href="/about/culture">
                 <Button size="lg" className="bg-blue-700 hover:bg-blue-800">了解企业文化</Button>
               </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default AboutPage;
