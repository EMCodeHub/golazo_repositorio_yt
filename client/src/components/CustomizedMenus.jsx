import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import useValidacion from "../hooks/useValidacion";

const StyledMenu = styled(Menu)(({ theme }) => ({}));



const CustomizedMenuItem = styled(MenuItem)(({ theme }) => ({


  marginTop: "0px",
  fontSize: "15px",
  marginLeft: "20px",
  cursor: "pointer",
  padding: "8px 12px",
  backgroundColor: "rgba(22, 22, 23)",
  color: "white",
  borderRadius: "4px",
  lineHeight: "1.1428571429",
  fontWeight: 600,
  letterSpacing: ".007em",
  fontFamily:
    "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
  

}));



const CustomButton = styled(Button)(({ theme }) => ({
  marginTop: "30px",
  fontSize: "17px",
  marginLeft: "20px",
  cursor: "pointer",
  padding: "8px 12px",
  backgroundColor: "rgba(22, 22, 23)",
  color: "white",
  borderRadius: "4px",
  lineHeight: "1.1428571429",
  fontWeight: 600,
  letterSpacing: ".007em",
  fontFamily:
    "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
}));

export default function CustomizedMenus({ categoria }) {
  const { handleopendrawer, OpenDrawer } = useValidacion();

  const [Productosporcategoria, setProductosporcategoria] = useState([]);

  useEffect(() => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    axios
      .post(`${baseURL}/api/showProductosPorCategoria/${categoria}`)
      .then((response) => {
        setProductosporcategoria(response.data.productos); // Ajusta según la estructura de la respuesta JSON
      })
      .catch((error) => {
        console.error("Error al obtener productos por categoría:", error);
      });
  }, [categoria]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleViewProduct = (producto) => {
    handleopendrawer(false);

    const productid = producto.id;

    navigate(`/descriptionhome/${productid}`);
  };

  return (
    <div>
      <CustomButton
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        style={{ textTransform: "none" }}
      >
        {categoria} {/* Aquí imprimimos la categoría */}
      </CustomButton>

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open && OpenDrawer}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: "rgba(22, 22, 23)",
            color: "white",
            boxShadow: "none",
            overflowX:'auto',
            overflowY:'auto',

          
          
          },
        }}
      >
        {Productosporcategoria.map((producto) => (


          <CustomizedMenuItem
            key={producto.title}
            onClick={() => handleViewProduct(producto)}
            disableRipple
          >
            {producto.title}
          </CustomizedMenuItem>


          
        ))}
      </StyledMenu>
    </div>
  );
}
