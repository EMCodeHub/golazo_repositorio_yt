import { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import { useProducts } from "../context/ProductProvider";
import { useParams, useNavigate } from "react-router-dom";
import '../components/css/ProductForm.css';



function ProductForm() {


const { createProduct, getProduct, updateProduct } = useProducts();



const [product, setProduct] = useState({


 

title: "",
description: "",
price: "",
preciogama1: "",
preciogama2: "",
preciogama3: "",
preciogama4: "",
stock: "",
brand: "",
category: "",
thumbnail: "",
imagen1: "",
imagen2: "",
masvendido: "",
imagenhome: "",
descriptionhome: "",
visiblehome: "",
pospulg1: "",
pospulg2: "",
poscolor1: "",
poscolor2: "",
poscolor3: "",
poscolor4: "",
posmem1: "",
posmem2: "",
posmem3: "",
posmem4: "",
posproces1: "",
posproces2: "",
posram1: "",
posram2: "",
posram3: "",
posram4: "",





  });




  const params = useParams();


  const navigate = useNavigate();


  useEffect(() => {

    const loadProduct = async () => {


      if (params.id) {


        const productData = await getProduct(params.id);

        console.log('este es el product data');
        console.log(productData);

        setProduct({
          ...productData,


  

        });
      }
    };
    loadProduct();
  }, [params.id]);



  const handleStockChange = (event) => {

    const newStock = parseInt(event.target.value);



    if (!isNaN(newStock) && newStock >= 0) {

      setProduct((prevProduct) => ({

        ...prevProduct,
        stock: newStock.toString(),

      }));

    } else {
      // Si el valor ingresado no es válido, no actualizamos el estado
      // Aquí puedes mostrar un mensaje de error o tomar alguna otra acción si lo deseas
    }
  };




  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };



  return (


    <div className="checkout-form-container">

      <Formik



        initialValues={product}
        enableReinitialize={true}



        onSubmit={async (values, actions) => {

          console.log(values);
          if (params.id) {

            await updateProduct(params.id, values);

          } else {

            await createProduct(values);

          }
          navigate("/productos");




          setProduct({

        
    title: "",
    description: "",
    price: "",
    preciogama1: "",
    preciogama2: "",
    preciogama3: "",
    preciogama4: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
    imagen1: "",
    imagen2: "",
    masvendido: "",
    imagenhome: "",
    descriptionhome: "",
    visiblehome: "",
    pospulg1: "",
    pospulg2: "",
    poscolor1: "",
    poscolor2: "",
    poscolor3: "",
    poscolor4: "",
    posmem1: "",
    posmem2: "",
    posmem3: "",
    posmem4: "",
    posproces1: "",
    posproces2: "",
    posram1: "",
    posram2: "",
    posram3: "",
    posram4: "",
   
    
            
          

          });
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="form"
          >
            <h1 className="text-xl font-bold uppercase text-center" style={{marginBottom:'80px'}}>
              {params.id ? "Editar Producto" : "Nuevo Producto"}
            </h1>


            <label className="block">Nombre Producto</label>
            <input
              type="text"
              name="title"
              placeholder="Write a title"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.title}
             
            />
            
            <label className="block">Descripción producto</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Write a description"
              onChange={handleInputChange}
              className="px-2 py-1 rounded-sm w-full"
              value={product.description}
              
            ></textarea>
            



            <label className="block">Precio estandar web (numero decimal)</label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.price}
            
            />


            
            
            <label className="block">Precio gama 1 (numero decimal)</label>
            <input
              type="number"
              name="preciogama1"
              placeholder="preciogama1"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.preciogama1}
            
            />




            
            
            <label className="block">Precio gama 2 (numero decimal)</label>
            <input
              type="number"
              name="preciogama2"
              placeholder="preciogama2"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.preciogama2}
            
            />




            
            
            <label className="block">Precio gama 3 (numero decimal)</label>
            <input
              type="number"
              name="preciogama3"
              placeholder="preciogama3"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.preciogama3}
            
            />




            
            
            <label className="block">Precio gama 4 (numero decimal)</label>
            <input
              type="number"
              name="preciogama4"
              placeholder="preciogama4"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.preciogama4}
            
            />












            
            <label className="block">Marca</label>
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.brand}
             
            />
            
            <label className="block">Categoría</label>
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.category}
             
            />
            
            <label className="block">Stock</label>
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleStockChange}
              value={product.stock}
             
            />
            
            <label className="block">Miniatura o imagen principal</label>
            <input
              type="text"
              name="thumbnail"
              placeholder="Thumbnail"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.thumbnail}
             
            />
            
            <label className="block">Imagen 1 (siguiente imagen )</label>
            <input
              type="text"
              name="imagen1"
              placeholder="Imagen 1"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.imagen1}
              
            />
            
            <label className="block">Imagen 2 (siguiente imagen )</label>
            <input
              type="text"
              name="imagen2"
              placeholder="Imagen 2"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.imagen2}
           
            />
            
            <label className="block">¿Aparecerá en  el carousel del home?  si:1  no: 0 </label>
            <input
              type="text"
              name="masvendido"
              placeholder="Mas Vendido"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.masvendido}
            
            />
            
            <label className="block">Imagen Home (slider, imagen grande del home) </label>
            <input
              type="text"
              name="imagenhome"
              placeholder="imagenhome"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.imagenhome}
             
            />
            
            <label className="block">Descripción para el Home, (en caso de que el producto esté en el home)</label>
            <textarea
              name="descriptionhome"
              rows="3"
              placeholder="Write a description for the Home Page"
              onChange={handleInputChange}
              className="px-2 py-1 rounded-sm w-full"
              value={product.descriptionhome}
            
            ></textarea>
            
            <label className="block">Visible en Home (slider home, imagen grande) si:1  no: 0 </label>
            <input
              type="text"
              name="visiblehome"
              placeholder="Visible en Home"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.visiblehome}
              
            />
            
            <label className="block">Posibilidad de Pulgadas 1 (valor absoluto en pulgadas)</label>
            <input
              type="text"
              name="pospulg1"
              placeholder="Posibilidad de Pulgadas 1"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.pospulg1}
            
            />
            
            <label className="block">Posibilidad de Pulgadas 2 (valor absoluto en pulgadas)</label>
            <input
              type="text"
              name="pospulg2"
              placeholder="Posibilidad de Pulgadas 2"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.pospulg2}
             
            />
            
            <label className="block">Posibilidad de Color 1</label>
            <input
              type="text"
              name="poscolor1"
              placeholder="blanco, negro, gris, rojo, azul, verde, amarillo, naranja, morado, rosa, marrón, turquesa, beige, cian, magenta, verde lima, azul marino, verde oliva, aguamarina, violeta"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.poscolor1}
              
            />
            
            <label className="block">Posibilidad de Color 2</label>
            <input
              type="text"
              name="poscolor2"
              placeholder="blanco, negro, gris, rojo, azul, verde, amarillo, naranja, morado, rosa, marrón, turquesa, beige, cian, magenta, verde lima, azul marino, verde oliva, aguamarina, violeta"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.poscolor2}
              
            />
            
            <label className="block">Posibilidad de Color 3</label>
            <input
              type="text"
              name="poscolor3"
              placeholder="blanco, negro, gris, rojo, azul, verde, amarillo, naranja, morado, rosa, marrón, turquesa, beige, cian, magenta, verde lima, azul marino, verde oliva, aguamarina, violeta"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.poscolor3}
              
            />
            
            <label className="block">Posibilidad de Color 4</label>
            <input
              type="text"
              name="poscolor4"
              placeholder="blanco, negro, gris, rojo, azul, verde, amarillo, naranja, morado, rosa, marrón, turquesa, beige, cian, magenta, verde lima, azul marino, verde oliva, aguamarina, violeta"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.poscolor4}
              
            />
            
            <label className="block">Posibilidad de Memoria 1 (valor en GB absoluto)</label>
            <input
              type="text"
              name="posmem1"
              placeholder="Posibilidad de Memoria 1"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.posmem1}
             
            />
            
            <label className="block">Posibilidad de Memoria 2  (valor en GB absoluto)</label>
            <input
              type="text"
              name="posmem2"
              placeholder="Posibilidad de Memoria 2"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.posmem2}
             
            />
            
            <label className="block">Posibilidad de Memoria 3  (valor en GB absoluto)</label>
            <input
              type="text"
              name="posmem3"
              placeholder="Posibilidad de Memoria 3"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.posmem3}
             
            />
            
            <label className="block">Posibilidad de Memoria 4  (valor en GB absoluto)</label>
            <input
              type="text"
              name="posmem4"
              placeholder="Posibilidad de Memoria 4"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.posmem4}
              
            />
            
            <label className="block">Posibilidad de Procesador 1  (core i8,core i9, AMD... )</label>
            <input
              type="text"
              name="posproces1"
              placeholder="Posibilidad de Procesador 1"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.posproces1}
              
            />
            
            <label className="block">Posibilidad de Procesador 2 (core i8,core i9, AMD... )</label>
            <input
              type="text"
              name="posproces2"
              placeholder="Posibilidad de Procesador 2"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.posproces2}
             
            />
            
            <label className="block">Posibilidad de RAM 1 (valor en GB absoluto)</label>
            <input
              type="text"
              name="posram1"
              placeholder="Posibilidad de RAM 1"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.posram1}
              
            />
            
            <label className="block">Posibilidad de RAM 2 (valor en GB absoluto)</label>
            <input
              type="text"
              name="posram2"
              placeholder="Posibilidad de RAM 2"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.posram2}
             
            />
            
            <label className="block">Posibilidad de RAM 3  (valor en GB absoluto)</label>
            <input
              type="text"
              name="posram3"
              placeholder="Posibilidad de RAM 3"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.posram3}
             
            />
            
            <label className="block">Posibilidad de RAM 4 (valor en GB absoluto)</label>
            <input
              type="text"
              name="posram4"
              placeholder="Posibilidad de RAM 4"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleInputChange}
              value={product.posram4}
             
            />
            


            <label className="block">Fecha de creación del producto (automático)</label>

            <div style={{height:'60px', color:'black'}}>

                     {product.createAt}
             
                     </div>
            


            <button
              type="submit"
              disabled={isSubmitting}
              className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProductForm;



