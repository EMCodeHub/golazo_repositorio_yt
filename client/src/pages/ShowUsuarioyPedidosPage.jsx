import { Footer } from "../components/Footer";
import ShowUsuarioyPedidos from "../components/ShowUsuarioyPedidos";





const ShowUsuarioyPedidosPage = () => {


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
        

       <ShowUsuarioyPedidos/>
   
</div>
     
      <Footer />
    </>
  );
};

export default ShowUsuarioyPedidosPage;
