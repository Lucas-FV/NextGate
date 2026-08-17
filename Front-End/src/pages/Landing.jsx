// src/pages/Landing.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';

// --- DADOS FICTÍCIOS PARA A VITRINE DE VOOS ---
const featuredFlights = [
  { id: 1, origin: 'GRU', dest: 'JFK', city: 'Nova York', price: '2.450,00', date: '15 Nov 2026' },
  { id: 2, origin: 'CNF', dest: 'CDG', city: 'Paris', price: '3.120,00', date: '02 Dez 2026' },
  { id: 3, origin: 'GIG', dest: 'MIA', city: 'Miami', price: '1.890,00', date: '20 Out 2026' }
];

// --- 15 DESTINOS INSPIRADORES ---
const allDestinations = [
  {
    id: 1,
    name: 'Tóquio, Japão',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop',
    description: 'A fusão perfeita entre a tradição milenar e a tecnologia futurista.',
    spots: ['Monte Fuji', 'Templo Senso-ji', 'Cruzamento de Shibuya', 'Torre de Tóquio']
  },
  {
    id: 2,
    name: 'Roma, Itália',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000&auto=format&fit=crop',
    description: 'Conhecida como a Cidade Eterna, Roma é um verdadeiro museu a céu aberto.',
    spots: ['Coliseu', 'Fontana di Trevi', 'Vaticano', 'Panteão']
  },
  {
    id: 3,
    name: 'Machu Picchu, Peru',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1000&auto=format&fit=crop',
    description: 'Escondida no alto da Cordilheira dos Andes, esta antiga cidade inca é uma maravilha.',
    spots: ['Trilha Inca', 'Templo do Sol', 'Intihuatana', 'Montanha Huayna Picchu']
  },
  {
    id: 4,
    name: 'Paris, França',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1000&auto=format&fit=crop',
    description: 'A cidade luz exala romance, arte e uma gastronomia de classe mundial.',
    spots: ['Torre Eiffel', 'Museu do Louvre', 'Catedral de Notre-Dame', 'Arco do Triunfo']
  },
  {
    id: 5,
    name: 'Nova York, EUA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000&auto=format&fit=crop',
    description: 'A cidade que nunca dorme, repleta de arranha-céus icônicos e cultura vibrante.',
    spots: ['Estátua da Liberdade', 'Central Park', 'Times Square', 'Empire State Building']
  },
  {
    id: 6,
    name: 'Rio de Janeiro, Brasil',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1000&auto=format&fit=crop',
    description: 'Praias deslumbrantes, montanhas verdes e uma energia contagiante.',
    spots: ['Cristo Redentor', 'Pão de Açúcar', 'Copacabana', 'Jardim Botânico']
  },
  {
    id: 7,
    name: 'Sydney, Austrália',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1000&auto=format&fit=crop',
    description: 'Uma metrópole litorânea com uma arquitetura icônica e praias para surfistas.',
    spots: ['Opera House', 'Bondi Beach', 'Harbour Bridge', 'Taronga Zoo']
  },
  {
    id: 8,
    name: 'Cidade do Cabo, África do Sul',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=1000&auto=format&fit=crop',
    description: 'Onde majestosas montanhas encontram as águas cristalinas do oceano.',
    spots: ['Table Mountain', 'Cabo da Boa Esperança', 'Robben Island', 'Boulders Beach']
  },
  {
    id: 9,
    name: 'Bangkok, Tailândia',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=1000&auto=format&fit=crop',
    description: 'Templos dourados, mercados de rua vibrantes e uma vida noturna agitada.',
    spots: ['Grande Palácio', 'Wat Arun', 'Mercado Flutuante', 'Khao San Road']
  },
  {
    id: 10,
    name: 'Santorini, Grécia',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1000&auto=format&fit=crop',
    description: 'Casas brancas com cúpulas azuis debruçadas sobre um mar azul-turquesa.',
    spots: ['Oia', 'Fira', 'Praia Vermelha', 'Ruínas de Akrotiri']
  },
  {
    id: 11,
    name: 'Dubai, EAU',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000&auto=format&fit=crop',
    description: 'Uma metrópole futurista erguida nas areias do deserto com luxo incomparável.',
    spots: ['Burj Khalifa', 'Dubai Mall', 'Palm Jumeirah', 'Burj Al Arab']
  },
  {
    id: 12,
    name: 'Cancún, México',
    image: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=1000&auto=format&fit=crop',
    description: 'O paraíso caribenho com praias de areia branca e incríveis ruínas maias.',
    spots: ['Chichén Itzá', 'Isla Mujeres', 'Cenote Ik Kil', 'Xcaret']
  },
  {
    id: 13,
    name: 'Istambul, Turquia',
    image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=1000&auto=format&fit=crop', 
    description: 'A ponte mágica entre a Europa e a Ásia, rica em história e especiarias.',
    spots: ['Hagia Sophia', 'Mesquita Azul', 'Grande Bazar', 'Palácio Topkapi']
  },
  {
    id: 14,
    name: 'Londres, Reino Unido',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000&auto=format&fit=crop',
    description: 'Uma mistura fascinante de realeza, história monumental e cultura pop.',
    spots: ['Big Ben', 'London Eye', 'Palácio de Buckingham', 'Tower Bridge']
  },
  {
    id: 15,
    name: 'Bali, Indonésia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop',
    description: 'A ilha dos deuses, com florestas exuberantes, templos e praias de surf.',
    spots: ['Floresta dos Macacos', 'Uluwatu', 'Terraços de Arroz Tegalalang', 'Templo Tanah Lot']
  }
];

