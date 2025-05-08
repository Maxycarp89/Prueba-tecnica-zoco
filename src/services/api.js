import axios from "axios";

// Configuración base de axios
const api = axios.create({
  baseURL: "/api", // URL base simulada
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

// Servicios de autenticación
export const authService = {
  // Iniciar sesión (simulado)
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Credenciales de prueba
        if (email === "admin@example.com" && password === "admin123") {
          resolve({
            user: {
              id: 1,
              name: "Administrador",
              email: "admin@example.com",
              role: "admin",
            },
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
          });
        } else if (email === "user@example.com" && password === "user123") {
          resolve({
            user: {
              id: 2,
              name: "Usuario Normal",
              email: "user@example.com",
              role: "user",
            },
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.7Tq_95jnMP8hD0jkJUbYMlJsPCIVapvH9PVjMGfmfB8",
          });
        } else {
          reject({ message: "Credenciales inválidas" });
        }
      }, 500);
    });
  },
};

// Servicios de usuarios
export const userService = {
  // Obtener lista de usuarios (solo para admin)
  getUsers: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
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
          { id: 3, name: "Ana García", email: "ana@example.com", role: "user" },
          {
            id: 4,
            name: "Carlos Pérez",
            email: "carlos@example.com",
            role: "user",
          },
          {
            id: 5,
            name: "Laura Martínez",
            email: "laura@example.com",
            role: "user",
          },
        ]);
      }, 300);
    });
  },

  // Obtener un usuario por ID
  getUserById: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = [
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
          { id: 3, name: "Ana García", email: "ana@example.com", role: "user" },
          {
            id: 4,
            name: "Carlos Pérez",
            email: "carlos@example.com",
            role: "user",
          },
          {
            id: 5,
            name: "Laura Martínez",
            email: "laura@example.com",
            role: "user",
          },
        ];
        const user = users.find((u) => u.id === userId);
        resolve(user || null);
      }, 300);
    });
  },

  // Crear un nuevo usuario (solo para admin)
  createUser: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.floor(Math.random() * 1000) + 10,
          ...userData,
        });
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
        // Datos de ejemplo
        const studiesData = {
          1: [
            // Admin
            {
              id: 1,
              title: "Ingeniería Informática",
              institution: "Universidad Complutense",
              year: 2015,
            },
            {
              id: 2,
              title: "Máster en Desarrollo Web",
              institution: "Universidad Autónoma",
              year: 2017,
            },
          ],
          2: [
            // Usuario normal
            {
              id: 3,
              title: "Diseño Gráfico",
              institution: "Escuela de Artes",
              year: 2018,
            },
          ],
          3: [
            // Ana
            {
              id: 4,
              title: "Medicina",
              institution: "Universidad de Barcelona",
              year: 2016,
            },
          ],
          4: [
            // Carlos
            { id: 5, title: "Economía", institution: "UNED", year: 2014 },
            {
              id: 6,
              title: "MBA",
              institution: "IE Business School",
              year: 2016,
            },
          ],
          5: [
            // Laura
            {
              id: 7,
              title: "Derecho",
              institution: "Universidad de Sevilla",
              year: 2019,
            },
          ],
        };

        resolve(studiesData[userId] || []);
      }, 300);
    });
  },

  // Añadir un estudio a un usuario
  addStudy: async (userId, studyData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.floor(Math.random() * 1000) + 100,
          ...studyData,
        });
      }, 300);
    });
  },

  // Editar un estudio
  editStudy: async (studyId, studyData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: studyId,
          ...studyData,
        });
      }, 300);
    });
  },

  // Obtener direcciones de un usuario
  getAddresses: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Datos de ejemplo
        const addressesData = {
          1: [
            // Admin
            {
              id: 1,
              street: "Calle Mayor 15",
              city: "Madrid",
              postalCode: "28001",
              country: "España",
            },
            {
              id: 2,
              street: "Avenida de la Paz 7",
              city: "Valencia",
              postalCode: "46002",
              country: "España",
            },
          ],
          2: [
            // Usuario normal
            {
              id: 3,
              street: "Calle Alcalá 25",
              city: "Madrid",
              postalCode: "28009",
              country: "España",
            },
          ],
          3: [
            // Ana
            {
              id: 4,
              street: "Paseo de Gracia 43",
              city: "Barcelona",
              postalCode: "08007",
              country: "España",
            },
          ],
          4: [
            // Carlos
            {
              id: 5,
              street: "Gran Vía 41",
              city: "Madrid",
              postalCode: "28013",
              country: "España",
            },
          ],
          5: [
            // Laura
            {
              id: 6,
              street: "Avenida de la Constitución 12",
              city: "Sevilla",
              postalCode: "41004",
              country: "España",
            },
          ],
        };

        resolve(addressesData[userId] || []);
      }, 300);
    });
  },

  // Añadir una dirección a un usuario
  addAddress: async (userId, addressData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.floor(Math.random() * 1000) + 100,
          ...addressData,
        });
      }, 300);
    });
  },

  // Editar una dirección
  editAddress: async (addressId, addressData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: addressId,
          ...addressData,
        });
      }, 300);
    });
  },
};

export default api;
