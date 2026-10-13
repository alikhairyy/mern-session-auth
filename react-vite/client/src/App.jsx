import { useEffect, useState } from 'react';
import LoginForm from './LoginForm.jsx';
import Welcome from './Welcome.jsx';

export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  // On page load, check if the user is already logged in
  useEffect(() => {
    fetch('/api/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data ? data.user : null))
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  async function logout() {
    await fetch('/api/logout', { method: 'POST' });
    setUser(null);
  }

  if (checking) return <main className="card"><p className="sub">Loading…</p></main>;

  return (
    <main className="card">
      {user ? <Welcome user={user} onLogout={logout} /> : <LoginForm onSuccess={setUser} />}
    </main>
  );
}