export default function Landing() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  // Estados
  const [selectedDest, setSelectedDest] = useState(null); 
  const [startIndex, setStartIndex] = useState(0);        
  const [isFading, setIsFading] = useState(false);

  // Lógica de Rotação Suave
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);

      setTimeout(() => {
        setStartIndex((prevIndex) => {
          if (prevIndex + 3 >= allDestinations.length) {
            return 0;
          }
          return prevIndex + 3;
        });

        setIsFading(false);
      }, 500); 

    }, 20000); 

    return () => clearInterval(interval);
  }, []);

  const currentDestinations = allDestinations.slice(startIndex, startIndex + 3);

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo">Next<span>Gate</span></div>
        <div className="nav-actions">
          <button className="nav-link">Suporte</button>
          <button className="nav-link">Ofertas</button>
          {currentUser ? (
            <button className="btn-login-outline" onClick={() => navigate('/dashboard')}>Meu Painel</button>
          ) : (
            <button className="btn-login-outline" onClick={() => navigate('/login')}>Fazer Login</button>
          )}
        </div>
      </nav>

      <main className="hero-section">
        <h1 className="hero-title">Encontre e reserve <br /> uma grande experiência</h1>
        <p className="hero-subtitle">Voos exclusivos com o máximo de conforto para o seu próximo destino.</p>

        <div className="hero-image-container">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" 
            alt="Avião moderno no céu" 
            className="hero-image"
          />
        </div>

        <div className="search-widget">
          <div className="search-field"><label>📍 Origem</label><input type="text" placeholder="De onde você sai?" /></div>
          <div className="divider"></div>
          <div className="search-field"><label>🛬 Destino</label><input type="text" placeholder="Para onde quer ir?" /></div>
          <div className="divider"></div>
          <div className="search-field"><label>📅 Data de Ida</label><input type="date" /></div>
          <button className="btn-search-main">Buscar Voos</button>
        </div>
      </main>

      <section className="featured-section">
        <h2 className="section-title">Ofertas Imperdíveis</h2>
        <p className="section-subtitle">Aproveite nossos melhores preços para viajar nas próximas semanas.</p>
        <div className="featured-grid">
          {featuredFlights.map(flight => (
            <div key={flight.id} className="featured-card">
              <span className="featured-tag">SÓ DE IDA • {flight.date}</span>
              <div className="featured-route">
                <span>{flight.origin}</span>
                <span className="featured-plane-icon">✈</span>
                <span>{flight.dest}</span>
              </div>
              <span className="featured-city">Para {flight.city}</span>
              <div className="featured-price">R$ {flight.price}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="destinations-section">
        <div className="destinations-wrapper">
          <h2 className="section-title">Inspirações para sua próxima viagem</h2>
          <p className="section-subtitle">Explore destinos fascinantes e planeje seu roteiro com o NextGate.</p>
          
          {/* Adicionamos o condicional para a classe 'fade-out' atuar junto com o Estado */}
          <div className={`destinations-grid ${isFading ? 'fade-out' : ''}`}>
            {currentDestinations.map(dest => (
              <div key={dest.id} className="destination-card" onClick={() => setSelectedDest(dest)}>
                <img src={dest.image} alt={dest.name} />
                <div className="destination-info">
                  <h3>{dest.name}</h3>
                  <span className="destination-hint">Toque para descobrir</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal permanece igual */}
      {selectedDest && (
        <div className="modal-overlay" onClick={() => setSelectedDest(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedDest(null)}>✕</button>
            <img src={selectedDest.image} alt={selectedDest.name} className="modal-image" />
            
            <div className="modal-body">
              <h2>{selectedDest.name}</h2>
              <p>{selectedDest.description}</p>
              
              <h4 className="modal-spots-title">Pontos Turísticos Imperdíveis:</h4>
              <div className="modal-spots">
                {selectedDest.spots.map((spot, index) => (
                  <span key={index} className="spot-tag">📍 {spot}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}