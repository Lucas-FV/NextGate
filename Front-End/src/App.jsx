import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import CreateFlight from './pages/CreateFlight'; 
import EditFlight from './pages/EditFlight'; 
import Search from './pages/Search';
import Checkout from './pages/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-flight" element={<CreateFlight />} />
        <Route path="/edit-flight/:id" element={<EditFlight />} />
        <Route path="/search" element={<Search />} />
        <Route path="/checkout/:flightId" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;