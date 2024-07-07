import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Carrito from "./pages/Carrito";
import Shop from "./pages/Shop";
import RastreoPedido from "./pages/RastreoPedido";
import { CartProvider } from "./context/cart";
import { FiltersProvider } from "./context/filters";
import { UserProvider } from "./UserProvider/UserContext";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import { ProductContextProvider } from "./context/ProductProvider";
import ProductsPage from "./pages/ProductsPage";
import DescriptionShop from "./pages/DescriptionShop";
import DescriptionHome from "./pages/DescriptionHome";
import ProductFormPage from "./pages/ProductFormPage";
import Legal from "./pages/Legal";
import SobreNosotros from "./pages/SobreNosotros";
import Contacto from "./pages/Contacto";
import Recordatorio from "./pages/Recordatorio";
import Mantenimiento from "./pages/Mantenimiento";
import MostrarConsultasPage from "./pages/MostrarConsultasPage";
import { ValidacionProvider } from "./context/ValidacionContext";
import ShowPedidosPage from "./pages/ShowPedidosPage";
import EditConsultasPage from "./pages/EditConsultasPage";
import EditPedidosPage from "./pages/EditPedidosPage";
import ShowUsuarioyPedidosPage from "./pages/ShowUsuarioyPedidosPage";

// Nos traemos 4 svg para los iconos del navbar

import { Basketshop, Usericon, TiendaIcon } from "./components/svgNavbar";



// Array de objetos. Le pasamos un array de objetos a nuestro componente Navbar


const navArrayLinks = [
  {
    title: "Tienda",
    path: "/shop",
    icon: <TiendaIcon />,
  },
  {
    title: "Login",
    path: "/login",
    icon: <Usericon />,
  },
  {
    title: "Carrito",
    path: "/carrito",
    icon: <Basketshop />,
  },
];



// A continuación tenemos Rutas, Rutras protegidas, y Providers.

// Tenemos una Validacion provider que nos valida que usuario está utilizando la aplicacion, (cliente o admin)

// Tenemos FiltersProvider , que nos filtra las busquedas de productos.

//Cart provider, que nos permite utilizar varias funciones   cart: state,  addToCart,  removeFromCart, clearCart, restToCart



function App() {


  return (
    <>
      <div>
        <ValidacionProvider>
          <UserProvider>
            <FiltersProvider>
              <CartProvider>
                <Router>
                  <Navbar navArrayLinks={navArrayLinks} />

                  <div>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/legal" element={<Legal />} />
                      <Route
                        path="/sobrenosotros"
                        element={<SobreNosotros />}
                      />
                      <Route path="/contacto" element={<Contacto />} />
                      <Route path="/recordatorio" element={<Recordatorio />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/carrito" element={<Carrito />} />
                      <Route path="/shop" element={<Shop />} />

                      <Route path="/rastrear" element={<RastreoPedido />} />

                      <Route
                        path="/descriptionhome/:idproduct"
                        element={<DescriptionHome />}
                      />

                      <Route
                        path="/description/:idproduct"
                        element={<DescriptionShop />}
                      />
                    </Routes>

                    {/*tenemos un productprovider, que nos va a permitir utilizar un conjunto de metodos   getProductsRequest,
                    deleteProductRequest, createProductRequest, getProductRequest, updateProductRequest, toggleProductDoneRequest...*/}

                    {/*además aqui comienzan las protected Routes, son rutas que solo se puede acceder si existen permisos, sesiones, tokens, 
                     etc.  Estas rutas estan protegidas en el sevidor mediante middleware, y mediante protected routes en react*/}

                    <ProductContextProvider>
                      <Routes>
                        <Route
                          path="/mantenimiento"
                          element={
                            <ProtectedRoute
                              element={<Mantenimiento />}
                              redirectTo="/"
                            />
                          }
                        />
                        <Route
                          path="/productos"
                          element={
                            <ProtectedRoute
                              element={<ProductsPage />}
                              redirectTo="/"
                            />
                          }
                        />
                        <Route
                          path="/pedidos"
                          element={
                            <ProtectedRoute
                              element={<ShowPedidosPage />}
                              redirectTo="/"
                            />
                          }
                        />
                        <Route
                          path="/usuarios"
                          element={
                            <ProtectedRoute
                              element={<ShowUsuarioyPedidosPage />}
                              redirectTo="/"
                            />
                          }
                        />
                        <Route
                          path="/consultas"
                          element={
                            <ProtectedRoute
                              element={<MostrarConsultasPage />}
                              redirectTo="/"
                            />
                          }
                        />
                        <Route
                          path="/consultas/:id"
                          element={
                            <ProtectedRoute
                              element={<EditConsultasPage />}
                              redirectTo="/"
                            />
                          }
                        />
                        <Route
                          path="/pedidos/:id"
                          element={
                            <ProtectedRoute
                              element={<EditPedidosPage />}
                              redirectTo="/"
                            />
                          }
                        />
                        <Route
                          path="/productos/new"
                          element={
                            <ProtectedRoute
                              element={<ProductFormPage />}
                              redirectTo="/"
                            />
                          }
                        />
                        <Route
                          path="/productos/edit/:id"
                          element={
                            <ProtectedRoute
                              element={<ProductFormPage />}
                              redirectTo="/"
                            />
                          }
                        />
                      </Routes>
                    </ProductContextProvider>
                  </div>
                </Router>
              </CartProvider>
            </FiltersProvider>
          </UserProvider>
        </ValidacionProvider>
      </div>
    </>
  );
}

export default App;
