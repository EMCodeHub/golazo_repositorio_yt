
function DivCookies( {handleShowExternalDiv, handleAcceptCookies}) {
  return (

    <div
      className="cookie-bar"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "black",
        height: "80px",
        zIndex: 9999,
        color: "white",
        textAlign: "center",
        padding: "10px",
      }}
    >
      Utilizamos cookies.{" "}
      <span
        onClick={handleShowExternalDiv}
        style={{ color: "blue", cursor: "pointer" }}
      >
        Más información.
      </span>
      <button
        onClick={handleAcceptCookies}
        style={{
          background: "#0071e3",
          color: "white",
          borderRadius: "30px",
        }}
      >
        Aceptar
      </button>
    </div>
   
  )
}

export default DivCookies
