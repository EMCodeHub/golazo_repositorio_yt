export const cartInitialState =
  JSON.parse(window.localStorage.getItem("cart")) || [];

export const CART_ACTION_TYPES = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
  REST_TO_CART: "REST_TO_CART",
  CHANGE_COLOR: "CHANGE_COLOR",
  CHANGE_PULGADAS: "CHANGE_PULGADAS",
  CHANGE_MEMORY: "CHANGE_MEMORY",
  CHANGE_PROCES: "CHANGE_PROCES",
  CHANGE_RAM: "CHANGE_RAM",
  CHANGE_PRICE: "CHANGE_PRICE",
};



// update localStorage with state for cart
export const updateLocalStorage = (state) => {



  window.localStorage.setItem("cart", JSON.stringify(state));


};




const UPDATE_STATE_BY_ACTION = {


  [CART_ACTION_TYPES.CHANGE_PRICE]: (state, action) => {


    const { id, price } = action.payload;
    // Buscar el producto en el estado por su id
    const productIndex = state.findIndex((item) => item.id === id);
    if (productIndex >= 0) {
      // Clonar el estado actual
      const newState = [...state];
      // Actualizar el color del producto
      newState[productIndex] = {
        ...newState[productIndex],
        price: price,
      };
      // Actualizar el estado en el almacenamiento local
      updateLocalStorage(newState);
      // Devolver el nuevo estado actualizado
      return newState;
    }
    // Si el producto no se encuentra, devolver el estado sin cambios
    return state;
  },


  [CART_ACTION_TYPES.CHANGE_PROCES]: (state, action) => {


    const { id, procesador } = action.payload;
    // Buscar el producto en el estado por su id
    const productIndex = state.findIndex((item) => item.id === id);
    if (productIndex >= 0) {
      // Clonar el estado actual
      const newState = [...state];
      // Actualizar el color del producto
      newState[productIndex] = {
        ...newState[productIndex],
        procesador: procesador,
      };
      // Actualizar el estado en el almacenamiento local
      updateLocalStorage(newState);
      // Devolver el nuevo estado actualizado
      return newState;
    }
    // Si el producto no se encuentra, devolver el estado sin cambios
    return state;
  },


  [CART_ACTION_TYPES.CHANGE_RAM]: (state, action) => {
    const { id, ram } = action.payload;
    // Buscar el producto en el estado por su id
    const productIndex = state.findIndex((item) => item.id === id);
    if (productIndex >= 0) {
      // Clonar el estado actual
      const newState = [...state];
      // Actualizar el color del producto
      newState[productIndex] = {
        ...newState[productIndex],
        ram: ram,
      };
      // Actualizar el estado en el almacenamiento local
      updateLocalStorage(newState);
      // Devolver el nuevo estado actualizado
      return newState;
    }
    // Si el producto no se encuentra, devolver el estado sin cambios
    return state;
  },


  [CART_ACTION_TYPES.CHANGE_MEMORY]: (state, action) => {
    const { id, memoria } = action.payload;
    // Buscar el producto en el estado por su id
    const productIndex = state.findIndex((item) => item.id === id);
    if (productIndex >= 0) {
      // Clonar el estado actual
      const newState = [...state];
      // Actualizar el color del producto
      newState[productIndex] = {
        ...newState[productIndex],
        memoria: memoria,
      };
      // Actualizar el estado en el almacenamiento local
      updateLocalStorage(newState);
      // Devolver el nuevo estado actualizado
      return newState;
    }
    // Si el producto no se encuentra, devolver el estado sin cambios
    return state;
  },



  [CART_ACTION_TYPES.CHANGE_PULGADAS]: (state, action) => {
    const { id, pulgadas } = action.payload;
    // Buscar el producto en el estado por su id
    const productIndex = state.findIndex((item) => item.id === id);
    if (productIndex >= 0) {
      // Clonar el estado actual
      const newState = [...state];
      // Actualizar el color del producto
      newState[productIndex] = {
        ...newState[productIndex],
        pulgadas: pulgadas,
      };
      // Actualizar el estado en el almacenamiento local
      updateLocalStorage(newState);
      // Devolver el nuevo estado actualizado
      return newState;
    }
    // Si el producto no se encuentra, devolver el estado sin cambios
    return state;
  },



  [CART_ACTION_TYPES.CHANGE_COLOR]: (state, action) => {
    const { id, color } = action.payload;
    // Buscar el producto en el estado por su id
    const productIndex = state.findIndex((item) => item.id === id);
    if (productIndex >= 0) {
      // Clonar el estado actual
      const newState = [...state];
      // Actualizar el color del producto
      newState[productIndex] = {
        ...newState[productIndex],
        color: color,
      };
      // Actualizar el estado en el almacenamiento local
      updateLocalStorage(newState);
      // Devolver el nuevo estado actualizado
      return newState;
    }
    // Si el producto no se encuentra, devolver el estado sin cambios
    return state;
  },



  [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {

    const { id } = action.payload;
    const productInCartIndex = state.findIndex((item) => item.id === id);


    console.log("estoy añadiendo al carrito");

    if (productInCartIndex >= 0) {
      // 👀 una forma sería usando structuredClone
      // const newState = structuredClone(state)
      // newState[productInCartIndex].quantity += 1

      // 👶 usando el map
      // const newState = state.map(item => {
      //   if (item.id === id) {
      //     return {
      //       ...item,
      //       quantity: item.quantity + 1
      //     }
      //   }

      //   return item
      // })

      // ⚡ usando el spread operator y slice
      const newState = [
        ...state.slice(0, productInCartIndex),
        {
          ...state[productInCartIndex],
          quantity: state[productInCartIndex].quantity + 1,
        },
        ...state.slice(productInCartIndex + 1),
      ];

      updateLocalStorage(newState);
      return newState;
    }

    const newState = [
      ...state,
      {
        ...action.payload, // product
        quantity: 1,
      },
    ];

    updateLocalStorage(newState);
    return newState;
  },

  [CART_ACTION_TYPES.REST_TO_CART]: (state, action) => {
    const { id } = action.payload;
    const productInCartIndex = state.findIndex((item) => item.id === id);

    if (productInCartIndex >= 0) {
      // 👀 una forma sería usando structuredClone
      // const newState = structuredClone(state)
      // newState[productInCartIndex].quantity += 1

      // 👶 usando el map
      // const newState = state.map(item => {
      //   if (item.id === id) {
      //     return {
      //       ...item,
      //       quantity: item.quantity + 1
      //     }
      //   }

      //   return item
      // })

      // ⚡ usando el spread operator y slice

      const newState = [
        ...state.slice(0, productInCartIndex),
        {
          ...state[productInCartIndex],
          quantity: state[productInCartIndex].quantity - 1,
        },
        ...state.slice(productInCartIndex + 1), // Corregido
      ];

      updateLocalStorage(newState);
      return newState;
    }

    const newState = [
      ...state,
      {
        ...action.payload, // product
        quantity: 1,
      },
    ];

    updateLocalStorage(newState);
    return newState;
  },

  [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
    const { id } = action.payload;
    const newState = state.filter((item) => item.id !== id);
    updateLocalStorage(newState);
    return newState;
  },
  [CART_ACTION_TYPES.CLEAR_CART]: () => {
    updateLocalStorage([]);
    return [];
  },


};



export const cartReducer = (state, action) => {
  const { type: actionType } = action;
  const updateState = UPDATE_STATE_BY_ACTION[actionType];
  return updateState ? updateState(state, action) : state;
};
