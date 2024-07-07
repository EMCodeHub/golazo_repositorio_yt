
import { Footer } from "../components/Footer";

import ShowPedidos from "../components/ShowPedidos";





const ShowPedidosPage = () => {


  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        color: 'black',
        marginTop: '150px',

      }}>
        

       <ShowPedidos/>
   
</div>
     
      <Footer />
    </>
  );
};

export default ShowPedidosPage;
