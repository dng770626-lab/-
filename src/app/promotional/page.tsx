import type { Metadata } from 'next';
import { PortfolioSection } from '@/components/PortfolioSection';

export const metadata: Metadata = { title: "판촉물 | 나우지음" };
export const dynamic = 'force-dynamic';

export default async function Page() {
  return (
    <div className="promotional-page">
<header className="site-header"><a className="brand" href="index.html"><span className="brand-nau">NAU</span><span>JIEUM</span></a><nav><a href="index.html#services">사업 분야</a><a href="index.html#about">소개</a><a href="index.html#contact">문의</a></nav></header><main><section className="detail-hero"><div><span className="num">SERVICE 05</span><h1>판촉물</h1><p>브랜드의 이야기를 일상 속에 전합니다. 목적과 예산, 사용 장면에 맞는 판촉물을 기획하고 디자인부터 제작까지 함께합니다.</p></div></section><section className="detail-body"><h2>오래 쓰이고 기억에 남는 판촉물</h2><div className="detail-grid"><a className="detail-item detail-item-link" href="#portfolio-custom-planning-design"><span>01</span><h3>맞춤 기획 · 디자인</h3><p>브랜드와 행사 성격에 맞는 품목을 제안하고 로고와 메시지를 담은 디자인을 준비합니다.</p></a><a className="detail-item detail-item-link" href="#portfolio-daily-goods-souvenirs"><span>02</span><h3>생활용품 · 기념품</h3><p>문구류, 텀블러, 에코백 등 일상에서 활용할 수 있는 판촉물과 기념품을 제작합니다.</p></a><a className="detail-item detail-item-link" href="#portfolio-event-group-gifts"><span>03</span><h3>행사 · 단체 선물</h3><p>행사 배포용 선물과 단체 기념품을 용도에 맞게 구성하고 포장과 납품 일정을 조율합니다.</p></a></div><PortfolioSection category="promotional" /><a className="back" href="index.html">← 메인으로 돌아가기</a></section></main><footer><a className="brand" href="index.html"><span className="brand-nau">나우</span><span>지음</span></a><p>브랜드의 이야기를 일상으로</p></footer>
    </div>
  );
}
