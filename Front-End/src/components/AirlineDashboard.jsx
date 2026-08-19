// src/components/AirlineDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function AirlineDashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const initial = user.name ? user.name.charAt(0).toUpperCase() : 'E';

  const [flights, setFlights] = useState([]);
  
  // NOVOS ESTADOS PARA OS KPIs
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalPassengers, setTotalPassengers] = useState(0);

  // MOTOR DE BUSCA ATUALIZADO
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1. Busca os voos da companhia
        const flightsResponse = await api.get(`/flights/airline/${user.id}`);
        const airlineFlights = flightsResponse.data;
        setFlights(airlineFlights);

        // 2. Cria uma lista de buscas para os tickets de cada voo
        const ticketPromises = airlineFlights.map(flight => 
          api.get(`/tickets/flight/${flight.id}`)
        );

        // 3. Executa todas as buscas de tickets ao mesmo tempo
        const ticketsResponses = await Promise.all(ticketPromises);

        // 4. Soma a quantidade de passageiros e a receita total
        let revenueCalc = 0;
        let passengersCalc = 0;

        ticketsResponses.forEach(res => {
          const ticketsForFlight = res.data;
          passengersCalc += ticketsForFlight.length; // Cada ticket é um passageiro
          
          ticketsForFlight.forEach(ticket => {
            revenueCalc += ticket.totalPrice; // Soma o valor pago
          });
        });

        // 5. Atualiza a tela com os valores reais
        setTotalPassengers(passengersCalc);
        setTotalRevenue(revenueCalc);

      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    };

    if (user?.id) {
      fetchDashboardData();
    }
  }, [user.id]);

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
            <h2 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              Next<span>Gate</span> 
              <span style={{ fontSize: '14px', fontWeight: '400', opacity: 0.8, marginLeft: '8px' }}>| Business</span>
            </h2>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="btn-logout-white" 
                onClick={() => navigate('/')}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'transparent' }}
              >
                Início
              </button>
              <button className="btn-logout-white" onClick={onLogout}>Sair</button>
            </div>
          </nav>
          
          <div className="dashboard-welcome">
            <div className="user-avatar" style={{ backgroundColor: '#4299e1' }}>{initial}</div>
            <div className="welcome-text">
              <h1>{user.name}</h1>
              <p>Visão geral da sua operação e faturamento.</p>
            </div>
          </div>

        </div>
      </div>

      <main className="dashboard-main-content">
        
        {/* NOVA SEÇÃO: INDICADORES FINANCEIROS (KPIs) ATUALIZADOS */}
        <div className="kpi-container">
          <div className="kpi-card">
            <div className="kpi-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}>✈️</div>
            <div className="kpi-info">
              <span className="kpi-title">Voos Ativos</span>
              <strong className="kpi-value">{flights.length}</strong>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon" style={{ background: '#f0fdf4', color: '#10b981' }}>💰</div>
            <div className="kpi-info">
              <span className="kpi-title">Receita Total</span>
              <strong className="kpi-value">
                R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </strong>
              <small className="kpi-trend positive">Atualizado agora</small>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon" style={{ background: '#fef2f2', color: '#ef4444' }}>👥</div>
            <div className="kpi-info">
              <span className="kpi-title">Passageiros</span>
              <strong className="kpi-value">{totalPassengers}</strong>
              <small className="kpi-trend positive">Atualizado agora</small>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          
          {/* Card Principal - Lado Esquerdo */}
          <div className="dashboard-card" style={{ gridRow: 'span 2', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
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

            {flights.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛫</div>
                <p>Sua malha aérea está vazia. Comece a cadastrar novas rotas, horários e disponibilize passagens para seus clientes.</p>
              </div>
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
            <h3>Ações Rápidas</h3>
            <p>Gerencie sua operação do dia a dia.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
              <button className="btn-outline-action">Relatório de Vendas</button>
              <button className="btn-outline-action">Tripulação</button>
            </div>
          </div>

          {/* Card Secundário 2 - Lado Direito */}
          <div className="dashboard-card">
            <h3>Perfil Corporativo</h3>
            <p>Atualize os dados e preferências da empresa.</p>
            <button 
              className="btn-primary" 
              onClick={() => navigate('/profile')}
              style={{ marginTop: '16px', width: '100%' }}
            >
              Configurações
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}