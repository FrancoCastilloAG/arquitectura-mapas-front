import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Usa solo la variable de entorno
  headers: {
    'Content-Type': 'application/json',
  },
});

export const saveLocation = async (locationData: {
  latitude: number;
  longitude: number;
  comment: string;
  category: string;
  user_id: string;
}) => {
  try {
    console.log('Payload enviado:', locationData); 
    const response = await api.post('/comments/add', locationData);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Error al guardar la ubicación:', error);
    const errorMessage = error.response?.data?.message || 'Error desconocido';
    return { success: false, error: errorMessage };
  }
};

export const getAllComments = async () => {
  try {
    const response = await api.get('/comments/all');
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Error al obtener los comentarios:', error);
    return { success: false, error: error.message || 'Error desconocido' };
  }
};


export const getUserComments = async (userId: string) => {
  try {
    const response = await api.get(`/comments/user`, { params: { user_id: userId } });
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Error al obtener los comentarios del usuario:', error);
    return { success: false, error: error.message || 'Error desconocido' };
  }
};


