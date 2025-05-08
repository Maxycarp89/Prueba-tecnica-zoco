import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { relatedDataService, userService } from '../../services/api';

const DashboardPage = () => {
  const { user } = useAuth();
  const [studies, setStudies] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedStudies = await relatedDataService.getStudies(user.id);
        const fetchedAddresses = await relatedDataService.getAddresses(user.id);
        setStudies(fetchedStudies);
        setAddresses(fetchedAddresses);
        
        if (user.role === 'admin') {
          const fetchedUsers = await userService.getUsers();
          setUsers(fetchedUsers);
        }
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [user.id, user.role]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">Bienvenido, {user.name}. Tienes acceso de {user.role === 'admin' ? 'administrador' : 'usuario'}.</p>
      </div>
      
      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {user.role === 'admin' && (
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600">Usuarios</p>
                <p className="text-xl md:text-3xl font-bold">{users.length}</p>
                <p className="text-xs md:text-sm text-gray-500">Usuarios registrados</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Estudios</p>
              <p className="text-xl md:text-3xl font-bold">{studies.length}</p>
              <p className="text-xs md:text-sm text-gray-500">Total registrados</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Direcciones</p>
              <p className="text-xl md:text-3xl font-bold">{addresses.length}</p>
              <p className="text-xs md:text-sm text-gray-500">Total registradas</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Información del sistema */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6 mt-6 md:mt-8">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Información del Sistema</h2>
        <p className="text-xs md:text-sm text-gray-600 mb-4">Resumen de la aplicación y sus funcionalidades</p>
        
        <div className="space-y-3 text-sm md:text-base text-gray-700">
          <p>Esta aplicación permite gestionar usuarios y sus datos relacionados como estudios y direcciones.</p>
          
          <p>Como {user.role === 'admin' ? 'administrador' : 'usuario'}, puedes gestionar {user.role === 'admin' ? 'todos los usuarios y sus' : 'tus'} datos relacionados.</p>
          
          <p className="text-sm">Utiliza el menú para navegar entre las diferentes secciones.</p>
        </div>
      </div>
      
      {/* Accesos rápidos */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <a href="/profile" className="bg-white p-4 rounded-lg shadow text-center hover:bg-gray-50 transition-colors">
          <div className="mx-auto w-10 h-10 mb-2 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-xs md:text-sm font-medium">Mi Perfil</p>
        </a>
        
        <a href="/studies" className="bg-white p-4 rounded-lg shadow text-center hover:bg-gray-50 transition-colors">
          <div className="mx-auto w-10 h-10 mb-2 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
            </svg>
          </div>
          <p className="text-xs md:text-sm font-medium">Estudios</p>
        </a>
        
        <a href="/addresses" className="bg-white p-4 rounded-lg shadow text-center hover:bg-gray-50 transition-colors">
          <div className="mx-auto w-10 h-10 mb-2 flex items-center justify-center rounded-full bg-green-100 text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-xs md:text-sm font-medium">Direcciones</p>
        </a>
        
        {user.role === 'admin' && (
          <a href="/users" className="bg-white p-4 rounded-lg shadow text-center hover:bg-gray-50 transition-colors">
            <div className="mx-auto w-10 h-10 mb-2 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <p className="text-xs md:text-sm font-medium">Usuarios</p>
          </a>
        )}
      </div>
    </div>
  );
};

export default DashboardPage; 