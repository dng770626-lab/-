export const portfolioCategories = [
  { value: 'culture', label: '문화행사 운영' },
  { value: 'promotional', label: '판촉물' },
  { value: 'garden', label: '정원외 공간연출' },
  { value: 'outdoor', label: '옥외광고물' },
  { value: 'architecture', label: '건축 및 인테리어' },
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number]['value'];

export type Portfolio = {
  id: string;
  category: PortfolioCategory;
  title: string;
  description: string;
  work_date: string;
  location: string;
  image_path: string;
  created_by: string;
  created_at: string;
};

