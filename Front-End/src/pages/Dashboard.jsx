import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import PassengerDashboard from '../components/PassengerDashboard';
import AirlineDashboard from '../components/AirlineDashboard';
import '../styles/Dashboard.css'; // Vamos criar esse CSS em seguida

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  // Proteção de Rota: Se não tiver usuário no LocalStorage, manda pro Login
  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard-wrapper">
      {/* Renderização Condicional baseada na Role */}
      {user.role === 'AIRLINE' ? (
        <AirlineDashboard user={user} onLogout={handleLogout} />
      ) : (
        <PassengerDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}