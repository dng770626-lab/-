import type { Metadata } from 'next';
import { PortfolioSection } from '@/components/PortfolioSection';

export const metadata: Metadata = { title: "건축 및 인테리어 | 나우지음" };
export const dynamic = 'force-dynamic';

export default async function Page() {
  return (
    <div className="architecture-page">
<header className="site-header"><a className="brand" href="index.html"><span className="brand-nau">NAU</span><span>JIEUM</span></a><nav><a href="index.html#services">사업 분야</a><a href="index.html#about">소개</a><a href="index.html#contact">문의</a></nav></header><main><section className="detail-hero"><div><span className="num">SERVICE 01</span><h1>건축 및 인테리어</h1><p>공간을 사용하는 사람의 하루부터 생각합니다. 목적과 예산, 현장의 조건을 세심하게 살펴 꼭 맞는 공간을 제안합니다.</p></div></section><section className="detail-body"><h2>생각이 공간이 되는 과정</h2><div className="detail-grid"><a className="detail-item detail-item-link" href="#portfolio-planning-consulting"><span>01</span><h3>기획 · 컨설팅</h3><p>요구사항과 현장 조건을 분석해 프로젝트의 방향과 범위를 정합니다.</p></a><a className="detail-item detail-item-link" href="#portfolio-architecture-design"><span>02</span><h3>설계 · 디자인</h3><p>동선과 기능, 재료와 분위기를 조율해 구체적인 공간을 설계합니다.</p></a><a className="detail-item detail-item-link" href="#portfolio-construction-management"><span>03</span><h3>시공 · 관리</h3><p>설계 의도가 현장에 충실히 구현되도록 공정과 품질을 관리합니다.</p></a></div><PortfolioSection category="architecture" /><a className="back" href="index.html">← 메인으로 돌아가기</a></section></main><footer><a className="brand" href="index.html"><span className="brand-nau">나우</span><span>지음</span></a><p>공간의 시작부터 완성까지</p></footer>
    </div>
  );
}
