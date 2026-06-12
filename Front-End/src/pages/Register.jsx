// src/pages/Register.jsx
import React, { useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

export default function Register() {
  const [isAirline, setIsAirline] = useState(false);
  const navigate = useNavigate();

  // Estados dos campos - Passageiro
  const [pName, setPName] = useState('');
  const [pEmail, setPEmail] = useState('');
  const [pPassword, setPPassword] = useState('');
  const [pDocument, setPDocument] = useState('');

  // Estados dos campos - Empresa Aérea
  const [aName, setAName] = useState('');
  const [aEmail, setAEmail] = useState('');
  const [aPassword, setAPassword] = useState('');
  const [aDocument, setADocument] = useState('');

  // Função centralizada para disparar o POST para o Spring Boot
  const handleRegister = async (e, role, name, email, document, password) => {
    e.preventDefault();
    
    const payload = {
      name,
      email,
      document,
      password,
      role
    };

    try {
      await api.post('/users', payload);
      alert('Cadastro realizado com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch (error) {
      // Isso vai extrair a mensagem exata de erro que o Spring Boot devolveu!
      if (error.response && error.response.data) {
        console.error("Motivo da recusa do Java:", error.response.data);
        alert("Erro do Servidor: " + JSON.stringify(error.response.data));
      } else {
        console.error("Erro desconhecido:", error);
        alert('Erro ao realizar o cadastro. Verifique os dados.');
      }
    }
  };

  return (
    <div className="register-container">
      {/* O card principal agora dita as regras do espaço visível */}
      <div className={`register-card ${isAirline ? 'show-airline' : 'show-passenger'}`}>
        
        {/* A ESTEIRA DESLIZANTE GIGANTE */}
        <div className="sliding-wrapper">
          
          {/* SEÇÃO 1: FORMULÁRIO DE PASSAGEIRO */}
          <div className="form-section">
            <div className="form-content">
              <h2 className="register-title">Cadastro de Passageiro</h2>
              <p className="register-subtitle">Crie sua conta no NextGate</p>

              <div className="type-switcher">
                <button type="button" className="active">Passageiro</button>
                <button type="button" onClick={() => setIsAirline(true)}>Empresa Aérea</button>
              </div>

              {/* Conectado à API com role "PASSENGER" */}
              <form onSubmit={(e) => handleRegister(e, "PASSENGER", pName, pEmail, pDocument, pPassword)}>
                <div className="reg-input-group">
                  <label>Nome Completo</label>
                  <input type="text" placeholder="Seu nome completo" value={pName} onChange={(e) => setPName(e.target.value)} required />
                </div>
                <div className="reg-input-group">
                  <label>E-mail</label>
                  <input type="email" placeholder="seu@email.com" value={pEmail} onChange={(e) => setPEmail(e.target.value)} required />
                </div>
                <div className="reg-input-group">
                  <label>CPF ou Passaporte</label>
                  <input type="text" placeholder="000.000.000-00" value={pDocument} onChange={(e) => setPDocument(e.target.value)} required />
                </div>
                <div className="reg-input-group">
                  <label>Senha</label>
                  <input type="password" placeholder="••••••••" value={pPassword} onChange={(e) => setPPassword(e.target.value)} required />
                </div>
                <button type="submit" className="register-btn">Cadastrar</button>
              </form>
              <p className="back-to-login">Já tem uma conta? <span onClick={() => navigate('/login')}>Entrar</span></p>
            </div>
          </div>

          {/* SEÇÃO INTERMEDIÁRIA: A IMAGEM QUE FLUTUA NO MEIO */}
          <div className="image-section">
            <div className="clip-container">
              <div className="image-bg passenger-img"></div>
              <div className="image-bg airline-img"></div>
              <div className="image-overlay"></div>
            </div>
          </div>

          {/* SEÇÃO 2: FORMULÁRIO DE EMPRESA */}
          <div className="form-section">
            <div className="form-content">
              <h2 className="register-title">Cadastro de Empresa Aérea</h2>
              <p className="register-subtitle">Crie sua conta no NextGate</p>

              <div className="type-switcher">
                <button type="button" onClick={() => setIsAirline(false)}>Passageiro</button>
                <button type="button" className="active">Empresa Aérea</button>
              </div>

              {/* Conectado à API com role "AIRLINE" */}
              <form onSubmit={(e) => handleRegister(e, "AIRLINE", aName, aEmail, aDocument, aPassword)}>
                <div className="reg-input-group">
                  <label>Nome da Empresa</label>
                  <input type="text" placeholder="Nome da Linha Aérea" value={aName} onChange={(e) => setAName(e.target.value)} required />
                </div>
                <div className="reg-input-group">
                  <label>E-mail</label>
                  <input type="email" placeholder="contato@empresa.com" value={aEmail} onChange={(e) => setAEmail(e.target.value)} required />
                </div>
                <div className="reg-input-group">
                  <label>CNPJ</label>
                  <input type="text" placeholder="00.000.000/0001-00" value={aDocument} onChange={(e) => setADocument(e.target.value)} required />
                </div>
                <div className="reg-input-group">
                  <label>Senha</label>
                  <input type="password" placeholder="••••••••" value={aPassword} onChange={(e) => setAPassword(e.target.value)} required />
                </div>
                <button type="submit" className="register-btn">Cadastrar Empresa</button>
              </form>
              <p className="back-to-login">Já tem uma conta? <span onClick={() => navigate('/login')}>Entrar</span></p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}