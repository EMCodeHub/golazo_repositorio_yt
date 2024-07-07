

import { FaShareAlt } from 'react-icons/fa';

function ShareFacebookButton() {
  // Función para manejar el clic en el botón de compartir en Facebook
  const handleFacebookShare = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  return (
    <div>
      {/* Botón de compartir en Facebook */}
      <button onClick={handleFacebookShare} style={{ 
        backgroundColor: '#4b3c3c',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '30px',
        border: 'none',
        cursor: 'pointer',
        color: 'white',
        fontSize: '15px',
                        lineHeight: '1.125',
                        fontWeight: 300,
                        letterSpacing: '.004em',
                        fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                        
                        marginBottom: "20px" 
      }}> <FaShareAlt /></button>    
    </div>
  );
}

export default ShareFacebookButton;