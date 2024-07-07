

import { useState, createContext } from "react";

// Crear el contexto UserContext
export const UserContext = createContext();


// Componente de proveedor de contexto de usuario
export function UserProvider({ children }) {

  
  const [isAdmin, setIsAdminState] = useState(false); // Cambiado de setIsAdmin a setIsAdminState


  // Renderizar el contenido envuelto en el proveedor de contexto
  return <UserContext.Provider value={{ isAdmin, setIsAdminState }}>{children}</UserContext.Provider>;

  
}
