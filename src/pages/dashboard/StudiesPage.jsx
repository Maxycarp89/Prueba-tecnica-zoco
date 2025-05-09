import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { relatedDataService } from '../../services/api';
import Modal from '../../components/ui/Modal';
import StudyForm from '../../components/ui/StudyForm';

const StudiesPage = () => {
  const { user } = useAuth();
  const [studies, setStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState(null);

  useEffect(() => {
    const fetchStudies = async () => {
      setIsLoading(true);
      try {
        const data = await relatedDataService.getStudies(user.id);
        setStudies(data);
      } catch (err) {
        setError('Error al cargar los estudios');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudies();
  }, [user.id]);

  const handleStudySubmit = async (studyData) => {
    try {
      if (selectedStudy) {
        const updatedStudy = await relatedDataService.editStudy(user.id, selectedStudy.id, studyData);
        setStudies(prev => prev.map(s => s.id === selectedStudy.id ? updatedStudy : s));
      } else {
        const newStudy = await relatedDataService.createStudy(user.id, studyData);
        setStudies(prev => [...prev, newStudy]);
      }
      setIsModalOpen(false);
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
      await relatedDataService.deleteStudy(user.id, studyId);
      setStudies(prev => prev.filter(s => s.id !== studyId));
    } catch (err) {
      setError('Error al eliminar el estudio');
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Mis Estudios</h1>
        <button
          onClick={() => {
            setSelectedStudy(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Agregar Estudio
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
          <button
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setError(null)}
          >
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Cerrar</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </button>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          {studies.length === 0 ? (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="mt-4 text-gray-500">No hay estudios registrados</p>
              <button
                onClick={() => {
                  setSelectedStudy(null);
                  setIsModalOpen(true);
                }}
                className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Agregar primer estudio
              </button>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {studies.map(study => (
                <div key={study.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{study.title}</h3>
                      <p className="text-sm text-gray-500">{study.institution}</p>
                      <p className="text-sm text-gray-500">Año: {study.year}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedStudy(study);
                          setIsModalOpen(true);
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Estudio */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStudy(null);
        }}
        title={selectedStudy ? 'Editar Estudio' : 'Agregar Estudio'}
      >
        <StudyForm
          study={selectedStudy}
          onSubmit={handleStudySubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedStudy(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default StudiesPage; 