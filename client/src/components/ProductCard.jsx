


import { useProducts } from "../context/ProductProvider";
import { useNavigate } from "react-router-dom";

import "../components/css/productscss.css";


function ProductCard({ product }) {


  const { deleteProduct, toggleProductDone } = useProducts();
  const navigate = useNavigate();

  let doneClass = product.stock >= 1 ? 'available' : 'out-of-stock';

  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar el producto?");
    if (confirmDelete) {
      await deleteProduct(product.id);
    }
  };

  return (
    <div className="product-cardd">
      <div className="product-image-container">
        <img src={product.thumbnail} alt="Thumbnail" className="product-imagee" />
      </div>
      <div className="product-details">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-descriptionn">{product.description}</p>
        <p className="product-price">Precio: {product.price}</p>
      </div>
      <div className={`stock-status ${doneClass}`}>
        Stock: {product.stock >= 1 ? 'Disponible' : 'Agotado'}
      </div>
      <div className="action-buttons">
        <button className="delete-button" onClick={handleDelete}>Borrar</button>
        <button className="edit-button" onClick={() => navigate(`/productos/edit/${product.id}`)}>Editar</button>
      </div>
    </div>
  );
}

export default ProductCard;
