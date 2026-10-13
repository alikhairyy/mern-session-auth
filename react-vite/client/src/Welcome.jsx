export default function Welcome({ user, onLogout }) {
  return (
    <>
      <h1>Welcome, {user.name} 👋</h1>
      <p className="sub">You're signed in as {user.email}</p>
      <button onClick={onLogout}>Log out</button>
    </>
  );
}
