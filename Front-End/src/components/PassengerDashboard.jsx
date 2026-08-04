// src/components/PassengerDashboard.jsx
import React from 'react';

export default function PassengerDashboard({ user, onLogout }) {
  const initial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="dashboard-layout">
      
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

      <main className="dashboard-main-content">
        <div className="dashboard-grid">
          
          <div className="dashboard-card" style={{ gridRow: 'span 2' }}>
            <h3>Seus próximos voos</h3>
            <p>Você ainda não tem nenhuma viagem programada. Que tal explorar nossos destinos com as melhores companhias aéreas?</p>
            <button className="btn-primary">Buscar passagens</button>
          </div>

          <div className="dashboard-card">
            <h3>Alertas de preços</h3>
            <p>Acompanhe os preços da sua rota preferida.</p>
          </div>

          <div className="dashboard-card">
            <h3>Gerenciar conta</h3>
            <p>Atualize seus dados pessoais e preferências.</p>
          </div>

        </div>
      </main>

    </div>
  );
}