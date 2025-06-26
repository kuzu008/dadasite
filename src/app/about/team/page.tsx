'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Section, Container } from '@/components';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageLoading } from '@/components/ui/Loading';
import { TeamMember } from '@/types/notion';

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState('全部');

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/team-members');
        
        if (response.ok) {
          const data = await response.json();
          setTeamMembers(data);
        } else {
          setError('获取团队数据失败');
        }
      } catch (err) {
        console.error('Error fetching team members:', err);
        setError('加载数据时出现错误');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
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

  // 获取所有部门
  const departments = ['全部', ...Array.from(new Set(teamMembers.map(member => member.department)))];

  // 根据选择的部门过滤团队成员
  const filteredMembers = selectedDepartment === '全部' 
    ? teamMembers 
    : teamMembers.filter(member => member.department === selectedDepartment);

  return (
    <>
      {/* Header */}
      <Section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <Link 
                href="/about"
                className="text-blue-600 hover:text-blue-700 inline-flex items-center"
              >
                ← 返回关于我们
              </Link>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              我们的团队
            </h1>
            <p className="text-xl text-gray-600">
              由金融专家、技术专家和产品专家组成的世界级团队
            </p>
          </div>
        </Container>
      </Section>

      {/* Team Members */}
      <Section className="py-16">
        <Container>
          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {departments.map((dept) => (
              <Button
                key={dept}
                variant={selectedDepartment === dept ? 'primary' : 'outline'}
                onClick={() => setSelectedDepartment(dept)}
              >
                {dept}
                <span className="ml-2 text-sm">
                  ({dept === '全部' ? teamMembers.length : teamMembers.filter(m => m.department === dept).length})
                </span>
              </Button>
            ))}
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src={member.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium text-sm">
                    {member.position}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                  
                  {member.expertise.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">专业领域</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.slice(0, 4).map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-500">
                    <p>经验：{member.experience}</p>
                    <p>部门：{member.department}</p>
                  </div>
                  
                  {(member.email || member.linkedIn) && (
                    <div className="flex gap-2 mt-4 pt-4 border-t">
                      {member.email && (
                        <a 
                          href={`mailto:${member.email}`}
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          📧 邮箱
                        </a>
                      )}
                      {member.linkedIn && (
                        <a 
                          href={member.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          🔗 LinkedIn
                        </a>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">该部门暂无团队成员信息</p>
            </div>
          )}
        </Container>
      </Section>

      {/* Join Us CTA */}
      <Section className="bg-blue-600 py-16">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">加入我们</h2>
            <p className="text-xl text-blue-100 mb-8">
              我们正在寻找有才华的人才加入我们的团队
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="bg-white text-blue-600 border-white hover:bg-blue-50">
                查看招聘职位
              </Button>
              <Link href="/about/contact">
                <Button size="lg" className="bg-blue-700 hover:bg-blue-800">联系我们</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default TeamPage;
