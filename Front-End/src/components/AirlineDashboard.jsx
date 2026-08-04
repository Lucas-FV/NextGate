// src/components/AirlineDashboard.jsx
import React from 'react';

export default function AirlineDashboard({ user, onLogout }) {
  // Pega a primeira letra do nome da empresa para o Avatar circular
  const initial = user.name ? user.name.charAt(0).toUpperCase() : 'E';

  return (
    <div className="dashboard-layout">
      
      {/* SEÇÃO AZUL SUPERIOR (HERO) - MODO BUSINESS */}
      <div className="dashboard-hero">
        <div className="dashboard-hero-content">
          
          <nav className="dashboard-nav">
            <h2>Next<span>Gate</span> <span style={{ fontSize: '14px', fontWeight: '400', opacity: 0.8, marginLeft: '8px' }}>| Business</span></h2>
            <button className="btn-logout-white" onClick={onLogout}>Sair</button>
          </nav>
          
          <div className="dashboard-welcome">
            {/* Avatar azul para diferenciar da conta de passageiro (laranja) */}
            <div className="user-avatar" style={{ backgroundColor: '#4299e1' }}>{initial}</div>
            <div className="welcome-text">
              <h1>{user.name}</h1>
            </div>
          </div>

        </div>
      </div>

      {/* ÁREA DOS CARDS (GRID) */}
      <main className="dashboard-main-content">
        <div className="dashboard-grid">
          
          {/* Card Principal - Lado Esquerdo */}
          <div className="dashboard-card" style={{ gridRow: 'span 2' }}>
            <h3>Gestão de Voos</h3>
            <p>Sua malha aérea está vazia. Comece a cadastrar novas rotas, horários e disponibilize passagens para seus clientes.</p>
            <button className="btn-primary">Cadastrar Novo Voo</button>
          </div>

          {/* Card Secundário 1 - Lado Direito */}
          <div className="dashboard-card">
            <h3>Nossa Frota</h3>
            <p>Acompanhe e gerencie as aeronaves ativas da sua companhia.</p>
          </div>

          {/* Card Secundário 2 - Lado Direito */}
          <div className="dashboard-card">
            <h3>Perfil Corporativo</h3>
            <p>Atualize o CNPJ, dados de contato e preferências da empresa.</p>
          </div>

        </div>
      </main>

    </div>
  );
}