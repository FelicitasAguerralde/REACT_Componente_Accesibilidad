import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="contact-container">
      <h1>Contacto</h1>
      <div className="contact-content">
        <p>¿Tienes alguna pregunta o sugerencia? No dudes en contactarnos.</p>
        
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Mensaje:</label>
            <textarea 
              id="message" 
              name="message" 
              rows="5" 
              required 
              aria-required="true"
            ></textarea>
          </div>

          <button type="submit" className="submit-button">
            Enviar mensaje
          </button>
        </form>

        <div className="contact-info">
          <h2>Información de contacto</h2>
          <p>Email: contacto@ejemplo.com</p>
          <p>Teléfono: (123) 456-7890</p>
          <p>Dirección: Calle Ejemplo 123, Ciudad</p>
        </div>
      </div>

      <Link to="/" className="back-link">
        Volver al inicio
      </Link>
    </div>
  );
} 