import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/Usuarios/Login';
import Register from './components/Usuarios/Registro';
import Header from './components/Header';
import Footer from './components/Footer';
import ListarFondos from './components/Fondos/ListarFondo';
import CrearFondo from './components/Fondos/CrearFondo';
import EditarFondo from './components/Fondos/EditarFondo';
import ListarAsignaciones from './components/Asignaciones/ListarAsignaciones';
import CrearAsignacion from './components/Asignaciones/CrearAsignacion';
import EditarAsignacion from './components/Asignaciones/AsignacionesPorFondo';
import Alertas from './components/Alertas/ListarAlerta';

// Simulación de autenticación
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Devuelve true si el token está presente
};

// Componente para proteger rutas privadas
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas sin Header */}
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Register />
            </>
          }
        />

        {/* Rutas con Header */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <>
                <Header />
                <Dashboard />
                <Footer />
              </>
            </PrivateRoute>
          }
        />

        {/* Rutas privadas para Fondos */}
        <Route
          path="/fondos"
          element={
            <PrivateRoute>
              <>
                <Header />
                <ListarFondos />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/fondos/crear"
          element={
            <PrivateRoute>
              <>
                <Header />
                <CrearFondo />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/fondos/editar/:id"
          element={
            <PrivateRoute>
              <>
                <Header />
                <EditarFondo />
                <Footer />
              </>
            </PrivateRoute>
          }
        />

        {/* Rutas privadas para Asignaciones */}
        <Route
          path="/asignaciones"
          element={
            <PrivateRoute>
              <>
                <Header />
                <ListarAsignaciones />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/asignaciones/crear/:fondoId"
          element={
            <PrivateRoute>
              <>
                <Header />
                <CrearAsignacion />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/asignaciones/editar/:asignacionId"
          element={
            <PrivateRoute>
              <>
                <Header />
                <EditarAsignacion />
                <Footer />
              </>
            </PrivateRoute>
          }
        />

        {/* Ruta para alertas */}
        <Route
          path="/alertas"
          element={
            <PrivateRoute>
              <>
                <Header />
                <Alertas />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
