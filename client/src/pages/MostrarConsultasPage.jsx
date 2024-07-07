import { Footer } from "../components/Footer";
import MostrarConsultas from "../components/MostrarConsultas";

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
        <MostrarConsultas/>
      </div>
      <Footer />
    </>
  );
};

export default ShowPedidosPage;
