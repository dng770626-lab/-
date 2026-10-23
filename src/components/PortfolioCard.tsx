'use client';

import { useEffect, useState } from 'react';

type PortfolioCardProps = {
  imageUrl: string;
  title: string;
  description: string;
  categoryLabel: string;
  location: string;
  workDate: string;
  formattedDate: string;
};

export function PortfolioCard({
  imageUrl,
  title,
  description,
  categoryLabel,
  location,
  workDate,
  formattedDate,
}: PortfolioCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <article className="portfolio-card">
        <div className="portfolio-image">
          <img src={imageUrl} alt={`${title} 작업 사진`} />
        </div>
        <button
          className="portfolio-copy"
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={`${title} 사진 크게 보기`}
        >
          <span className="portfolio-meta">
            <span>{categoryLabel ? `${categoryLabel} · ${location}` : location}</span>
            <time dateTime={workDate}>{formattedDate}</time>
          </span>
          <strong className="portfolio-title">{title}</strong>
          <span className="portfolio-description">{description}</span>
        </button>
      </article>

      {isOpen && (
        <div className="portfolio-lightbox" role="dialog" aria-modal="true" aria-label={`${title} 확대 사진`} onClick={() => setIsOpen(false)}>
          <div className="portfolio-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <button className="portfolio-lightbox-close" type="button" onClick={() => setIsOpen(false)} aria-label="확대 사진 닫기">×</button>
            <img src={imageUrl} alt={`${title} 확대 사진`} />
            <div className="portfolio-lightbox-copy">
              <strong>{title}</strong>
              <p>{description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
