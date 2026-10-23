import type { Metadata } from 'next';
import { PortfolioSection } from '@/components/PortfolioSection';

export const metadata: Metadata = { title: "옥외광고물 | 나우지음" };
export const dynamic = 'force-dynamic';

export default async function Page() {
  return (
    <div className="outdoor-page">
<header className="site-header"><a className="brand" href="index.html"><span className="brand-nau">NAU</span><span>JIEUM</span></a><nav><a href="index.html#services">사업 분야</a><a href="index.html#about">소개</a><a href="index.html#contact">문의</a></nav></header><main><section className="detail-hero"><div><span className="num">SERVICE 02</span><h1>옥외광고물</h1><p>멀리서도 잘 보이고 가까이에서는 더 좋은 사인. 장소의 정체성과 주변 환경을 함께 고려해 정확한 인상을 만듭니다.</p></div></section><section className="detail-body"><h2>장소를 알리는 가장 좋은 방법</h2><div className="detail-grid"><article className="detail-item"><span>01</span><h3>사인 시스템</h3><p>건물과 공간 전체에 일관된 안내 체계와 시각 언어를 설계합니다.</p></article><article className="detail-item"><span>02</span><h3>간판 · 안내물</h3><p>가독성과 내구성을 갖춘 간판, 안내판과 각종 홍보물을 제작합니다.</p></article><article className="detail-item"><span>03</span><h3>설치 · 유지관리</h3><p>현장 조건에 맞는 안전한 설치와 지속적인 유지관리를 지원합니다.</p></article></div><PortfolioSection category="outdoor" /><a className="back" href="index.html">← 메인으로 돌아가기</a></section></main><footer><a className="brand" href="index.html"><span className="brand-nau">나우</span><span>지음</span></a><p>장소의 인상을 또렷하게</p></footer>
    </div>
  );
}
