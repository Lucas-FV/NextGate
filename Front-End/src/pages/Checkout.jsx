// src/pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import '../styles/Checkout.css';

export default function Checkout() {
  const { flightId } = useParams();
  const navigate = useNavigate();

  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const fetchFlightAndSeats = async () => {
      try {
        const flightResponse = await api.get('/flights'); 
        const currentFlight = flightResponse.data.find(f => f.id === flightId);
        setFlight(currentFlight);

        const ticketsResponse = await api.get(`/tickets/flight/${flightId}`);
        const occupiedSeatIds = ticketsResponse.data.map(ticket => ticket.seat);

        // --- NOVA LÓGICA DINÂMICA DE ASSENTOS ---
        const capacity = currentFlight.totalCapacity; 
        const cols = ['A', 'B', 'C', 'D', 'E', 'F'];
        
        // Calcula quantas fileiras o avião vai ter (ex: 200 / 6 = 33.33 -> arredonda para 34)
        const rows = Math.ceil(capacity / cols.length); 
        let generatedSeats = [];
        let seatCount = 0; // Contador para não criarmos assentos a mais na última fileira

        for (let r = 1; r <= rows; r++) {
          for (let i = 0; i < cols.length; i++) {
            // Se já desenhou todos os assentos da capacidade, para o loop
            if (seatCount >= capacity) break; 

            const c = cols[i];
            // Vamos definir que uns 15% iniciais do avião são Premium
            const isPremium = r <= Math.ceil(rows * 0.15); 
            const seatPrice = isPremium ? 150 : 50;
            const seatId = `${r}${c}`;
            
            generatedSeats.push({
              id: seatId,
              row: r,
              col: c,
              isPremium,
              price: seatPrice,
              isOccupied: occupiedSeatIds.includes(seatId) 
            });

            seatCount++;
          }
        }
        setSeats(generatedSeats);
        // ---------------------------------------

      } catch (error) {
        console.error("Erro ao buscar dados do checkout:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlightAndSeats();
  }, [flightId]);

  const formatPrice = (price) => price.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  
  const handleSeatClick = (seat) => {
    if (seat.isOccupied) return;
    if (selectedSeat?.id === seat.id) {
      setSelectedSeat(null);
    } else {
      setSelectedSeat(seat);
    }
  };

  // NOVA AÇÃO DO BOTÃO: Apenas redireciona para a tela de pagamento
  const handleGoToPayment = () => {
    let seatToAssign = selectedSeat;

    // Se não escolheu, sorteia um livre
    if (!seatToAssign) {
      const availableBasicSeats = seats.filter(s => !s.isPremium && !s.isOccupied);
      const randomIndex = Math.floor(Math.random() * availableBasicSeats.length);
      seatToAssign = availableBasicSeats[randomIndex];
    }

    // Leva o usuário para a rota /payment, passando os dados no "state"
    navigate('/payment', {
      state: {
        flight,
        seat: seatToAssign,
        totalPrice: flight.price + seatToAssign.price
      }
    });
  };

  if (loading) return <div className="checkout-loading">Preparando seu voo...</div>;
  if (!flight) return <div className="checkout-loading">Voo não encontrado.</div>;

  const totalPrice = flight.price + (selectedSeat ? selectedSeat.price : 0);

  return (
    <div className="checkout-container">
      <nav className="navbar checkout-navbar">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Next<span>Gate</span></div>
        <div className="nav-actions">
          <button className="btn-back-outline" onClick={() => navigate(-1)}>Voltar</button>
        </div>
      </nav>

      <main className="checkout-content">
        <div className="checkout-left">
          <div className="flight-summary-card">
            <h2>Resumo do Voo</h2>
            <div className="flight-summary-route">
              <div>
                <span className="fs-airport">{flight.origin}</span>
                <span className="fs-time">{new Date(flight.departureTime).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
              <div className="fs-airplane">✈</div>
              <div>
                <span className="fs-airport">{flight.destination}</span>
                <span className="fs-time">{new Date(flight.arrivalTime).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
            </div>
            <p className="fs-date">Data: {new Date(flight.departureTime).toLocaleDateString('pt-BR')}</p>
          </div>

          <div className="seat-selection-card">
            <h2>Escolha seu Assento <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 'normal' }}>(Opcional)</span></h2>
            <div className="seat-legend">
              <span className="legend-item"><div className="seat-box available"></div> Livre (+R$ 50)</span>
              <span className="legend-item"><div className="seat-box premium"></div> Premium (+R$ 150)</span>
              <span className="legend-item"><div className="seat-box occupied"></div> Ocupado</span>
              <span className="legend-item"><div className="seat-box selected"></div> Selecionado</span>
            </div>

            {/* AQUI ESTÁ A ATUALIZAÇÃO DO SCROLL */}
            <div className="airplane-scroll">
              <div className="airplane-cabin">
                <div className="cabin-front"></div>
                <div className="seat-grid">
                  {seats.map(seat => {
                    let seatClass = 'seat ';
                    if (seat.isOccupied) seatClass += 'occupied';
                    else if (selectedSeat?.id === seat.id) seatClass += 'selected';
                    else if (seat.isPremium) seatClass += 'premium';
                    else seatClass += 'available';

                    const isAisle = seat.col === 'C';

                    return (
                      <div 
                        key={seat.id} 
                        className={`${seatClass} ${isAisle ? 'aisle' : ''}`}
                        onClick={() => handleSeatClick(seat)}
                      >
                        {seat.id}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* FIM DA ATUALIZAÇÃO DO SCROLL */}

          </div>
        </div>

        <div className="checkout-right">
          <div className="payment-card">
            <h2>Valores da Viagem</h2>
            
            <div className="price-breakdown">
              <div className="price-row">
                <span>Passagem ({flight.origin} - {flight.destination})</span>
                <span>R$ {formatPrice(flight.price)}</span>
              </div>
              <div className="price-row">
                <span>Assento {selectedSeat ? selectedSeat.id : '(Aleatório básico)'}</span>
                <span>R$ {selectedSeat ? formatPrice(selectedSeat.price) : '0,00'}</span>
              </div>
              <div className="price-divider"></div>
              <div className="price-total">
                <span>Total a Pagar</span>
                <span>R$ {formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* BOTÃO ATUALIZADO */}
            <button className="btn-confirm-payment" onClick={handleGoToPayment}>
              Ir para Pagamento
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}