import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TradeList from './pages/TradeList';
import AddTrade from './pages/AddTrade';
import EditTrade from './pages/EditTrade';
import TradeDetail from './pages/TradeDetail';
import Analytics from './pages/Analytics';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/trades"
              element={
                <PrivateRoute>
                  <TradeList />
                </PrivateRoute>
              }
            />
            <Route
              path="/trades/add"
              element={
                <PrivateRoute>
                  <AddTrade />
                </PrivateRoute>
              }
            />
            <Route
              path="/trades/edit/:id"
              element={
                <PrivateRoute>
                  <EditTrade />
                </PrivateRoute>
              }
            />
            <Route
              path="/trades/:id"
              element={
                <PrivateRoute>
                  <TradeDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <PrivateRoute>
                  <Analytics />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
