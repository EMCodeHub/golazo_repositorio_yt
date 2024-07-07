import { useEffect, useState } from 'react';
import { Products } from './Products.jsx';
import { useFilters } from '../hooks/useFilters.js';


function ShopApp() {


  const [initialProducts, setInitialProducts] = useState([]);
  const { filterProducts } = useFilters();

  

  useEffect(() => {
    
    async function fetchProducts() {

      try {
        // Realizar la petición GET al servidor

        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${baseURL}/api/products`);
        // Verificar si la respuesta es exitosa
        if (response.ok) {
          // Obtener los datos en formato JSON
          const data = await response.json();
          // Verificar si la respuesta contiene la clave "products"
          if (data.hasOwnProperty('products') && Array.isArray(data.products)) {
            // Almacenar los productos en el estado
            setInitialProducts(data.products);
          } else {
            console.error('La respuesta del servidor no contiene productos válidos:', data);
          }
        } else {
          console.error('Error al obtener los productos:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    }

    // Llamar a la función para obtener los productos al cargar el componente
    fetchProducts();
  }, []);

  const filteredProducts = filterProducts(initialProducts);

  return (
    <>
      <Products products={filteredProducts} />

    </>
  );
}

export default ShopApp;
