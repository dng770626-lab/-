import type { Metadata } from 'next';
import { PortfolioSection } from '@/components/PortfolioSection';

export const metadata: Metadata = { title: "정원외 공간연출 | 나우지음" };
export const dynamic = 'force-dynamic';

export default async function Page() {
  return (
    <div className="garden-page">
<header className="site-header"><a className="brand" href="index.html"><span className="brand-nau">NAU</span><span>JIEUM</span></a><nav><a href="index.html#services">사업 분야</a><a href="index.html#about">소개</a><a href="index.html#contact">문의</a></nav></header><main><section className="detail-hero"><div><span className="num">SERVICE 03</span><h1>정원외 공간연출</h1><p>계절의 변화와 사람의 움직임을 담는 외부 공간을 만듭니다. 머물고 걷고 쉬는 모든 순간이 자연스럽게 이어집니다.</p></div></section><section className="detail-body"><h2>일상 가까이에 자연을 들입니다</h2><div className="detail-grid"><article className="detail-item"><span>01</span><h3>정원 설계</h3><p>부지와 기후, 이용 목적을 고려해 공간 구성과 식재를 계획합니다.</p></article><article className="detail-item"><span>02</span><h3>공간 연출</h3><p>식물과 시설물, 조명을 조화롭게 배치해 특별한 장면을 만듭니다.</p></article><article className="detail-item"><span>03</span><h3>조성 · 관리</h3><p>계절마다 건강하고 아름다운 정원이 되도록 조성과 관리를 함께합니다.</p></article></div><PortfolioSection category="garden" /><a className="back" href="index.html">← 메인으로 돌아가기</a></section></main><footer><a className="brand" href="index.html"><span className="brand-nau">나우</span><span>지음</span></a><p>자연과 일상이 만나는 정원</p></footer>
    </div>
  );
}
