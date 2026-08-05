// src/pages/Profile.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import '../styles/Register.css'; 
import '../styles/Profile.css';  

export default function Profile() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  // Variável auxiliar para facilitar as verificações no JSX
  const isAirline = currentUser?.role === 'AIRLINE';

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [document, setDocument] = useState(currentUser?.document || '');
  const [password, setPassword] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    const payload = { name, email, document, password };

    try {
      const response = await api.put(`/users/${currentUser.id}`, payload);
      localStorage.setItem('user', JSON.stringify(response.data));
      alert('Dados atualizados com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert('Erro ao atualizar os dados. Tente novamente.');
    }
  };

  return (
    <div className="register-container">
      <div className="profile-card">
        
        <div className="profile-header">
          <h2 className="profile-title">Gerenciar Conta</h2>
          {/* Subtítulo dinâmico */}
          <p className="profile-subtitle">
            {isAirline 
              ? 'Atualize os dados corporativos da sua empresa' 
              : 'Atualize seus dados pessoais'}
          </p>
        </div>

        <form onSubmit={handleUpdate} className="profile-form">
          
          <div className="profile-input-group">
            {/* Label de Nome dinâmico */}
            <label className="profile-label">
              {isAirline ? 'Nome da Empresa' : 'Nome Completo'}
            </label>
            <input 
              type="text" 
              className="profile-input"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          
          <div className="profile-input-group">
            <label className="profile-label">E-mail</label>
            <input 
              type="email" 
              className="profile-input"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="profile-input-group">
            {/* Label de Documento dinâmico */}
            <label className="profile-label">
              {isAirline ? 'CNPJ' : 'CPF ou Passaporte'}
            </label>
            <input 
              type="text" 
              className="profile-input"
              value={document} 
              onChange={(e) => setDocument(e.target.value)} 
              required 
            />
          </div>
          
          <div className="profile-input-group">
            <label className="profile-label">Nova Senha (deixe em branco para não alterar)</label>
            <input 
              type="password" 
              className="profile-input"
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          
          <div className="profile-actions">
            <button 
              type="button" 
              className="btn-cancel"
              onClick={() => navigate('/dashboard')} 
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-save"
            >
              Salvar Alterações
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}