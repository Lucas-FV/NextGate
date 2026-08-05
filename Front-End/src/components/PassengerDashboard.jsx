// src/components/PassengerDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PassengerDashboard({ user, onLogout }) {
  const navigate = useNavigate(); 

  const initial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="dashboard-layout">
      
      {/* SEÇÃO AZUL SUPERIOR (HERO) */}
      <div className="dashboard-hero">
        <div className="dashboard-hero-content">
          
          <nav className="dashboard-nav">
            <h2>Next<span>Gate</span></h2>
            <button className="btn-logout-white" onClick={onLogout}>Sair</button>
          </nav>
          
          <div className="dashboard-welcome">
            <div className="user-avatar">{initial}</div>
            <div className="welcome-text">
              <h1>Olá, {user.name}</h1>
            </div>
          </div>

        </div>
      </div>

      {/* ÁREA DOS CARDS (GRID) */}
      <main className="dashboard-main-content">
        <div className="dashboard-grid">
          
          {/* Card Principal - Lado Esquerdo */}
          <div className="dashboard-card" style={{ gridRow: 'span 2' }}>
            <h3>Seus próximos voos</h3>
            <p>Você ainda não tem nenhuma viagem programada. Que tal explorar nossos destinos com as melhores companhias aéreas?</p>
            <button className="btn-primary">Buscar passagens</button>
          </div>

          {/* Card Secundário 1 - Lado Direito */}
          <div className="dashboard-card">
            <h3>Alertas de preços</h3>
            <p>Acompanhe os preços da sua rota preferida.</p>
          </div>

          {/* Card Secundário 2 - Lado Direito */}
          <div className="dashboard-card">
            <h3>Gerenciar conta</h3>
            <p>Atualize seus dados pessoais e preferências.</p>
            <button 
              className="btn-primary" 
              onClick={() => navigate('/profile')}
              style={{ marginTop: '16px', width: '100%' }}
            >
              Editar Perfil
            </button>
          </div>

        </div>
      </main>

    </div>
  );
}