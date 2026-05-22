import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Login = () => (
  <main className="ep-auth-page">
    <section className="ep-auth-card">
      <Sparkles size={28} />
      <h1>Enter EduPulse AI</h1>
      <input placeholder="Email" aria-label="Email" />
      <input placeholder="Password" type="password" aria-label="Password" />
      <button>Login</button>
      <Link to="/register">Create a new learning identity</Link>
    </section>
  </main>
);

export default Login;
