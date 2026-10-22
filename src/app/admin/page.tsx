import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { PortfolioForm } from './PortfolioForm';

export const metadata: Metadata = { title: '포트폴리오 관리 | 나우지음' };

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.app_metadata.role !== 'admin') redirect('/admin/login');

  return (
    <main className="admin-shell admin-dashboard">
      <PortfolioForm email={user.email ?? '관리자'} />
    </main>
  );
}

