import React from 'react';
import '../styles/colors.css'; // Ajustar ruta para importar correctamente los colores
import '../styles/Home.css';  // Ajustar ruta para importar correctamente los estilos del Home

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bienvenido a Juntoo</h1>
        <p>
          Tu espacio para conectar, aprender y fortalecer habilidades sociales en un entorno seguro y empático.
        </p>
      </header>
      <section className="home-content">
        <h2>¿Qué encontrarás aquí?</h2>
        <ul>
          <li>Comunidades de personas afines a ti.</li>
          <li>Actividades diseñadas para fortalecer tu bienestar emocional.</li>
          <li>Un entorno amigable y menos intimidante.</li>
        </ul>
      </section>
      <div className="home-call-to-action">
        <h2>¡Únete a nuestra comunidad hoy!</h2>
        <p>Comienza tu camino hacia un entorno más empático y lleno de conexiones auténticas.</p>
        <button className="cta-button">Registrarte</button>
      </div>
    </div>
  );
};

export default Home;
