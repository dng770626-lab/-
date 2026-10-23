import { createClient } from '@/lib/supabase/server';
import { portfolioCategories, type Portfolio } from '@/types/portfolio';

function formatWorkDate(value: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(`${value}T00:00:00`));
}

export async function PortfolioSection() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('portfolios')
    .select('id,category,title,description,work_date,location,image_path,created_by,created_at')
    .order('created_at', { ascending: false });

  const portfolios = (data ?? []) as Portfolio[];

  return (
    <section className="portfolio-section section" id="portfolio">
      <div className="portfolio-heading">
        <div>
          <p className="kicker">나우지음의 작업 사례</p>
          <h2>현장에서 완성한<br />공간과 이야기를 전합니다.</h2>
        </div>
        <p>사진과 설명으로 나우지음의 최근 작업을 확인해 보세요.</p>
      </div>

      {error ? (
        <p className="portfolio-empty">작업 사례를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.</p>
      ) : portfolios.length === 0 ? (
        <p className="portfolio-empty">첫 번째 작업 사례를 준비하고 있습니다.</p>
      ) : (
        <div className="portfolio-grid">
          {portfolios.map((portfolio) => {
            const categoryLabel = portfolioCategories.find((item) => item.value === portfolio.category)?.label;
            const { data: publicImage } = supabase.storage
              .from('portfolio-images')
              .getPublicUrl(portfolio.image_path);

            return (
              <article className="portfolio-card" key={portfolio.id}>
                <div className="portfolio-image">
                  <img src={publicImage.publicUrl} alt={`${portfolio.title} 작업 사진`} />
                </div>
                <div className="portfolio-copy">
                  <div className="portfolio-meta">
                    <span>{categoryLabel ? `${categoryLabel} · ${portfolio.location}` : portfolio.location}</span>
                    <time dateTime={portfolio.work_date}>{formatWorkDate(portfolio.work_date)}</time>
                  </div>
                  <h3>{portfolio.title}</h3>
                  <p>{portfolio.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

