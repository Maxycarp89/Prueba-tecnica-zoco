import axios from "axios";

// Configuración base de axios
const api = axios.create({
  baseURL: "/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir el token a las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Función auxiliar para obtener datos del sessionStorage
const getStoredData = (key, defaultValue = []) => {
  try {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error al obtener datos de ${key}:`, error);
    return defaultValue;
  }
};

// Función auxiliar para guardar datos en sessionStorage
const storeData = (key, data) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error al guardar datos en ${key}:`, error);
  }
};

// Servicios de autenticación
export const authService = {
  
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Credenciales de prueba
        if (email === "admin@example.com" && password === "admin123") {
          const userData = {
            id: 1,
            name: "Administrador",
            email: "admin@example.com",
            role: "admin",
          };
          const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
          
          
          const storedUsers = getStoredData('users', []);
          if (!storedUsers.some(u => u.id === userData.id)) {
            storeData('users', [userData, ...storedUsers]);
          }
          
          resolve({ user: userData, token });
        } else if (email === "user@example.com" && password === "user123") {
          const userData = {
            id: 2,
            name: "Usuario Normal",
            email: "user@example.com",
            role: "user",
          };
          const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.7Tq_95jnMP8hD0jkJUbYMlJsPCIVapvH9PVjMGfmfB8";
          
          
          const storedUsers = getStoredData('users', []);
          if (!storedUsers.some(u => u.id === userData.id)) {
            storeData('users', [userData, ...storedUsers]);
          }
          
          resolve({ user: userData, token });
        } else {
          reject({ message: "Credenciales inválidas" });
        }
      }, 500);
    });
  },
};

// Servicios de usuarios
export const userService = {
  
  getUsers: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let users = getStoredData('users', []);
        if (users.length === 0) {
          users = [
            {
              id: 1,
              name: "Administrador",
              email: "admin@example.com",
              role: "admin",
            },
            {
              id: 2,
              name: "Usuario Normal",
              email: "user@example.com",
              role: "user",
            },
            { 
              id: 3, 
              name: "Ana García", 
              email: "ana@example.com", 
              role: "user",
              studies: [
                { id: 1, title: "Ingeniería Informática", institution: "Universidad de Madrid", year: 2020 }
              ],
              addresses: [
                { id: 1, street: "Calle Mayor 123", city: "Madrid", postalCode: "28001", country: "España" }
              ]
            },
            {
              id: 4,
              name: "Carlos Pérez",
              email: "carlos@example.com",
              role: "user",
              studies: [
                { id: 2, title: "Marketing Digital", institution: "Universidad de Barcelona", year: 2019 }
              ]
            },
            {
              id: 5,
              name: "Laura Martínez",
              email: "laura@example.com",
              role: "user",
              addresses: [
                { id: 2, street: "Avenida Libertad 45", city: "Valencia", postalCode: "46001", country: "España" }
              ]
            },
            {
              id: 6,
              name: "Miguel Rodríguez",
              email: "miguel@example.com",
              role: "user",
              studies: [
                { id: 3, title: "Máster en Data Science", institution: "Universidad de Sevilla", year: 2021 }
              ]
            },
            {
              id: 7,
              name: "Elena Sánchez",
              email: "elena@example.com",
              role: "user",
              addresses: [
                { id: 3, street: "Plaza Mayor 7", city: "Salamanca", postalCode: "37001", country: "España" }
              ]
            },
            {
              id: 8,
              name: "David López",
              email: "david@example.com",
              role: "user",
              studies: [
                { id: 4, title: "Desarrollo Web Full Stack", institution: "Bootcamp Tech", year: 2022 }
              ]
            },
            {
              id: 9,
              name: "Isabel Torres",
              email: "isabel@example.com",
              role: "user",
              addresses: [
                { id: 4, street: "Calle del Sol 89", city: "Málaga", postalCode: "29001", country: "España" }
              ]
            },
            {
              id: 10,
              name: "Pablo Ruiz",
              email: "pablo@example.com",
              role: "user",
              studies: [
                { id: 5, title: "Diseño UX/UI", institution: "Escuela de Diseño", year: 2021 }
              ]
            }
          ];
          storeData('users', users);
          
          // Inicializar estudios y direcciones para cada usuario
          users.forEach(user => {
            if (user.studies) {
              storeData(`studies_${user.id}`, user.studies);
              delete user.studies;
            }
            if (user.addresses) {
              storeData(`addresses_${user.id}`, user.addresses);
              delete user.addresses;
            }
          });
        }
        resolve(users);
      }, 300);
    });
  },

  // Obtener un usuario por ID
  getUserById: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getStoredData('users', []);
        const user = users.find((u) => u.id === userId);
        resolve(user || null);
      }, 300);
    });
  },

  // Crear un nuevo usuario
  createUser: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getStoredData('users', []);
        const newUser = {
          id: Math.floor(Math.random() * 1000) + 10,
          ...userData,
        };
        const updatedUsers = [...users, newUser];
        storeData('users', updatedUsers);
        resolve(newUser);
      }, 300);
    });
  },

  // Actualizar un usuario existente
  updateUser: async (userId, userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getStoredData('users', []);
        const updatedUsers = users.map(user => 
          user.id === userId ? { ...user, ...userData, id: userId } : user
        );
        storeData('users', updatedUsers);
        const updatedUser = updatedUsers.find(u => u.id === userId);
        resolve(updatedUser);
      }, 300);
    });
  },

  // Eliminar un usuario
  deleteUser: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getStoredData('users', []);
        const updatedUsers = users.filter(user => user.id !== userId);
        storeData('users', updatedUsers);
        resolve({ success: true, id: userId });
      }, 300);
    });
  },
};

