

function PoliticaPrivacidadCookies({handleAcceptCookies, handlerejectCookies}) {
  return (


    <div
    style={{
      position: "fixed",
      top: "85%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "white",
      border: "2px solid black",
      padding: "20px",
      zIndex: 99999,
      width: "100%",
      marginBottom: "20px",
    }}
  >
    <p>
      Política de Privacidad: Las cookies que utiliza este sitio web
      NO CONTIENEN información personal Utilizamos la cookie de
      Google Analytics para obtener información estadística del
      tráfico en nuestra web No compartimos datos con terceros.
    </p>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <button
        onClick={handleAcceptCookies}
        style={{ marginTop: "20px" }}
      >
        Aceptar
      </button>
      <button
        onClick={handlerejectCookies}
        style={{ marginTop: "20px" }}
      >
        Rechazar
      </button>
    </div>
  </div>





   
  )
}

export default PoliticaPrivacidadCookies
