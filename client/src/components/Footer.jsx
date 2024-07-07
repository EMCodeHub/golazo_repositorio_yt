import './css/Footer.css'
import { useNavigate } from 'react-router-dom'

import "./css/fonts/fonts5144.css"; // traemos la fuente de apple

import "./css/Mostrador.css"; // los estilos del boton de apple




export function Footer () {
const navigate = useNavigate();


  


  return (




    <div>
      
      <div className="bod">


        <footer>





<div  style= {{display:'flex', justifyContent:'center', alignItems:'center',  fontSize: "12px",
lineHeight: "1.21053",
fontWeight: 300,
letterSpacing: "0em",
fontFamily:
  '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
color: "grey",}}>

ElGolazo una tienda online de renombre que se ha posicionado como referente en el mundo del entretenimiento digital en Colombia. Ofrecemos una amplia gama de productos de alta calidad, desde laptops y celulares de última generación hasta televisores de vanguardia y videojuegos emocionantes. Nuestra marca se distingue por su compromiso inquebrantable con la excelencia y la satisfacción del cliente. Nos esforzamos por brindar experiencias de compra excepcionales y productos que superen las expectativas en términos de rendimiento y durabilidad. Además, nos enorgullece anunciar que realizamos envíos a todo el país, garantizando que nuestros clientes puedan disfrutar de nuestros productos donde quiera que estén en Colombia. Con ElGolazo, tu experiencia de entretenimiento nunca ha sido tan emocionante ni conveniente.


</div>
























          <div className="footer-col">
            <h4>productos</h4>
            <ul>
              <li>
                <button 
                  onClick={() => navigate('/')}
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.125',
                    fontWeight: 400,
                    letterSpacing: '.004em',
                    fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                    color: "black",
                     // Añadir margen inferior al h2 para separarlo del siguiente elemento
                    backgroundColor: '#ffffff',
                  }}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/shop')}
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.125',
                    fontWeight: 400,
                    letterSpacing: '.004em',
                    fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                    color: "black",
                   // Añadir margen inferior al h2 para separarlo del siguiente elemento
                    backgroundColor: '#ffffff',
                  }}
                >
                  Tienda
                </button>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Acceso</h4>
            <ul>
              <li>
                <button 
                  onClick={() => navigate('/login')}
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.125',
                    fontWeight: 400,
                    letterSpacing: '.004em',
                    fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                    color: "black",
                  // Añadir margen inferior al h2 para separarlo del siguiente elemento
                    backgroundColor: '#ffffff',
                  }}
                >
                  Login
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/register')}
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.125',
                    fontWeight: 400,
                    letterSpacing: '.004em',
                    fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                    color: "black",
                    // Añadir margen inferior al h2 para separarlo del siguiente elemento
                    backgroundColor: '#ffffff',
                  }}
                >
                  Registrarse
                </button>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Empresa</h4>
            <ul>
              <li>
                <button 
                  onClick={() => navigate('/sobrenosotros')}
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.125',
                    fontWeight: 400,
                    letterSpacing: '.004em',
                    fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                    color: "black",
                   // Añadir margen inferior al h2 para separarlo del siguiente elemento
                    backgroundColor: '#ffffff',
                  }}
                >
                  Sobre nosotros
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/legal')}
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.125',
                    fontWeight: 400,
                    letterSpacing: '.004em',
                    fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                    color: "black",
                   // Añadir margen inferior al h2 para separarlo del siguiente elemento
                    backgroundColor: '#ffffff',
                  }}
                >
                  Legal
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/contacto')}
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.125',
                    fontWeight: 400,
                    letterSpacing: '.004em',
                    fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                    color: "black",
                   // Añadir margen inferior al h2 para separarlo del siguiente elemento
                    backgroundColor: '#ffffff',
                  }}
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>


          <div className="footer-col" style={{marginTop:'30px'}}>
            

            <div className="links">


            <button style={{ backgroundColor: 'rgb(7, 64, 189)', borderRadius: '10%' }} onClick={() => window.open('https://www.facebook.com/profile.php?id=100064250460314')}>
            <i className="fab fa-facebook-f"></i>
          </button>
          
          <button style={{ backgroundColor: 'rgb(34, 35, 31)', borderRadius: '10%' }} onClick={() => window.open('https://www.instagram.com/emdevapp/')}>
            <i className="fab fa-instagram"></i>
          </button>

            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
