import React from 'react';
import { Link } from 'react-router-dom';

export default function Index() {
  // This is a placeholder for any translation logic you might want to implement
  return (
    <div>
      <h1>Welcome to the Index Page</h1>
      <p>This is the main entry point of our application.</p>
      <Link to="/contacto">Contacto</Link>
    </div>
  );
}