// Servicios para datos relacionados
export const relatedDataService = {
  // Obtener estudios de un usuario
  getStudies: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const studies = getStoredData(`studies_${userId}`, []);
        resolve(studies);
      }, 300);
    });
  },

  // Crear un nuevo estudio
  createStudy: async (userId, studyData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const studies = getStoredData(`studies_${userId}`, []);
        const newStudy = {
          id: Math.floor(Math.random() * 1000) + 100,
          ...studyData,
        };
        const updatedStudies = [...studies, newStudy];
        storeData(`studies_${userId}`, updatedStudies);
        resolve(newStudy);
      }, 300);
    });
  },

  // Editar un estudio
  editStudy: async (userId, studyId, studyData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const studies = getStoredData(`studies_${userId}`, []);
        const updatedStudies = studies.map(study =>
          study.id === studyId ? { ...study, ...studyData } : study
        );
        storeData(`studies_${userId}`, updatedStudies);
        const updatedStudy = updatedStudies.find(s => s.id === studyId);
        resolve(updatedStudy);
      }, 300);
    });
  },

  // Eliminar un estudio
  deleteStudy: async (userId, studyId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const studies = getStoredData(`studies_${userId}`, []);
        const updatedStudies = studies.filter(study => study.id !== studyId);
        storeData(`studies_${userId}`, updatedStudies);
        resolve({ success: true, id: studyId });
      }, 300);
    });
  },

  // Obtener direcciones de un usuario
  getAddresses: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const addresses = getStoredData(`addresses_${userId}`, []);
        resolve(addresses);
      }, 300);
    });
  },

  // Crear una nueva dirección
  createAddress: async (userId, addressData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const addresses = getStoredData(`addresses_${userId}`, []);
        const newAddress = {
          id: Math.floor(Math.random() * 1000) + 100,
          ...addressData,
        };
        const updatedAddresses = [...addresses, newAddress];
        storeData(`addresses_${userId}`, updatedAddresses);
        resolve(newAddress);
      }, 300);
    });
  },

  // Editar una dirección
  editAddress: async (userId, addressId, addressData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const addresses = getStoredData(`addresses_${userId}`, []);
        const updatedAddresses = addresses.map(address =>
          address.id === addressId ? { ...address, ...addressData } : address
        );
        storeData(`addresses_${userId}`, updatedAddresses);
        const updatedAddress = updatedAddresses.find(a => a.id === addressId);
        resolve(updatedAddress);
      }, 300);
    });
  },

  // Eliminar una dirección
  deleteAddress: async (userId, addressId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const addresses = getStoredData(`addresses_${userId}`, []);
        const updatedAddresses = addresses.filter(address => address.id !== addressId);
        storeData(`addresses_${userId}`, updatedAddresses);
        resolve({ success: true, id: addressId });
      }, 300);
    });
  },
};

export default api;
