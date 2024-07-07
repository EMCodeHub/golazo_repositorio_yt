import { createContext, useContext, useState } from "react";

const ValidacionContext = createContext();

export const useValidacion = () => {
  return useContext(ValidacionContext);
};

export const ValidacionProvider = ({ children }) => {


  const [validacion, setValidacion] = useState(true);


  const [random, setRandom] = useState('');



  const [openn, setOpenn] = useState(false);   // un estado para saber si esta abierto o cerrado
  const [opennn, setOpennn] = useState(false);   // un estado para saber si esta abierto o cerrado
  const [OpenDrawer, setOpenDrawer] = useState(false);   // un estado para saber si esta abierto o cerrado



  const [invisibilizarbotoncarrito, setinvisibilizarbotoncarrito] = useState(true); 





  const handleinvisibilizarcarrito = ()=>{

    setinvisibilizarbotoncarrito(!invisibilizarbotoncarrito);
  
  
  }


 
  const handleinvisibilizarcarritotrue = ()=>{

    setinvisibilizarbotoncarrito(true);
  
  
  }













  const alterarValidacion = () => {
    setValidacion(!validacion);
  };

  const alterarRandom = (valor) => {
    setRandom(valor);
  };


  const handledivappear = ()=>{

    setOpenn(!openn);
  
  
  }


  const handlecarritoappear = ()=>{

    setOpennn(!opennn);
  
  
  }



  const handleopendrawer = ()=>{

    setOpenDrawer(!OpenDrawer);
  
  
  }





  return (
    <ValidacionContext.Provider value={{ validacion, alterarValidacion, random, alterarRandom,openn,handledivappear, handlecarritoappear, opennn, OpenDrawer, handleopendrawer, invisibilizarbotoncarrito, handleinvisibilizarcarrito, handleinvisibilizarcarritotrue  }}>
      {children}
    </ValidacionContext.Provider>
  );
};
