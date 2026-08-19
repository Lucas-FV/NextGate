// src/pages/Search.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import '../styles/Search.css';

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  // Lendo os parâmetros da URL
  const originParam = searchParams.get('origin') || '';
  const destParam = searchParams.get('destination') || '';
  const dateParam = searchParams.get('date') || '';

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndFilterFlights = async () => {
      try {
        const response = await api.get('/flights');
        let allFlights = response.data;

        // FILTRAGEM DINÂMICA
        if (originParam) {
          allFlights = allFlights.filter(f => f.origin.toUpperCase().includes(originParam.toUpperCase()));
        }
        if (destParam) {
          allFlights = allFlights.filter(f => f.destination.toUpperCase().includes(destParam.toUpperCase()));
        }
        if (dateParam) {
          // Filtra pela data (ignorando a hora)
          allFlights = allFlights.filter(f => f.departureTime.startsWith(dateParam));
        }

        setFlights(allFlights);
      } catch (error) {
        console.error("Erro ao buscar voos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterFlights();
  }, [originParam, destParam, dateParam]);

  const formatPrice = (price) => price.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  
  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

const handleBuy = (flightId) => {
    if (!currentUser) {
      alert("Você precisa fazer login para comprar uma passagem!");
      navigate('/login');
      return;
    }
    if (currentUser.role === 'AIRLINE') {
      alert("Apenas contas de passageiro podem reservar voos.");
      return;
    }
    
    // REDIRECIONA PARA A NOVA TELA DE CHECKOUT PASSANDO O ID
    navigate(`/checkout/${flightId}`);
  };

  return (
    <div className="search-page-container">
      {/* NAVBAR */}
      <nav className="navbar search-navbar">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Next<span>Gate</span>
        </div>
        <div className="nav-actions">
          {currentUser ? (
            <button className="btn-login-outline" onClick={() => navigate('/dashboard')}>Meu Painel</button>
          ) : (
            <button className="btn-login-outline" onClick={() => navigate('/login')}>Fazer Login</button>
          )}
        </div>
      </nav>

      <main className="search-content">
        <div className="search-header">
          <h1>Resultados da Busca</h1>
          <p>
            {originParam || destParam 
              ? `Mostrando voos ${originParam ? `saindo de ${originParam}` : ''} ${destParam ? `para ${destParam}` : ''}`
              : "Mostrando todos os voos disponíveis"}
          </p>
        </div>

        {loading ? (
          <div className="loading-state">Buscando os melhores voos...</div>
        ) : flights.length === 0 ? (
          <div className="empty-state">
            <h2>Nenhum voo encontrado 😕</h2>
            <p>Tente mudar a origem, o destino ou a data da sua busca.</p>
            <button className="btn-back" onClick={() => navigate('/')}>Voltar para o Início</button>
          </div>
        ) : (
          <div className="flights-list">
            {flights.map(flight => (
              <div key={flight.id} className="flight-card">
                
                <div className="flight-info">
                  <div className="flight-route">
                    <div className="time-block">
                      <span className="time">{formatTime(flight.departureTime)}</span>
                      <span className="airport">{flight.origin}</span>
                    </div>
                    
                    <div className="flight-duration">
                      <span className="duration-line"></span>
                      <span className="airplane-icon">✈</span>
                      <span className="duration-line"></span>
                      <small>{flight.flightNumber}</small>
                    </div>

                    <div className="time-block">
                      <span className="time">{formatTime(flight.arrivalTime)}</span>
                      <span className="airport">{flight.destination}</span>
                    </div>
                  </div>
                </div>

                <div className="flight-action">
                  <div className="price-block">
                    <small>Por passageiro</small>
                    <span className="price">R$ {formatPrice(flight.price)}</span>
                  </div>
                  <button className="btn-buy" onClick={() => handleBuy(flight.id)}>
                    Selecionar
                  </button>
                  <small className="seats-left">{flight.totalCapacity} assentos restantes</small>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}