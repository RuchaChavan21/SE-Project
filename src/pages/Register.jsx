import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';

const Register = () => (
  <main className="ep-auth-page">
    <section className="ep-auth-card">
      <Sprout size={28} />
      <h1>Grow your knowledge tree</h1>
      <input placeholder="Name" aria-label="Name" />
      <input placeholder="Email" aria-label="Email" />
      <input placeholder="Password" type="password" aria-label="Password" />
      <button>Create account</button>
      <Link to="/login">I already have a learning tree</Link>
    </section>
  </main>
);

export default Register;
