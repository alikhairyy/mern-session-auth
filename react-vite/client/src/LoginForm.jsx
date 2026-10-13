import { useState } from 'react';

export default function LoginForm({ onSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isRegister = mode === 'register';

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function switchMode() {
    setMode(isRegister ? 'login' : 'register');
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password || (isRegister && !form.name)) {
      return setError('Please fill in all fields.');
    }

    setLoading(true);
    try {
      const body = isRegister
        ? form
        : { email: form.email, password: form.password };

      const res = await fetch(isRegister ? '/api/register' : '/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) return setError(data.error || 'Something went wrong.');
      onSuccess(data.user);
    } catch {
      setError('Could not reach the server. Is it running?');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>{isRegister ? 'Create account' : 'Sign in'}</h1>
      <p className="sub">{isRegister ? 'It only takes a minute.' : 'Use your email and password.'}</p>

      <form onSubmit={handleSubmit} noValidate>
        {isRegister && (
          <>
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} autoComplete="name" />
          </>
        )}

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          autoComplete={isRegister ? 'new-password' : 'current-password'}
        />
        {isRegister && <p className="hint">At least 8 characters.</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Please wait…' : isRegister ? 'Create account' : 'Sign in'}
        </button>

        {error && <div className="error" role="alert">{error}</div>}
      </form>

      <p className="switch">
        {isRegister ? 'Already have an account?' : 'No account?'}{' '}
        <button type="button" className="link" onClick={switchMode}>
          {isRegister ? 'Sign in' : 'Create one'}
        </button>
      </p>
    </>
  );
}
