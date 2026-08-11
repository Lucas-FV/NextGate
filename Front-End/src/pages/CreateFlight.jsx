// src/pages/CreateFlight.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import '../styles/CreateFlight.css'; // <-- Importando apenas o novo CSS

export default function CreateFlight() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const [flightNumber, setFlightNumber] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [price, setPrice] = useState('');
  const [totalCapacity, setTotalCapacity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const flightData = {
      airlineId: currentUser.id,
      flightNumber,
      origin,
      destination,
      departureTime,
      arrivalTime,
      price: parseFloat(price),
      totalCapacity: parseInt(totalCapacity)
    };

    try {
      await api.post('/flights', flightData);
      alert('Voo cadastrado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      console.error("Erro ao cadastrar voo:", error);
      alert(error.response?.data || 'Erro ao cadastrar voo. Verifique os dados.');
    }
  };

  return (
    <div className="cf-page">
      <div className="cf-container">
        
        {/* Lado Esquerdo: Painel Temático */}
        <div className="cf-banner">
          <h2>Pronto para decolar?</h2>
          <p>Cadastre novas rotas, defina horários e expanda a malha aérea da sua companhia no NextGate.</p>
        </div>

        {/* Lado Direito: Formulário */}
        <div className="cf-form-section">
          <div className="cf-header">
            <h1>Cadastrar Novo Voo</h1>
            <p>Preencha os dados técnicos da operação.</p>
          </div>

          <form onSubmit={handleSubmit} className="cf-form-grid">
            
            <div className="cf-input-group full">
              <label className="cf-label">Número do Voo (Ex: NXT-1024)</label>
              <input type="text" className="cf-input" value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)} required />
            </div>

            <div className="cf-input-group">
              <label className="cf-label">Origem (Sigla/Cidade)</label>
              <input type="text" className="cf-input" placeholder="Ex: GRU" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
            </div>

            <div className="cf-input-group">
              <label className="cf-label">Destino (Sigla/Cidade)</label>
              <input type="text" className="cf-input" placeholder="Ex: JFK" value={destination} onChange={(e) => setDestination(e.target.value)} required />
            </div>

            <div className="cf-input-group">
              <label className="cf-label">Decolagem</label>
              <input type="datetime-local" className="cf-input" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} required />
            </div>

            <div className="cf-input-group">
              <label className="cf-label">Pouso</label>
              <input type="datetime-local" className="cf-input" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} required />
            </div>

            <div className="cf-input-group">
              <label className="cf-label">Preço (R$)</label>
              <input type="number" step="0.01" min="0" className="cf-input" placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>

            <div className="cf-input-group">
              <label className="cf-label">Capacidade</label>
              <input type="number" min="1" className="cf-input" placeholder="Qtd. de Assentos" value={totalCapacity} onChange={(e) => setTotalCapacity(e.target.value)} required />
            </div>

            <div className="cf-actions full">
              <button type="button" className="cf-btn cf-btn-cancel" onClick={() => navigate('/dashboard')}>
                Cancelar
              </button>
              <button type="submit" className="cf-btn cf-btn-submit">
                Publicar Voo
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}