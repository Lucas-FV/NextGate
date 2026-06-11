// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Tentativa de Login com:", { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* COLUNA DA ESQUERDA: FORMULÁRIO */}
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

            <button type="submit" className="login-button">
              Entrar
            </button>
          </form>

          {/* Link para a página de registro */}
          <p className="switch-to-register">
            Não tem uma conta? <span onClick={() => navigate('/register')}>Criar conta</span>
          </p>
        </div>

        {/* COLUNA DA DIREITA: IMAGEM COM CORTE */}
        <div className="login-image-side">
          <div className="login-image-overlay"></div>
        </div>

      </div>
    </div>
  );
}