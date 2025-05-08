import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ onClose }) => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (onClose) onClose();
  };

  const isActive = (path) => location.pathname === path;
  
  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className="bg-gray-100 w-64 min-h-screen flex flex-col border-r border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-700">Panel de Control</h1>
          <div className="text-sm text-gray-500 mt-1">
            {user?.name} ({user?.role === 'admin' ? 'Administrador' : 'Usuario'})
          </div>
        </div>
        {/* Botón de cerrar para móvil */}
        {onClose && (
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 md:hidden"
            aria-label="Cerrar menú"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <nav className="flex-1 pt-4 overflow-y-auto">
        <ul>
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center px-6 py-3 hover:bg-gray-200 ${
                isActive('/dashboard') ? 'bg-gray-200 border-l-4 border-blue-500' : ''
              }`}
              onClick={handleLinkClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>Inicio</span>
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link
                to="/users"
                className={`flex items-center px-6 py-3 hover:bg-gray-200 ${
                  isActive('/users') ? 'bg-gray-200 border-l-4 border-blue-500' : ''
                }`}
                onClick={handleLinkClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span>Usuarios</span>
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/profile"
              className={`flex items-center px-6 py-3 hover:bg-gray-200 ${
                isActive('/profile') ? 'bg-gray-200 border-l-4 border-blue-500' : ''
              }`}
              onClick={handleLinkClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span>Mi Perfil</span>
            </Link>
          </li>
          <li>
            <Link
              to="/studies"
              className={`flex items-center px-6 py-3 hover:bg-gray-200 ${
                isActive('/studies') ? 'bg-gray-200 border-l-4 border-blue-500' : ''
              }`}
              onClick={handleLinkClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              <span>Estudios</span>
            </Link>
          </li>
          <li>
            <Link
              to="/addresses"
              className={`flex items-center px-6 py-3 hover:bg-gray-200 ${
                isActive('/addresses') ? 'bg-gray-200 border-l-4 border-blue-500' : ''
              }`}
              onClick={handleLinkClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>Direcciones</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center text-red-600 hover:text-red-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-1 1V16H4V4h8.586l1-1H3zm9.707 1.707a1 1 0 00-1.414 0L8.586 8.414 7.293 7.121a1 1 0 00-1.414 1.414L7.586 10l-1.707 1.707a1 1 0 001.414 1.414L8.586 12l2.707 2.707a1 1 0 001.414-1.414L10 10.414l1.293-1.293a1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 