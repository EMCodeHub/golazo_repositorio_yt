//Importamos ReactDom para poder crear la raiz (createRoot)

import ReactDOM from "react-dom/client";


//Debido a que estamos en el main, debemos traernos App.js

import App from "./App.jsx";


//fuentes para la barra de navegación

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";





// Nos traemos de material ui el CssBaseline, ThemeProvider, createTheme

import { CssBaseline, ThemeProvider, createTheme} from "@mui/material";


//CssBaseline, es para establecer un estilos "BASE". Lo utilizaremos sobretodo en la barra de navegación


//utilizamos el createTheme , con el objetivo de definir colores, dark mode, light mode...
//theme para barra de navegación
//cambio de colores de la barra de navegación



//#121111

//#fff6f6

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "rgba(22, 22, 23)",
    },

    secondary: {
      main: "rgb(201 7 32)",
    },
  },
});



ReactDOM.createRoot(document.getElementById("root")).render(


//introducimos un react fragment

  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </>
);


