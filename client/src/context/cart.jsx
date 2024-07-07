import { createContext, useReducer } from 'react';
import { cartReducer, cartInitialState } from '../reducers/cart.js';
import { CART_ACTION_TYPES } from '../reducers/cart.js'; // Importa los tipos de acción


export const CartContext = createContext();


function useCartReducer() {


  const [state, dispatch] = useReducer(cartReducer, cartInitialState);



  const addToCart = product => dispatch({
    type: CART_ACTION_TYPES.ADD_TO_CART,
    payload: product
  });

  const restToCart = product => dispatch({
    type: CART_ACTION_TYPES.REST_TO_CART,
    payload: product
  });

  const removeFromCart = product => dispatch({
    type: CART_ACTION_TYPES.REMOVE_FROM_CART,
    payload: product
  });

  const clearCart = () => dispatch({ type: CART_ACTION_TYPES.CLEAR_CART });



  const changeColor = (id, color) => dispatch({
    type: CART_ACTION_TYPES.CHANGE_COLOR,
    payload: { id, color } 
  });


  const changePulgadas = (id, pulgadas) => dispatch({
    type: CART_ACTION_TYPES.CHANGE_PULGADAS,
    payload: { id, pulgadas } 
  });


  const changeMemory = (id, memoria) => dispatch({
    type: CART_ACTION_TYPES.CHANGE_MEMORY,
    payload: { id, memoria } 
  });


  
  const changeRam = (id, ram) => dispatch({
    type: CART_ACTION_TYPES.CHANGE_RAM,
    payload: { id, ram } 
  });



  const changeProces = (id, procesador) => dispatch({
    type: CART_ACTION_TYPES.CHANGE_PROCES,
    payload: { id, procesador } 
  });



  const changePrice = (id, price) => dispatch({
    type: CART_ACTION_TYPES.CHANGE_PRICE,
    payload: { id, price } 
  });



  return { state, addToCart, removeFromCart, clearCart, restToCart, changeColor, changePulgadas, changeMemory, changeRam, changeProces, changePrice};
}

export function CartProvider({ children }) {
  const { state, addToCart, removeFromCart, clearCart, restToCart, changeColor, changePulgadas, changeMemory, changeRam, changeProces, changePrice } = useCartReducer();

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      clearCart,
      restToCart,
      changeColor,
      changePulgadas,
      changeMemory,
      changeRam,
      changeProces,
      changePrice
    }}>
      {children}
    </CartContext.Provider>
  );
}
