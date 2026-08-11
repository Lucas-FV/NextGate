// src/pages/EditFlight.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';
import '../styles/CreateFlight.css'; // Reaproveitamos 100% do design Full Screen!

export default function EditFlight() {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID do voo pela URL
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const [flightNumber, setFlightNumber] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [price, setPrice] = useState('');
  const [totalCapacity, setTotalCapacity] = useState('');

  // Busca os dados do voo assim que a tela abre
  useEffect(() => {
    const loadFlight = async () => {
      try {
        const response = await api.get(`/flights/${id}`);
        const flight = response.data;
        
        setFlightNumber(flight.flightNumber);
        setOrigin(flight.origin);
        setDestination(flight.destination);
        // O input datetime-local precisa do formato YYYY-MM-DDTHH:mm (16 caracteres)
        setDepartureTime(flight.departureTime.slice(0, 16));
        setArrivalTime(flight.arrivalTime.slice(0, 16));
        setPrice(flight.price);
        setTotalCapacity(flight.totalCapacity);
      } catch (error) {
        console.error("Erro ao carregar voo:", error);
        alert("Voo não encontrado!");
        navigate('/dashboard');
      }
    };
    loadFlight();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
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
      await api.put(`/flights/${id}`, flightData);
      alert('Voo atualizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      console.error("Erro ao atualizar voo:", error);
      alert(error.response?.data || 'Erro ao atualizar voo.');
    }
  };

  const handleDelete = async () => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este voo permanentemente?");
    if (confirmar) {
      try {
        await api.delete(`/flights/${id}`);
        alert('Voo excluído com sucesso!');
        navigate('/dashboard');
      } catch (error) {
        console.error("Erro ao excluir:", error);
        alert('Erro ao excluir o voo.');
      }
    }
  };

  return (
    <div className="cf-page">
      <div className="cf-container">
        
        <div className="cf-banner">
          <h2>Gerenciamento de Rota</h2>
          <p>Altere os horários, capacidades ou remova este voo da sua malha aérea.</p>
        </div>

        <div className="cf-form-section">
          <div className="cf-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1>Editar Voo</h1>
              <p>Atualize as informações técnicas da operação.</p>
            </div>
            {/* Botão de Excluir isolado no topo */}
            <button 
              type="button" 
              onClick={handleDelete}
              style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Excluir Voo
            </button>
          </div>

          <form onSubmit={handleUpdate} className="cf-form-grid">
            
            <div className="cf-input-group full">
              <label className="cf-label">Número do Voo</label>
              <input type="text" className="cf-input" value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)} required />
            </div>

            <div className="cf-input-group">
              <label className="cf-label">Origem</label>
              <input type="text" className="cf-input" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
            </div>

            <div className="cf-input-group">
              <label className="cf-label">Destino</label>
              <input type="text" className="cf-input" value={destination} onChange={(e) => setDestination(e.target.value)} required />
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
              <input type="number" step="0.01" min="0" className="cf-input" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>

            <div className="cf-input-group">
              <label className="cf-label">Capacidade</label>
              <input type="number" min="1" className="cf-input" value={totalCapacity} onChange={(e) => setTotalCapacity(e.target.value)} required />
            </div>

            <div className="cf-actions full">
              <button type="button" className="cf-btn cf-btn-cancel" onClick={() => navigate('/dashboard')}>
                Cancelar
              </button>
              <button type="submit" className="cf-btn cf-btn-submit">
                Salvar Alterações
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}