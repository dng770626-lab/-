export const portfolioCategories = [
  { value: 'culture', label: '문화행사 운영' },
  { value: 'promotional', label: '판촉물' },
  { value: 'garden', label: '정원외 공간연출' },
  { value: 'outdoor', label: '옥외광고물' },
  { value: 'architecture', label: '건축 및 인테리어' },
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number]['value'];

export const portfolioSubcategories = {
  culture: [
    { value: 'event-planning', label: '행사 기획' },
    { value: 'exhibition-performance', label: '전시 · 공연 연출' },
    { value: 'on-site-operations', label: '현장 운영' },
  ],
  promotional: [
    { value: 'custom-planning-design', label: '맞춤 기획 · 디자인' },
    { value: 'daily-goods-souvenirs', label: '생활용품 · 기념품' },
    { value: 'event-group-gifts', label: '행사 · 단체 선물' },
  ],
  garden: [
    { value: 'garden-design', label: '정원 설계' },
    { value: 'space-styling', label: '공간 연출' },
    { value: 'construction-care', label: '조성 · 관리' },
  ],
  outdoor: [
    { value: 'sign-system', label: '사인 시스템' },
    { value: 'signage-guides', label: '간판 · 안내물' },
    { value: 'installation-maintenance', label: '설치 · 유지관리' },
  ],
  architecture: [
    { value: 'planning-consulting', label: '기획 · 컨설팅' },
    { value: 'architecture-design', label: '설계 · 디자인' },
    { value: 'construction-management', label: '시공 · 관리' },
  ],
} as const satisfies Record<PortfolioCategory, readonly { value: string; label: string }[]>;

export type PortfolioSubcategory = (typeof portfolioSubcategories)[PortfolioCategory][number]['value'];

export function isPortfolioSubcategory(
  category: PortfolioCategory,
  value: string,
): value is PortfolioSubcategory {
  return portfolioSubcategories[category].some((item) => item.value === value);
}

export type Portfolio = {
  id: string;
  category: PortfolioCategory;
  subcategory: PortfolioSubcategory;
  title: string;
  description: string;
  work_date: string;
  location: string;
  image_path: string;
  created_by: string;
  created_at: string;
};

