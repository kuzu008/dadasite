export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  avatar?: string;
  bio: string;
  expertise: string[];
  linkedIn?: string;
  email?: string;
  experience: string;
}

export interface Milestone {
  year: string;
  quarter?: string;
  title: string;
  description: string;
  impact?: string;
  icon?: string;
}

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface OfficeLocation {
  id: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  isHeadquarters: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface CompanyInfo {
  name: string;
  slogan: string;
  foundedYear: number;
  employees: string;
  headquarters: string;
  mission: string;
  vision: string;
  description: string;
  stats: {
    clients: string;
    projects: string;
    experience: string;
    satisfaction: string;
  };
}

export const COMPANY_INFO: CompanyInfo = {
  name: '智金科技',
  slogan: '用AI驱动金融智能化未来',
  foundedYear: 2019,
  employees: '500+',
  headquarters: '上海',
  mission: '通过人工智能技术，为金融机构提供智能化解决方案，推动行业数字化转型，让金融服务更高效、更精准、更普惠。',
  vision: '成为全球领先的金融AI技术服务商，引领金融科技创新，构建智能化金融生态。',
  description: '智金科技成立于2019年，专注于为证券、银行、基金等金融机构提供人工智能解决方案。我们拥有一支由金融专家、AI算法工程师、产品设计师组成的专业团队，致力于用技术创新驱动金融服务升级。',
  stats: {
    clients: '200+',
    projects: '500+', 
    experience: '5年+',
    satisfaction: '98%'
  }
};

export const COMPANY_VALUES: CompanyValue[] = [
  {
    id: 'innovation',
    title: '技术创新',
    description: '持续探索AI前沿技术，用创新驱动产品发展，为客户创造更大价值',
    icon: '🚀',
    color: 'blue'
  },
  {
    id: 'reliability',
    title: '专业可靠',
    description: '深耕金融行业，确保产品稳定性和数据安全性，值得客户信赖',
    icon: '🛡️',
    color: 'green'
  },
  {
    id: 'customer-first',
    title: '客户至上',
    description: '以客户需求为导向，提供个性化解决方案和优质服务体验',
    icon: '❤️',
    color: 'red'
  },
  {
    id: 'collaboration',
    title: '开放合作',
    description: '与合作伙伴共建生态，实现互利共赢，推动行业共同发展',
    icon: '🤝',
    color: 'purple'
  }
];

export const COMPANY_MILESTONES: Milestone[] = [
  {
    year: '2019',
    quarter: 'Q3',
    title: '公司成立',
    description: '智金科技在上海正式成立，专注金融AI解决方案',
    impact: '获得天使轮融资',
    icon: '🏢'
  },
  {
    year: '2020',
    quarter: 'Q2',
    title: '首个产品发布',
    description: '推出智能行情分析系统，获得多家券商客户认可',
    impact: '签约首批10家客户',
    icon: '📊'
  },
  {
    year: '2021',
    quarter: 'Q1',
    title: '技术突破',
    description: '自研AI算法在金融预测准确率方面取得重大突破',
    impact: '准确率提升至85%+',
    icon: '🧠'
  },
  {
    year: '2021',
    quarter: 'Q4',
    title: '业务扩展',
    description: '业务范围扩展到智能交易和风险管理领域',
    impact: '客户增长至50+',
    icon: '📈'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ceo-zhang',
    name: '张明华',
    position: '创始人 & CEO',
    department: '管理层',
    bio: '清华大学计算机科学博士，前高盛量化交易总监，拥有15年金融科技经验',
    expertise: ['金融科技', '企业战略', '团队管理', '产品规划'],
    experience: '15年+',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'cto-li',
    name: '李晓明',
    position: '联合创始人 & CTO',
    department: '技术团队',
    bio: '北京大学人工智能博士，前阿里巴巴资深技术专家，AI领域顶级专家',
    expertise: ['人工智能', '机器学习', '系统架构', '技术创新'],
    experience: '12年+',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'cpo-wang',
    name: '王雅琴',
    position: '首席产品官 CPO',
    department: '产品团队',
    bio: '复旦大学金融硕士，前华为产品总监，专注金融产品设计与用户体验',
    expertise: ['产品设计', '用户体验', '金融业务', '项目管理'],
    experience: '10年+',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b0e8?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'cfo-chen',
    name: '陈建国',
    position: '首席财务官 CFO',
    department: '管理层',
    bio: '上海财经大学MBA，注册会计师，前德勤合伙人，财务管理专家',
    expertise: ['财务管理', '投资规划', '风险控制', '合规管理'],
    experience: '18年+',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
  }
];

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: 'shanghai-hq',
    city: '上海总部',
    address: '上海市浦东新区陆家嘴金融城世纪大道88号',
    phone: '+86-21-6888-8888',
    email: 'shanghai@zhijin.ai',
    isHeadquarters: true,
    coordinates: {
      lat: 31.2304,
      lng: 121.4737
    }
  },
  {
    id: 'beijing',
    city: '北京分公司',
    address: '北京市朝阳区国贸CBD建外SOHO西区15号楼',
    phone: '+86-10-8888-8888',
    email: 'beijing@zhijin.ai',
    isHeadquarters: false,
    coordinates: {
      lat: 39.9042,
      lng: 116.4074
    }
  }
];

// 工具函数
export const getTeamByDepartment = (department: string): TeamMember[] => {
  return TEAM_MEMBERS.filter(member => member.department === department);
};

export const getTeamMemberById = (id: string): TeamMember | null => {
  return TEAM_MEMBERS.find(member => member.id === id) || null;
};

export const getOfficeById = (id: string): OfficeLocation | null => {
  return OFFICE_LOCATIONS.find(office => office.id === id) || null;
};

export const getMilestonesByYear = (year: string): Milestone[] => {
  return COMPANY_MILESTONES.filter(milestone => milestone.year === year);
};
