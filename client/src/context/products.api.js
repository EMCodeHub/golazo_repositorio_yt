import axios from "axios";



const baseURL = import.meta.env.VITE_API_BASE_URL;


const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token'); // Asumiendo que has guardado el token como 'token' en localStorage
};


export const getProductscrudRequest = async () => {
  const token = getTokenFromLocalStorage();
  return await axios.get(`${baseURL}/productscrud`, {
    headers: {
      authorization: token // Pasar el token en el encabezado
    }
  });
};

export const createProductcrudRequest = async (task) => {
  const token = getTokenFromLocalStorage();
  return await axios.post(`${baseURL}/productscrud`, task, {
    headers: {
      authorization: token // Pasar el token en el encabezado
    }
  });
};

export const deleteProductcrudRequest = async (id) => {
  const token = getTokenFromLocalStorage();
  return await axios.delete(`${baseURL}/productscrud/${id}`, {
    headers: {
      authorization: token // Pasar el token en el encabezado
    }
  });
};

export const getProductcrudRequest = async (id) => { // Corregido el nombre de la función
  const token = getTokenFromLocalStorage();
  return await axios.get(`${baseURL}/productscrud/${id}`, {
    headers: {
      authorization: token // Pasar el token en el encabezado
    }
  });
};

export const updateProductcrudRequest = async (id, newFields) => {
  const token = getTokenFromLocalStorage();
  return await axios.put(`${baseURL}/productscrud/${id}`, newFields, {
    headers: {
      authorization: token // Pasar el token en el encabezado
    }
  });
};



