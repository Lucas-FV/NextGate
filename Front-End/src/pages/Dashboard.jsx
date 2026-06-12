// src/pages/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  // Recupera o usuário do LocalStorage
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Painel de Controle</h1>
      {user ? (
        <p>Olá, <strong>{user.name}</strong>! Você está logado como {user.role}.</p>
      ) : (
        <p>Carregando dados...</p>
      )}
      <button 
        onClick={handleLogout}
        style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#325fb4', color: 'white', border: 'none', borderRadius: '8px' }}
      >
        Sair do Sistema
      </button>
    </div>
  );
}