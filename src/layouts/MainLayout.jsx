import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/ui/Sidebar';

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Función para verificar si es pantalla móvil
  const checkIsMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-full">
        {/* Overlay para móvil cuando el menú está abierto */}
        {isMobileMenuOpen && isMobile && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}

        {/* Sidebar - Visible en desktop o cuando el menú móvil está abierto */}
        <div 
          className={`${
            isMobile 
              ? 'fixed z-30 transition-transform duration-300 transform h-full'
              : 'sticky top-0 h-screen'
          } ${
            isMobileMenuOpen || !isMobile ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
        </div>

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col min-h-screen"> 
          {isMobile && (
            <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 className="text-xl font-bold text-gray-700">Panel de Control</h1>
                <div className="w-6"></div> {/* Spacer para centrar el título */}
              </div>
            </header>
          )}

          <main className="flex-grow container mx-auto px-4 sm:px-6 py-6">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
          
          <footer className="border-t border-gray-200">
            <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-500">
              <p>© {new Date().getFullYear()} ZOCO App - Todos los derechos reservados</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MainLayout; 