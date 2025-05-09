import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService, relatedDataService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import Modal from '../../components/ui/Modal';
import StudyForm from '../../components/ui/StudyForm';
import AddressForm from '../../components/ui/AddressForm';

const UserDetailsPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser, isAdmin } = useAuth();
  const [user, setUser] = useState(null);
  const [studies, setStudies] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  });

  
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const userData = await userService.getUserById(Number(userId));
        if (!userData) {
          setError('Usuario no encontrado');
          return;
        }

        // Verificar permisos
        if (!isAdmin && userData.id !== currentUser.id) {
          navigate('/dashboard');
          return;
        }
        
        setUser(userData);
        setFormData({
          name: userData.name,
          email: userData.email,
          role: userData.role
        });
        
        // Cargar datos relacionados
        const [userStudies, userAddresses] = await Promise.all([
          relatedDataService.getStudies(Number(userId)),
          relatedDataService.getAddresses(Number(userId))
        ]);
        
        setStudies(userStudies);
        setAddresses(userAddresses);
      } catch (err) {
        setError('Error al cargar los datos del usuario');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId, isAdmin, currentUser.id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = await userService.updateUser(Number(userId), formData);
      setUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      setError('Error al actualizar el usuario');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Funciones para gestionar estudios
  const handleStudySubmit = async (studyData) => {
    try {
      if (selectedStudy) {
        const updatedStudy = await relatedDataService.editStudy(Number(userId), selectedStudy.id, studyData);
        setStudies(prev => prev.map(s => s.id === selectedStudy.id ? updatedStudy : s));
      } else {
        const newStudy = await relatedDataService.createStudy(Number(userId), studyData);
        setStudies(prev => [...prev, newStudy]);
      }
      setIsStudyModalOpen(false);
      setSelectedStudy(null);
    } catch (err) {
      setError('Error al gestionar el estudio');
      console.error(err);
    }
  };

  const handleDeleteStudy = async (studyId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este estudio?')) {
      return;
    }

    try {
      await relatedDataService.deleteStudy(Number(userId), studyId);
      setStudies(prev => prev.filter(s => s.id !== studyId));
    } catch (err) {
      setError('Error al eliminar el estudio');
      console.error(err);
    }
  };

  // Funciones para gestionar direcciones
  const handleAddressSubmit = async (addressData) => {
    try {
      if (selectedAddress) {
        const updatedAddress = await relatedDataService.editAddress(Number(userId), selectedAddress.id, addressData);
        setAddresses(prev => prev.map(a => a.id === selectedAddress.id ? updatedAddress : a));
      } else {
        const newAddress = await relatedDataService.createAddress(Number(userId), addressData);
        setAddresses(prev => [...prev, newAddress]);
      }
      setIsAddressModalOpen(false);
      setSelectedAddress(null);
    } catch (err) {
      setError('Error al gestionar la dirección');
      console.error(err);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta dirección?')) {
      return;
    }

    try {
      await relatedDataService.deleteAddress(Number(userId), addressId);
      setAddresses(prev => prev.filter(a => a.id !== addressId));
    } catch (err) {
      setError('Error al eliminar la dirección');
      console.error(err);
    }
  };

  if (isLoading && !isEditing) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">Usuario no encontrado</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Detalles del Usuario</h1>
        <button
          onClick={() => navigate('/users')}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Volver
        </button>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Información Personal</h2>
          <p className="text-sm text-gray-500 mt-1">Gestiona la información del usuario</p>
        </div>
        
        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              
              {isAdmin && (
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Rol
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              )}
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user.name,
                      email: user.email,
                      role: user.role
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  disabled={isLoading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">ID</h3>
                <p className="mt-1 text-sm text-gray-900">{user.id}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Nombre</h3>
                <p className="mt-1 text-sm text-gray-900">{user.name}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-sm text-gray-900">{user.email}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Rol</h3>
                <p className="mt-1 text-sm text-gray-900 capitalize">{user.role}</p>
              </div>
              
              <div className="pt-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Editar Usuario
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Sección de Estudios */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Estudios</h2>
            <p className="text-sm text-gray-500 mt-1">Gestiona los estudios del usuario</p>
          </div>
          <button
            onClick={() => {
              setSelectedStudy(null);
              setIsStudyModalOpen(true);
            }}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Agregar Estudio
          </button>
        </div>
        
        <div className="p-6">
          {studies.length === 0 ? (
            <p className="text-gray-500 text-center">No hay estudios registrados</p>
          ) : (
            <div className="space-y-4">
              {studies.map(study => (
                <div key={study.id} className="flex justify-between items-start p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{study.title}</h3>
                    <p className="text-sm text-gray-500">{study.institution}</p>
                    <p className="text-sm text-gray-500">Año: {study.year}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        setSelectedStudy(study);
                        setIsStudyModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDeleteStudy(study.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Sección de Direcciones */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Direcciones</h2>
            <p className="text-sm text-gray-500 mt-1">Gestiona las direcciones del usuario</p>
          </div>
          <button
            onClick={() => {
              setSelectedAddress(null);
              setIsAddressModalOpen(true);
            }}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Agregar Dirección
          </button>
        </div>
        
        <div className="p-6">
          {addresses.length === 0 ? (
            <p className="text-gray-500 text-center">No hay direcciones registradas</p>
          ) : (
            <div className="space-y-4">
              {addresses.map(address => (
                <div key={address.id} className="flex justify-between items-start p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{address.street}</h3>
                    <p className="text-sm text-gray-500">{address.city}, {address.postalCode}</p>
                    <p className="text-sm text-gray-500">{address.country}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        setSelectedAddress(address);
                        setIsAddressModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDeleteAddress(address.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Estudio */}
      <Modal
        isOpen={isStudyModalOpen}
        onClose={() => {
          setIsStudyModalOpen(false);
          setSelectedStudy(null);
        }}
        title={selectedStudy ? 'Editar Estudio' : 'Agregar Estudio'}
      >
        <StudyForm
          study={selectedStudy}
          onSubmit={handleStudySubmit}
          onCancel={() => {
            setIsStudyModalOpen(false);
            setSelectedStudy(null);
          }}
        />
      </Modal>

      {/* Modal de Dirección */}
      <Modal
        isOpen={isAddressModalOpen}
        onClose={() => {
          setIsAddressModalOpen(false);
          setSelectedAddress(null);
        }}
        title={selectedAddress ? 'Editar Dirección' : 'Agregar Dirección'}
      >
        <AddressForm
          address={selectedAddress}
          onSubmit={handleAddressSubmit}
          onCancel={() => {
            setIsAddressModalOpen(false);
            setSelectedAddress(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default UserDetailsPage; 