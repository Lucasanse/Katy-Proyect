import { useState } from 'react';
import Home from './Components/home/Home.jsx';
import Wizard from './Components/wizard/Wizard.jsx';
import ConsultarReclamo from './Components/consulta/ConsultarReclamo.jsx';
import Header from './Components/layout/Header.jsx';
import Footer from './Components/layout/Footer.jsx';
import AdminApp from './Components/admin/AdminApp.jsx';

function App() {
  const [view, setView] = useState('home');
  const path = window.location.pathname;

  // Acceso al panel de administración vía /admin, sin link público
  if (path.startsWith('/admin')) {
    return <AdminApp />;
  }

  // "Consultar Reclamo" es una página propia (/consultas), no un estado más del wizard
  if (path.startsWith('/consultas')) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
        <Header onHomeClick={() => { window.location.href = '/'; }} onConsultarClick={() => { window.location.href = '/consultas'; }} />
        <main className="flex-grow">
          <ConsultarReclamo />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    // Agregamos flex y flex-col para manejar el alto de la pantalla y empujar el footer abajo
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">

      {/* Pasamos la función para volver al inicio ('home') */}
      <Header onHomeClick={() => setView('home')} onConsultarClick={() => { window.location.href = '/consultas'; }} />

      {/* main con flex-grow hace que ocupe todo el espacio sobrante disponible */}
      <main className="flex-grow">
        {view === 'home' && <Home onStart={() => setView('wizard')} />}
        {view === 'wizard' && <Wizard onCancel={() => setView('home')} />}
      </main>

      <Footer />
    </div>
  );
}

export default App;