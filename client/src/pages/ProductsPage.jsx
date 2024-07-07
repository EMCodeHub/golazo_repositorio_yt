import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductProvider";
import "../components/css/productscss.css";
import Navbar from "../components/Navbar";



function ProductsPage() {


  const { products, loadProducts } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    loadProducts();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startSlice = (currentPage - 1) * itemsPerPage;
  const endSlice = startSlice + itemsPerPage;

  function renderMain() {
    if (products.length === 0) return <h1>No hay productos todavía</h1>;
    return products.slice(startSlice, endSlice).map((product) => (
      <ProductCard product={product} key={product.id} />
    ));
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (

    <div>


      <Navbar />

      <div className="productos" style= {{marginTop:'100px'}}>



      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '30px',
        marginBottom: '50px'
      }}>
        <div className="proo">{renderMain()}</div>

      </div>

      </div>
      {products.length > itemsPerPage && (
        <div className="paginacion">
          <div
            style={{
              width: "100%",
              backgroundColor: "rgb(177 178 193)",
              padding: "10px 0",
              zIndex: "100",
              minHeight: "60px",
              boxShadow: "0px -2px 5px rgb(0 0 0 / 50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10pc",
            }}
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                style={{
                  background:
                    "linear-gradient(135deg, #ff9d6c, #bb4d9a)",
                  color: "white",
                  padding: "8px 15px",
                  margin: "0 5px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  outline: "none",
                  transition: "background-color 0.3s",
                  minWidth: "40px",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
