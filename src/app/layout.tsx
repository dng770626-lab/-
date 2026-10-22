import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: '나우지음 | 당신과 함께 나아가겠습니다',
  description: '건축, 인테리어, 옥외광고물, 정원외 공간연출과 문화행사를 함께 만드는 나우지음',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="ko"><body>{children}</body></html>;
}
