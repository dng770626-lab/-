import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { LoginForm } from './LoginForm';

export const metadata: Metadata = { title: '관리자 로그인 | 나우지음' };

export default async function AdminLoginPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user?.app_metadata.role === 'admin') redirect('/admin');

  return (
    <main className="admin-shell">
      <section className="admin-card login-card">
        <Link className="admin-brand" href="/">
          <span>NAU</span>JIEUM
        </Link>
        <p className="admin-eyebrow">PORTFOLIO MANAGER</p>
        <h1>관리자 로그인</h1>
        <p className="admin-lead">작업 사례를 등록하려면 관리자 계정으로 로그인해 주세요.</p>
        <LoginForm />
        <Link className="admin-back" href="/">← 홈페이지로 돌아가기</Link>
      </section>
    </main>
  );
}

