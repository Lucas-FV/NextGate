// src/components/PassengerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api'; // Não se esqueça de importar a sua API

export default function PassengerDashboard({ user, onLogout }) {
  const navigate = useNavigate(); 
  const initial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  // ESTADOS PARA AS PASSAGENS
  const [myTickets, setMyTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // BUSCA OS DADOS NO BACK-END
  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        const userId = user.id || user._id;
        
        // 1. Busca tickets do passageiro e todos os voos
        const ticketsResponse = await api.get(`/tickets/passenger/${userId}`);
        const flightsResponse = await api.get('/flights');
        
        // 2. Cruze os dados para pegar a cidade de origem e destino
// 2. Cruze os dados para pegar a cidade de origem e destino
        const enrichedTickets = ticketsResponse.data
          .map(ticket => {
            const flightDetails = flightsResponse.data.find(f => f.id === ticket.flightId);
            return {
              ...ticket,
              flight: flightDetails || null
            };
          })
          .filter(ticket => ticket.flight !== null); 

        // 3. Ordena para a passagem mais nova aparecer primeiro
        enrichedTickets.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));

        setMyTickets(enrichedTickets);
      } catch (error) {
        console.error("Erro ao buscar as passagens:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyTickets();
    }
  }, [user]);

  // FUNÇÕES DE FORMATAÇÃO
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('pt-BR');
  const formatTime = (dateString) => new Date(dateString).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="dashboard-layout">
      
      {/* SEÇÃO AZUL SUPERIOR (HERO) - Mantida Intacta */}
      <div className="dashboard-hero">
        <div className="dashboard-hero-content">
          
          <nav className="dashboard-nav">
            <h2 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              Next<span>Gate</span>
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
          
          {/* CARD PRINCIPAL (LADO ESQUERDO) - Agora exibe os Cartões de Embarque */}
          <div className="dashboard-card" style={{ gridRow: 'span 2', display: 'flex', flexDirection: 'column' }}>
            <h3>Seus próximos voos</h3>
            
            {loading ? (
              <p style={{ color: '#64748b', marginTop: '16px' }}>Buscando suas viagens...</p>
            ) : myTickets.length === 0 ? (
              // Estado Vazio: O que você já tinha desenhado
              <>
                <p>Você ainda não tem nenhuma viagem programada. Que tal explorar nossos destinos com as melhores companhias aéreas?</p>
                <button className="btn-primary" onClick={() => navigate('/')} style={{ marginTop: '16px', width: 'max-content' }}>
                  Buscar passagens
                </button>
              </>
            ) : (
              // Lista Dinâmica de Cartões de Embarque
              <div className="tickets-grid" style={{ marginTop: '24px', overflowY: 'auto', paddingRight: '8px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {myTickets.map(ticket => (
                  <div key={ticket.id} className="boarding-pass">
                    
                    {/* Lado Esquerdo do Cartão */}
                    <div className="bp-main">
                      <div className="bp-header">
                        <span className="bp-airline">NEXTGATE AIRLINES</span>
                        <span className="bp-date">Comprado em {formatDate(ticket.purchaseDate)}</span>
                      </div>

                      <div className="bp-route">
                        <div className="bp-city">
                          <h2 style={{ fontSize: '32px', margin: 0 }}>{ticket.flight?.origin || '---'}</h2>
                          <p style={{ margin: 0, fontSize: '13px' }}>Origem</p>
                        </div>
                        <div className="bp-airplane">✈</div>
                        <div className="bp-city">
                          <h2 style={{ fontSize: '32px', margin: 0 }}>{ticket.flight?.destination || '---'}</h2>
                          <p style={{ margin: 0, fontSize: '13px' }}>Destino</p>
                        </div>
                      </div>

                      <div className="bp-details">
                        <div className="bp-detail-box">
                          <small>Voo</small>
                          <strong>{ticket.flight?.flightNumber || 'N/A'}</strong>
                        </div>
                        <div className="bp-detail-box">
                          <small>Embarque</small>
                          <strong>{ticket.flight ? formatTime(ticket.flight.departureTime) : 'N/A'}</strong>
                        </div>
                        <div className="bp-detail-box">
                          <small>Assento</small>
                          <strong className="highlight-seat">{ticket.seat}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Lado Direito do Cartão (Canhoto) */}
                    <div className="bp-stub">
                      <div className="barcode-mock">
                        ||| | || | ||| |
                        <br/>
                        <small>{ticket.id.substring(0, 8).toUpperCase()}</small>
                      </div>
                      <div className="stub-info">
                        <small>Passageiro</small>
                        <strong style={{ fontSize: '13px' }}>{user.name}</strong>
                      </div>
                      <div className="stub-info">
                        <small>Assento</small>
                        <strong className="highlight-seat">{ticket.seat}</strong>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CARD SECUNDÁRIO 1 - Lado Direito */}
          <div className="dashboard-card">
            <h3>Alertas de preços</h3>
            <p>Acompanhe os preços da sua rota preferida.</p>
          </div>

          {/* CARD SECUNDÁRIO 2 - Lado Direito */}
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