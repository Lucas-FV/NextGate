// src/pages/Landing.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Barra de Navegação */}
      <nav className="navbar">
        <div className="logo">Next<span>Gate</span></div>
        <div className="nav-actions">
          <button className="nav-link">Suporte</button>
          <button className="nav-link">Ofertas</button>
          <button className="btn-login-outline" onClick={() => navigate('/login')}>
            Fazer Login
          </button>
        </div>
      </nav>

      {/* Seção Principal (Hero) */}
      <main className="hero-section">
        <h1 className="hero-title">Encontre e reserve <br /> uma grande experiência</h1>
        <p className="hero-subtitle">Voos exclusivos com o máximo de conforto para o seu próximo destino.</p>

        {/* Imagem em formato de Pílula (Link direto do Unsplash) */}
        <div className="hero-image-container">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" 
            alt="Avião moderno no céu" 
            className="hero-image"
          />
        </div>

        {/* Widget de Busca */}
        <div className="search-widget">
          <div className="search-field">
            <label>📍 Origem</label>
            <input type="text" placeholder="De onde você sai?" />
          </div>
          
          <div className="divider"></div>

          <div className="search-field">
            <label>🛬 Destino</label>
            <input type="text" placeholder="Para onde quer ir?" />
          </div>

          <div className="divider"></div>

          <div className="search-field">
            <label>📅 Data de Ida</label>
            <input type="date" />
          </div>

          <button className="btn-search-main">Buscar Voos</button>
        </div>
      </main>
    </div>
  );
}