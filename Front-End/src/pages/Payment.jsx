// src/pages/Payment.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import '../styles/Payment.css';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  // Pega os dados que vieram do Checkout
  const { flight, seat, totalPrice } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('credit_card'); // 'credit_card' ou 'pix'
  const [installments, setInstallments] = useState(1);
  const [paymentState, setPaymentState] = useState('idle');

  // Se acessar direto pela URL sem vir do checkout, volta pro início
  if (!flight || !seat) {
    navigate('/');
    return null;
  }

  const formatPrice = (price) => price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleConfirmPayment = async (e) => {
    e.preventDefault();
    setPaymentState('processing');

    try {
      const ticketData = {
        passengerId: currentUser.id || currentUser._id, 
        flightId: flight.id, 
        seat: seat.id, 
        totalPrice: totalPrice
      };

      // Chama a API para salvar a compra
      await api.post('/tickets', ticketData);
      setPaymentState('success');
      
      setTimeout(() => {
        navigate('/dashboard'); 
      }, 3500);

    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      alert("Houve um erro ao processar seu pagamento. Tente novamente.");
      setPaymentState('idle');
    }
  };

  return (
    <div className="payment-page-container">
      <nav className="navbar checkout-navbar">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Next<span>Gate</span></div>
        <div className="nav-actions">
          <button className="btn-back-outline" onClick={() => navigate(-1)}>Voltar aos Assentos</button>
        </div>
      </nav>

      {/* TELA DE SUCESSO (Mantida igual, pois a lógica de salvar veio pra cá) */}
      {paymentState === 'success' && (
        <div className="payment-success-overlay">
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h2>Pagamento Aprovado!</h2>
            <p>Sua reserva para <strong>{flight.destination}</strong> foi confirmada com sucesso.</p>
            <p>Assento: <strong>{seat.id}</strong></p>
            <small>Redirecionando para o seu painel...</small>
          </div>
        </div>
      )}

      <main className="payment-content">
        <div className="payment-left">
          <h2>Como você prefere pagar?</h2>
          
          <div className="payment-methods-tabs">
            <button 
              className={`method-tab ${paymentMethod === 'credit_card' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('credit_card')}
            >
              💳 Cartão de Crédito
            </button>
            <button 
              className={`method-tab ${paymentMethod === 'pix' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('pix')}
            >
              ❖ Pix
            </button>
          </div>

          <div className="payment-form-container">
            {paymentMethod === 'credit_card' && (
              <form onSubmit={handleConfirmPayment}>
                <div className="form-group">
                  <label>Nome impresso no Cartão</label>
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
                <div className="form-group">
                  <label>Parcelamento</label>
                  <select 
                    value={installments} 
                    onChange={(e) => setInstallments(Number(e.target.value))}
                    className="installments-select"
                  >
                    <option value={1}>1x de R$ {formatPrice(totalPrice)} sem juros</option>
                    <option value={2}>2x de R$ {formatPrice(totalPrice / 2)} sem juros</option>
                    <option value={3}>3x de R$ {formatPrice(totalPrice / 3)} sem juros</option>
                    <option value={4}>4x de R$ {formatPrice(totalPrice / 4)} sem juros</option>
                    <option value={5}>5x de R$ {formatPrice(totalPrice / 5)} sem juros</option>
                    <option value={6}>6x de R$ {formatPrice(totalPrice / 6)} sem juros</option>
                  </select>
                </div>
                <button type="submit" className="btn-confirm-payment" disabled={paymentState === 'processing'}>
                  {paymentState === 'processing' ? 'Processando...' : `Confirmar Pagamento`}
                </button>
              </form>
            )}

            {paymentMethod === 'pix' && (
              <div className="pix-container">
                <p>Escaneie o QR Code abaixo no app do seu banco para pagar.</p>
                <div className="qr-code-mock">
                  {/* Simulando um QR Code visualmente */}
                  <div className="qr-inner"></div>
                </div>
                <p className="pix-value">Valor: <strong>R$ {formatPrice(totalPrice)}</strong></p>
                <button onClick={handleConfirmPayment} className="btn-confirm-payment" disabled={paymentState === 'processing'}>
                  {paymentState === 'processing' ? 'Aguardando Pagamento...' : 'Simular Pagamento Pix'}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="payment-right">
          <div className="summary-card">
            <h3>Resumo da Compra</h3>
            <div className="summary-detail">
              <span>Voo</span>
              <strong>{flight.origin} ✈ {flight.destination}</strong>
            </div>
            <div className="summary-detail">
              <span>Data</span>
              <strong>{new Date(flight.departureTime).toLocaleDateString('pt-BR')}</strong>
            </div>
            <div className="summary-detail">
              <span>Assento</span>
              <strong className="seat-badge">{seat.id}</strong>
            </div>
            <hr />
            <div className="summary-total">
              <span>Total</span>
              <span>R$ {formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}