//Mediante este servicio vamos a obtener los productos filtrados por la busqueda (search)

export const searchProducts = async ({ search }) => {

  try {
    if (search === '') return null;

    
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const response = await fetch(`${baseURL}/api/search?search=${search}`);

    const json = await response.json();

     const { products, message } = json;


//a continuación estamos creandole un nuevo nombre a las propiedades que vienen de la api 
// estamos "bautizando" de forma personalizada a estas propiedades


    return products?.map(product => ({

      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      preciogama1: product.preciogama1,
      preciogama2: product.preciogama2,
      preciogama3: product.preciogama3,
      preciogama4: product.preciogama4,
      thumbnail: product.thumbnail,
      rating: product.rating,
      stock:product.stock,
      category: product.category,
      poscolor1 : product.poscolor1,
      poscolor2 : product.poscolor2,
      poscolor3 : product.poscolor3,
      poscolor4 : product.poscolor4,
      pospulg1 : product.pospulg1,
      pospulg2 : product.pospulg2,
      posmem1 : product.posmem1,
      posmem2 : product.posmem2, 
      posmem3 : product.posmem3,
      posmem4 : product.posmem4,
      posram1 : product.posram1,
      posram2 : product.posram2, 
      posram3 : product.posram3,
      posram4 : product.posram4,   
      posproces1 : product.posproces1,
      posproces2 : product.posproces2,


    }));
  } catch (e) {
    throw new Error('Error searching products');
  }
};


export const recibeMessage = async ({ search }) => {
  try {
    if (search === '') return null;


    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(`${baseURL}/api/search?search=${search}`);
    const json = await response.json();

     const { products, message } = json;

    console.log("Mensaje del servidor:", message);
 

    return message
 
  }catch (e) {
    throw new Error('Error searching products');
  }

};
