import type { Metadata } from 'next';

export const metadata: Metadata = { title: "문화행사 운영 | 나우지음" };

export default function Page() {
  return (
    <div className="culture-page">
      <header className="site-header"><a className="brand" href="/"><span className="brand-nau">NAU</span><span>JIEUM</span></a><nav><a href="/#services">사업 분야</a><a href="/#about">소개</a><a href="/#contact">문의</a></nav></header>
      <main>
        <section className="detail-hero"><div><span className="num">SERVICE 04</span><h1>문화행사 기획 · 운영</h1><p>전시와 공연, 지역 문화행사의 의미가 관객에게 온전히 닿도록 콘텐츠와 공간, 운영의 모든 순간을 연결합니다.</p></div></section>
        <section className="detail-body"><h2>기억에 남는 경험을 설계합니다</h2><div className="detail-grid"><article className="detail-item"><span>01</span><h3>행사 기획</h3><p>목적과 대상에 맞는 주제, 프로그램과 실행 계획을 구체화합니다.</p></article><article className="detail-item"><span>02</span><h3>전시 · 공연 연출</h3><p>콘텐츠가 돋보이도록 무대, 동선, 그래픽과 현장 분위기를 연출합니다.</p></article><article className="detail-item"><span>03</span><h3>현장 운영</h3><p>참여자 안내부터 일정과 안전 관리까지 안정적인 현장을 만듭니다.</p></article></div><a className="back" href="/">← 메인으로 돌아가기</a></section>
      </main>
      <footer><a className="brand" href="/"><span className="brand-nau">나우</span><span>지음</span></a><p>사람과 지역을 잇는 문화</p></footer>
    </div>
  );
}
