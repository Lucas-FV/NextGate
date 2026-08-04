// src/pages/Profile.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import '../styles/Register.css'; // Podemos reaproveitar o CSS do formulário de cadastro!

export default function Profile() {
  const navigate = useNavigate();
  // Pega os dados atuais do LocalStorage
  const currentUser = JSON.parse(localStorage.getItem('user'));

  // Inicializa os estados com os dados do usuário
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [document, setDocument] = useState(currentUser?.document || '');
  const [password, setPassword] = useState(''); // Deixamos vazio por padrão

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    const payload = { name, email, document, password };

    try {
      // Dispara o PUT para atualizar usando o ID do usuário
      const response = await api.put(`/users/${currentUser.id}`, payload);
      
      // Atualiza o LocalStorage com os novos dados
      localStorage.setItem('user', JSON.stringify(response.data));
      
      alert('Dados atualizados com sucesso!');
      navigate('/dashboard'); // Volta para o painel
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert('Erro ao atualizar os dados. Tente novamente.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card show-passenger" style={{ maxWidth: '600px', margin: '0 auto', height: 'auto', padding: '40px' }}>
        
        <h2 className="register-title" style={{ textAlign: 'center' }}>
          Gerenciar Conta
        </h2>
        <p className="register-subtitle" style={{ textAlign: 'center', marginBottom: '30px' }}>
          Atualize seus dados pessoais ou corporativos
        </p>

        <form onSubmit={handleUpdate}>
          <div className="reg-input-group">
            <label>Nome Completo / Empresa</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          
          <div className="reg-input-group">
            <label>E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          
          <div className="reg-input-group">
            <label>Documento (CPF/CNPJ/Passaporte)</label>
            <input type="text" value={document} onChange={(e) => setDocument(e.target.value)} required />
          </div>
          
          <div className="reg-input-group">
            <label>Nova Senha (deixe em branco para não alterar)</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          
          <div style={{ display: 'flex', gap: '16px', marginTop: '30px' }}>
            <button type="button" onClick={() => navigate('/dashboard')} style={{ flex: 1, padding: '14px', borderRadius: '8px', border: '1.5px solid #cbd5e0', background: 'transparent', cursor: 'pointer', fontWeight: '600' }}>
              Cancelar
            </button>
            <button type="submit" className="register-btn" style={{ flex: 1, marginTop: 0 }}>
              Salvar Alterações
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}