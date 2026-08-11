// src/components/AirlineDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function AirlineDashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const initial = user.name ? user.name.charAt(0).toUpperCase() : 'E';

  // 1. Estado para armazenar os voos que vierem do banco
  const [flights, setFlights] = useState([]);

  // 2. Dispara a busca na API assim que a tela carregar
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await api.get(`/flights/airline/${user.id}`);
        setFlights(response.data);
      } catch (error) {
        console.error("Erro ao buscar voos:", error);
      }
    };

    if (user?.id) {
      fetchFlights();
    }
  }, [user.id]);

  // Função auxiliar para formatar a data que vem do Java (ex: 2026-08-20T14:00:00)
  const formatDateTime = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options).replace(',', ' às');
  };

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
          
          {/* Card Principal - Lado Esquerdo (Agora Dinâmico) */}
          <div className="dashboard-card" style={{ gridRow: 'span 2', display: 'flex', flexDirection: 'column' }}>
            
            {/* Cabeçalho do Card com botão alinhado à direita */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <h3>Gestão de Voos</h3>
                {flights.length > 0 && <p style={{ marginTop: '-15px' }}>Sua malha aérea ativa.</p>}
              </div>
              <button 
                className="btn-primary" 
                style={{ marginTop: 0, padding: '10px 20px' }} 
                onClick={() => navigate('/create-flight')}
              >
                + Novo Voo
              </button>
            </div>

            {/* Lógica de exibição: Lista ou Mensagem de vazio */}
            {flights.length === 0 ? (
              <p style={{ marginTop: '20px' }}>Sua malha aérea está vazia. Comece a cadastrar novas rotas, horários e disponibilize passagens para seus clientes.</p>
            ) : (
              <div className="flight-list">
                {flights.map((flight) => (
                  <div key={flight.id} className="flight-item" onClick={() => navigate(`/edit-flight/${flight.id}`)} style={{ cursor: 'pointer' }}>
                    <div className="flight-info">
                      <span className="flight-number">{flight.flightNumber}</span>
                      <span className="flight-route">{flight.origin} ✈ {flight.destination}</span>
                    </div>
                    <div className="flight-details">
                      <span className="flight-date">{formatDateTime(flight.departureTime)}</span>
                      <span className="flight-price">R$ {flight.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

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