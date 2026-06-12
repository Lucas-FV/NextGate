// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api'; // Importando nossa API
import '../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // 1. Fazemos o POST para a rota de login que vamos criar no Java
      const response = await api.post('/users/login', { email, password });

      // 2. Por enquanto, vamos salvar os dados do usuário no LocalStorage
      // Isso simula o comportamento de "sessão"
      localStorage.setItem('user', JSON.stringify(response.data));

      alert(`Bem-vindo de volta, ${response.data.name}!`);

      // 3. Redireciona para o painel principal
      navigate('/dashboard');

    } catch (error) {
      console.error("Erro no login:", error);
      if (error.response && error.response.status === 401) {
        alert("E-mail ou senha incorretos.");
      } else {
        alert("Erro ao conectar com o servidor. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-form-side">
          <h1 className="login-title">Next<span>Gate</span></h1>
          <p className="login-subtitle">Acesse o seu painel de voos</p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input 
                type="email" 
                id="email" 
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input 
                type="password" 
                id="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="login-button">Entrar</button>
          </form>

          <p className="switch-to-register">
            Não tem uma conta? <span onClick={() => navigate('/register')}>Criar conta</span>
          </p>
        </div>

        <div className="login-image-side">
          <div className="login-image-overlay"></div>
        </div>
      </div>
    </div>
  );
}