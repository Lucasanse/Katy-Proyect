import { useState } from 'react';
import Home from './Components/home/home.jsx'; 
import Wizard from './Components/wizard/wizard.jsx';

function App() {
  const [view, setView] = useState('home');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {view === 'home' ? (
        <Home onStart={() => setView('wizard')} />
      ) : (
        <Wizard onCancel={() => setView('home')} />
      )}
    </div>
  );
}

export default App;