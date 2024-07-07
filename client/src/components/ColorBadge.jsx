
import Badge from "@mui/material/Badge";
import { ShoppingCart } from "@mui/icons-material";


import './css/badge.css';


import { useCart } from "../hooks/useCart.js";


import {
BolsaCarritoEstilizada,
} from "./svgNavbar";




function ColorBadge(props) {


const {cantidad} = props;


  return (




    <Badge badgeContent={cantidad} color="secondary" classes={{ badge: 'custom-badge' }} >

    <BolsaCarritoEstilizada/>

    </Badge>


    
  );
  
}

export default ColorBadge;
