
import { Footer } from "../components/Footer";

import EditPedidos from "../components/EditPedidos";





const ShowPedidosPage = () => {


  return (
    <>
      <div className="container" style ={{justifyContent: 'flex-start', marginTop: "150px"}}>
        

       <EditPedidos/>
   
</div>
     
      <Footer />
    </>
  );
};

export default ShowPedidosPage;
