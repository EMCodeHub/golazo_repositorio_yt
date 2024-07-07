
import { Footer } from "../components/Footer";

import EditConsultas from "../components/EditConsultas";





const EditConsultasPage = () => {


  return (
    <>
      <div className="container" style ={{justifyContent: 'flex-start', marginTop: "150px"}}>
        
      <div style={{maxWidth:"1200px"}}>
       <EditConsultas/>

       </div>
   
</div>
     
      <Footer />
    </>
  );
};

export default EditConsultasPage;
