'use client';

import { FormEvent, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  isPortfolioSubcategory,
  portfolioCategories,
  portfolioSubcategories,
  type Portfolio,
  type PortfolioCategory,
} from '@/types/portfolio';

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxFileSize = 8 * 1024 * 1024;

export function PortfolioForm({ email, portfolios }: { email: string; portfolios: Portfolio[] }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState<PortfolioCategory | ''>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCategory, setEditCategory] = useState<PortfolioCategory | ''>('');
  const [editSubcategory, setEditSubcategory] = useState('');
  const [editMessage, setEditMessage] = useState('');
  const [isEditError, setIsEditError] = useState(false);
  const [managerMessage, setManagerMessage] = useState('');

  const editingPortfolio = portfolios.find((portfolio) => portfolio.id === editingId);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    setIsError(false);

    const formData = new FormData(event.currentTarget);
    const selectedCategory = String(formData.get('category') ?? '') as PortfolioCategory;
    const subcategory = String(formData.get('subcategory') ?? '');
    const title = String(formData.get('title') ?? '').trim();
    const description = String(formData.get('description') ?? '').trim();
    const workDate = String(formData.get('workDate') ?? '');
    const location = String(formData.get('location') ?? '').trim();
    const image = formData.get('image');

    const hasValidCategory = portfolioCategories.some((item) => item.value === selectedCategory);
    const hasValidSubcategory = hasValidCategory && isPortfolioSubcategory(selectedCategory, subcategory);

    if (!hasValidCategory || !hasValidSubcategory || !title || !description || !workDate || !location || !(image instanceof File) || image.size === 0) {
      setIsError(true);
      setMessage('모든 항목을 입력해 주세요.');
      return;
    }

    if (!allowedTypes.includes(image.type) || image.size > maxFileSize) {
      setIsError(true);
      setMessage('사진은 JPG, PNG, WEBP 형식의 8MB 이하 파일만 등록할 수 있습니다.');
      return;
    }

    setIsSubmitting(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.app_metadata.role !== 'admin') {
      setIsError(true);
      setMessage('로그인이 만료됐습니다. 다시 로그인해 주세요.');
      setIsSubmitting(false);
      router.replace('/admin/login');
      return;
    }

    const extension = image.name.split('.').pop()?.toLowerCase() || 'jpg';
    const imagePath = `${user.id}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(imagePath, image, { contentType: image.type, upsert: false });

    if (uploadError) {
      setIsError(true);
      setMessage('사진을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.');
      setIsSubmitting(false);
      return;
    }

    const { error: insertError } = await supabase.from('portfolios').insert({
      category: selectedCategory,
      subcategory,
      title,
      description,
      work_date: workDate,
      location,
      image_path: imagePath,
      created_by: user.id,
    });

    if (insertError) {
      await supabase.storage.from('portfolio-images').remove([imagePath]);
      setIsError(true);
      setMessage('작업 사례를 저장하지 못했습니다. 입력 내용을 확인해 주세요.');
      setIsSubmitting(false);
      return;
    }

    formRef.current?.reset();
    setCategory('');
    setMessage('작업 사례가 등록됐습니다. 공개 페이지에 바로 표시됩니다.');
    setIsSubmitting(false);
    router.refresh();
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace('/admin/login');
    router.refresh();
  }

  function startEditing(portfolio: Portfolio) {
    setEditingId(portfolio.id);
    setEditCategory(portfolio.category);
    setEditSubcategory(portfolio.subcategory);
    setEditMessage('');
    setIsEditError(false);
    setManagerMessage('');
  }

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingId || !editCategory) return;

    setEditMessage('');
    setIsEditError(false);

    const formData = new FormData(event.currentTarget);
    const title = String(formData.get('title') ?? '').trim();
    const description = String(formData.get('description') ?? '').trim();
    const workDate = String(formData.get('workDate') ?? '');
    const location = String(formData.get('location') ?? '').trim();

    if (!isPortfolioSubcategory(editCategory, editSubcategory) || !title || !description || !workDate || !location) {
      setIsEditError(true);
      setEditMessage('수정할 모든 항목을 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.app_metadata.role !== 'admin') {
      setIsSubmitting(false);
      router.replace('/admin/login');
      return;
    }

    const { error } = await supabase
      .from('portfolios')
      .update({
        category: editCategory,
        subcategory: editSubcategory,
        title,
        description,
        work_date: workDate,
        location,
      })
      .eq('id', editingId);

    if (error) {
      setIsEditError(true);
      setEditMessage('작업 사례를 수정하지 못했습니다. 잠시 후 다시 시도해 주세요.');
      setIsSubmitting(false);
      return;
    }

    setEditingId(null);
    setManagerMessage('작업 사례가 수정됐습니다.');
    setIsSubmitting(false);
    router.refresh();
  }

  return (
    <>
      <header className="admin-topbar">
        <div>
          <Link className="admin-brand" href="/"><span>NAU</span>JIEUM</Link>
          <p>{email}</p>
        </div>
        <div className="admin-actions">
          <Link href="/">공개 홈페이지 보기</Link>
          <button className="secondary-button" type="button" onClick={handleLogout}>로그아웃</button>
        </div>
      </header>

      <section className="admin-card portfolio-editor">
        <p className="admin-eyebrow">NEW PORTFOLIO</p>
        <h1>작업 사례 등록</h1>
        <p className="admin-lead">등록이 완료되면 홈페이지 포트폴리오에 자동으로 공개됩니다.</p>

        <form ref={formRef} className="admin-form" onSubmit={handleSubmit}>
          <label htmlFor="portfolio-category">대표 메뉴</label>
          <select
            id="portfolio-category"
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value as PortfolioCategory | '')}
            required
          >
            <option value="" disabled>사업 분야를 선택해 주세요</option>
            {portfolioCategories.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>

          <label htmlFor="portfolio-subcategory">세부 메뉴</label>
          <select id="portfolio-subcategory" name="subcategory" defaultValue="" key={category} disabled={!category} required>
            <option value="" disabled>{category ? '세부 메뉴를 선택해 주세요' : '대표 메뉴를 먼저 선택해 주세요'}</option>
            {category && portfolioSubcategories[category].map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>

          <label htmlFor="portfolio-title">제목</label>
          <input id="portfolio-title" name="title" maxLength={120} required placeholder="예: 지역 문화축제 공간 연출" />

          <div className="admin-form-row">
            <div>
              <label htmlFor="portfolio-date">작업 날짜</label>
              <input id="portfolio-date" name="workDate" type="date" required />
            </div>
            <div>
              <label htmlFor="portfolio-location">작업 장소</label>
              <input id="portfolio-location" name="location" maxLength={200} required placeholder="예: 진주시 ○○광장" />
            </div>
          </div>

          <label htmlFor="portfolio-description">설명</label>
          <textarea id="portfolio-description" name="description" rows={7} maxLength={3000} required placeholder="작업 목적과 진행 내용을 적어 주세요." />

          <label htmlFor="portfolio-image">대표 사진</label>
          <input id="portfolio-image" name="image" type="file" accept="image/jpeg,image/png,image/webp" required />
          <small>JPG, PNG, WEBP · 최대 8MB</small>

          {message && <p className={`form-message ${isError ? 'error' : 'success'}`} role="status">{message}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '저장 중…' : '작업 사례 등록'}
          </button>
        </form>
      </section>

      <section className="admin-card portfolio-editor admin-portfolio-list">
        <p className="admin-eyebrow">EDIT PORTFOLIO</p>
        <h2>등록된 작업 수정</h2>
        <p className="admin-lead">수정할 작업의 버튼을 누르면 분류와 설명 내용을 바꿀 수 있습니다.</p>
        {managerMessage && <p className="form-message success" role="status">{managerMessage}</p>}

        {portfolios.length === 0 ? (
          <p className="portfolio-empty">등록된 작업 사례가 없습니다.</p>
        ) : (
          <div className="admin-portfolio-items">
            {portfolios.map((portfolio) => {
              const categoryLabel = portfolioCategories.find((item) => item.value === portfolio.category)?.label;
              const subcategoryLabel = portfolioSubcategories[portfolio.category].find((item) => item.value === portfolio.subcategory)?.label;

              return (
                <article className="admin-portfolio-item" key={portfolio.id}>
                  <div>
                    <span>{categoryLabel} · {subcategoryLabel}</span>
                    <strong>{portfolio.title}</strong>
                    <small>{portfolio.location} · {portfolio.work_date}</small>
                  </div>
                  <button className="secondary-button" type="button" onClick={() => startEditing(portfolio)}>수정</button>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {editingPortfolio && (
        <section className="admin-card portfolio-editor admin-edit-card">
          <p className="admin-eyebrow">EDITING</p>
          <h2>{editingPortfolio.title}</h2>
          <form className="admin-form" key={editingPortfolio.id} onSubmit={handleUpdate}>
            <label htmlFor="edit-category">대표 메뉴</label>
            <select
              id="edit-category"
              value={editCategory}
              onChange={(event) => {
                const nextCategory = event.target.value as PortfolioCategory;
                setEditCategory(nextCategory);
                setEditSubcategory(portfolioSubcategories[nextCategory][0].value);
              }}
              required
            >
              {portfolioCategories.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>

            <label htmlFor="edit-subcategory">세부 메뉴</label>
            <select id="edit-subcategory" value={editSubcategory} onChange={(event) => setEditSubcategory(event.target.value)} required>
              {editCategory && portfolioSubcategories[editCategory].map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>

            <label htmlFor="edit-title">제목</label>
            <input id="edit-title" name="title" defaultValue={editingPortfolio.title} maxLength={120} required />

            <div className="admin-form-row">
              <div>
                <label htmlFor="edit-date">작업 날짜</label>
                <input id="edit-date" name="workDate" type="date" defaultValue={editingPortfolio.work_date} required />
              </div>
              <div>
                <label htmlFor="edit-location">작업 장소</label>
                <input id="edit-location" name="location" defaultValue={editingPortfolio.location} maxLength={200} required />
              </div>
            </div>

            <label htmlFor="edit-description">설명</label>
            <textarea id="edit-description" name="description" rows={7} defaultValue={editingPortfolio.description} maxLength={3000} required />

            {editMessage && <p className={`form-message ${isEditError ? 'error' : 'success'}`} role="status">{editMessage}</p>}

            <div className="admin-edit-actions">
              <button type="submit" disabled={isSubmitting}>{isSubmitting ? '수정 중…' : '수정 내용 저장'}</button>
              <button className="secondary-button" type="button" onClick={() => setEditingId(null)}>취소</button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}

