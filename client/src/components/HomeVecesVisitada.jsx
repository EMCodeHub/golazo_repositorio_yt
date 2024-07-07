import React, { useEffect, useState } from "react";
import axios from 'axios';

const HomeVisitsCounter = () => {


  const [homeVisits, setHomeVisits] = useState(null);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${baseURL}/api/cuentanumerodecookies`);
        const { numerofilas } = response.data;
        setHomeVisits(numerofilas);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{color:"white", marginTop:'100px'}}>
      {homeVisits !== null ? (
        <p style={{color:"white"}}>La página home ha sido visitada: {homeVisits} veces segun las cookies</p>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default HomeVisitsCounter;
