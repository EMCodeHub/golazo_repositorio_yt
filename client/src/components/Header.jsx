import { Filters } from "./Filters.jsx";

import "./css/Header.css";

export function Header({ category }) {
  return (

    
  

    <header>

    <div className="vacio">-</div>
      <div className="headergolazo" style={{height:'410px'}}>
        <img
          src="http://elgolazo.net/imagenesvarias/golazo.jpeg"
          alt="el golazo"
          className="imgGolazo"
          style={{marginTop:"40px"}}
        />
      </div>


      <div className="vacio" style={{color:'white'}}>-</div>


      
      <div className="filters-container">
        <Filters category={category} />
      </div>



    </header>
  );
}
