import React, { useEffect, useRef, useState } from "react";
import { useId } from "react";
import { useFilters } from "../hooks/useFilters.js";
import Slider from "react-slider";
import "./css/Filters.css";
import "./css/fonts/fonts5144.css";
import "./css/Mostrador.css";
import "./css/Doublerange.css";

import axios from "axios";

export function Filters({ category: defaultCategory }) {
  const { filters, setFilters } = useFilters();
  const minPriceFilterId = useId();
  const categoryFilterId = useId();
  const maxPriceFilterId = useId();
  const selectRef = useRef(null);

  const [category, setCategory] = useState(defaultCategory); // Estado local para la categoría

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    axios
      .get(`${baseURL}/api/showCategorias`)
      .then((response) => {
        setCategorias(response.data.categorias);
      })
      .catch((error) => {
        console.error("Error al obtener categorías:", error);
      });
  }, []); // Esta llamada solo se hace una vez al cargar el componente

  // Efecto unificado para actualizar la categoría y los filtros
  useEffect(() => {
    // Actualizar la categoría en el estado local
    setCategory(defaultCategory);
    // Actualizar los filtros con la nueva categoría
    setFilters((prevState) => ({
      ...prevState,
      category: defaultCategory,
    }));
  }, [defaultCategory, setFilters]);

  useEffect(() => {
    // Verificar si la referencia al select existe
    if (selectRef.current) {
      // Hacer scroll suave hacia la select
      selectRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []); // Se ejecutará solo cuando el componente se monte

  const handleChangeMinPrice = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: Number(event.target.value),
    }));
  };

  const handleChangeMaxPrice = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      maxPrice: Number(event.target.value),
    }));
  };

  const handleChangeCategory = (event) => {
    const newCategory = event.target.value;
    // Actualizar la categoría en el estado local
    setCategory(newCategory);
    // Actualizar los filtros con la nueva categoría
    setFilters((prevState) => ({
      ...prevState,
      category: newCategory,
    }));
  };

  return (




    <section className="filters">
      <div>

      {/*
        <label htmlFor={categoryFilterId}></label>
  */}




        <select

          ref={selectRef} // Asignar la referencia al select
          id={categoryFilterId}
          onChange={handleChangeCategory}
          className="SelectFilter"
          value={category} // Establecer el valor de la categoría del estado local
        >
          <option value="all">
            Todas las categorias
          </option>

          {categorias.map((categoria, index) => (
            <option key={index} value={categoria}>
              {categoria}
            </option>
          ))}


        </select>




        
      </div>
      <div className="filterprice">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "3px",
            borderRadius: "5px",
            minWidth: "300px",
            maxWidth: "700px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="minPrice"></label>
            <input
              type="number"
              id={minPriceFilterId}
              value={filters.minPrice}
              onChange={handleChangeMinPrice}
              min="0"
              max="5000"



              style={{
                minWidth: "80px",
                marginLeft: "10px",
                marginBottom: "10px",
                maxWidth: "40px",
                color: "#817a7a",
                border: '0',
            
                textAlign: "center",
                fontSize: "15px", // Cambiado de font-size: 15px; a fontSize: "15px",
                lineHeight: "1.21053", // Cambiado de line-height: 1.21053; a lineHeight: "1.21053",
                fontWeight: 700,
                letterSpacing: "0em", // Cambiado de letter-spacing: 0em; a letterSpacing: "0em",
                fontFamily: "'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial'",
                marginTop: "15px",
            }}
            


              className="inputpricepropio"
            />
          </div>

          <Slider
            className="slider"
            value={[filters.minPrice, filters.maxPrice]}
            onChange={(newValues) => {
              setFilters((prevState) => ({
                ...prevState,
                minPrice: newValues[0],
                maxPrice: newValues[1],
              }));
            }}
            min={0}
            max={5000}
            style={{ minWidth: "165px", maxWidth: "250px",  }}
          />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="maxPrice" style={{ marginLeft: "10px" }}></label>
            <input
              type="number"
              id={maxPriceFilterId}
              value={filters.maxPrice}
              onChange={handleChangeMaxPrice}
              min="0"
              max="5000"
              style={{
                minWidth: "80px",
                marginLeft: "10px",
                marginBottom: "10px",
                maxWidth: "70px",
                color: "#817a7a",
                border: '0',
               
                textAlign: "center",
                fontSize: "15px", // Cambiado de font-size: 15px; a fontSize: "15px",
                lineHeight: "1.21053", // Cambiado de line-height: 1.21053; a lineHeight: "1.21053",
                fontWeight: 700,
                letterSpacing: "0em", // Cambiado de letter-spacing: 0em; a letterSpacing: "0em",
                fontFamily: "'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                marginTop: "15px",
            }}
            


              className="inputpricepropio"
            />
          </div>
        </div>
      </div>
    </section>




  );
}
