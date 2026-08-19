// src/pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import '../styles/Checkout.css';

export default function Checkout() {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Estados do Checkout
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [finalSeat, setFinalSeat] = useState(null); // Guarda o assento final (escolhido ou sorteado)
  const [paymentState, setPaymentState] = useState('idle'); // idle, processing, success
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    // 1. Busca os dados do voo
    const fetchFlight = async () => {
      try {
        const response = await api.get('/flights'); 
        const currentFlight = response.data.find(f => f.id === flightId);
        setFlight(currentFlight);
      } catch (error) {
        console.error("Erro ao buscar voo:", error);
      } finally {
        setLoading(false);
      }
    };

    // 2. Gera o mapa de assentos totalmente vazio (sem ocupações aleatórias)
    const generateSeats = () => {
      const rows = 12; // 12 fileiras
      const cols = ['A', 'B', 'C', 'D', 'E', 'F'];
      let generatedSeats = [];

      for (let r = 1; r <= rows; r++) {
        cols.forEach(c => {
          const isPremium = r <= 3; // Fileiras 1 a 3 são Premium (+R$ 150)
          const seatPrice = isPremium ? 150 : 50; // Fileiras normais (+R$ 50)
          
          generatedSeats.push({
            id: `${r}${c}`,
            row: r,
            col: c,
            isPremium,
            price: seatPrice,
            isOccupied: false // REGRA ATUALIZADA: Todos os assentos começam livres
          });
        });
      }
      setSeats(generatedSeats);
    };

    fetchFlight();
    generateSeats();
  }, [flightId]);

  const formatPrice = (price) => price.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  
  const handleSeatClick = (seat) => {
    if (seat.isOccupied) return;
    
    // Se clicar no assento que já está selecionado, ele desmarca (permite não escolher nada)
    if (selectedSeat?.id === seat.id) {
      setSelectedSeat(null);
    } else {
      setSelectedSeat(seat);
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setPaymentState('processing');

    let seatToAssign = selectedSeat;

    // REGRA DE NEGÓCIO: Se não escolheu, sorteia um assento BÁSICO e LIVRE
    if (!seatToAssign) {
      const availableBasicSeats = seats.filter(s => !s.isPremium && !s.isOccupied);
      const randomIndex = Math.floor(Math.random() * availableBasicSeats.length);
      seatToAssign = availableBasicSeats[randomIndex];
    }

    // Salva qual foi o assento definitivo para mostrar no modal
    setFinalSeat(seatToAssign);

    // Simula tempo de processamento de cartão (2 segundos)
    setTimeout(() => {
      setPaymentState('success');
      
      // Futuramente, enviaremos o POST para /tickets aqui
      
      // Redireciona para o painel do passageiro
      setTimeout(() => {
        navigate('/dashboard');
      }, 3500);

    }, 2000);
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

      {/* TELA DE SUCESSO */}
      {paymentState === 'success' && (
        <div className="payment-success-overlay">
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h2>Pagamento Aprovado!</h2>
            <p>Sua reserva para <strong>{flight.destination}</strong> foi confirmada com sucesso.</p>
            
            {/* Mostra se o assento foi escolhido ou sorteado */}
            <p>
              Assento: <strong>{finalSeat.id}</strong> 
              {!selectedSeat && <span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>(Atribuído aleatoriamente)</span>}
            </p>
            
            <small>Redirecionando para o seu painel...</small>
          </div>
        </div>
      )}

      <main className="checkout-content">
        
        {/* COLUNA ESQUERDA: Detalhes e Assentos */}
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
        </div>

        {/* COLUNA DIREITA: Pagamento */}
        <div className="checkout-right">
          <div className="payment-card">
            <h2>Pagamento</h2>
            
            <div className="price-breakdown">
              <div className="price-row">
                <span>Passagem ({flight.origin} - {flight.destination})</span>
                <span>R$ {formatPrice(flight.price)}</span>
              </div>
              <div className="price-row">
                {/* Texto dinâmico dependendo se escolheu assento ou não */}
                <span>Assento {selectedSeat ? selectedSeat.id : '(Aleatório básico)'}</span>
                <span>R$ {selectedSeat ? formatPrice(selectedSeat.price) : '0,00'}</span>
              </div>
              <div className="price-divider"></div>
              <div className="price-total">
                <span>Total</span>
                <span>R$ {formatPrice(totalPrice)}</span>
              </div>
            </div>

            <form className="payment-form" onSubmit={handlePayment}>
              <div className="form-group">
                <label>Nome no Cartão</label>
                <input type="text" placeholder="JOAO DA SILVA" required />
              </div>
              <div className="form-group">
                <label>Número do Cartão</label>
                <input type="text" placeholder="0000 0000 0000 0000" maxLength="19" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Validade</label>
                  <input type="text" placeholder="MM/AA" maxLength="5" required />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input type="password" placeholder="123" maxLength="3" required />
                </div>
              </div>

              {/* Removida a trava "!selectedSeat", agora ele pode pagar sem escolher */}
              <button 
                type="submit" 
                className="btn-confirm-payment" 
                disabled={paymentState === 'processing'}
              >
                {paymentState === 'processing' ? 'Processando...' : `Pagar R$ ${formatPrice(totalPrice)}`}
              </button>
            </form>
          </div>
        </div>

      </main>
    </div>
  );
}