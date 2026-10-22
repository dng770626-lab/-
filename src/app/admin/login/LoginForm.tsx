'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const adminLoginId = 'naujieum';
const adminEmail = 'admin@naujieum.kr';

export function LoginForm() {
  const router = useRouter();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (loginId.trim() !== adminLoginId) {
      setError('아이디 또는 비밀번호를 확인해 주세요.');
      setIsSubmitting(false);
      return;
    }

    const supabase = createClient();
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password,
    });

    if (signInError || data.user?.app_metadata.role !== 'admin') {
      if (data.user) await supabase.auth.signOut();
      setError('아이디 또는 비밀번호를 확인해 주세요.');
      setIsSubmitting(false);
      return;
    }

    router.replace('/admin');
    router.refresh();
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <label htmlFor="admin-login-id">아이디</label>
      <input
        id="admin-login-id"
        name="loginId"
        type="text"
        autoComplete="username"
        value={loginId}
        onChange={(event) => setLoginId(event.target.value)}
        required
      />

      <label htmlFor="admin-password">비밀번호</label>
      <input
        id="admin-password"
        name="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />

      {error && <p className="form-message error" role="alert">{error}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '로그인 중…' : '관리자 로그인'}
      </button>
    </form>
  );
}

