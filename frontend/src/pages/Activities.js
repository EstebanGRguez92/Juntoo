import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./../styles/Activities.css";
import profileImage from "../images/logo192.png";

const Activities = () => {
  const activities = [
    {
      id: 1,
      title: "Clase de Yoga en el Parque",
      creator: "Ana López",
      profilePic: {profileImage},
      locationName: "Parque Central",
      address: "Av. Las Flores 123, CDMX",
      dateTime: "2025-01-10 09:00 AM",
    },
    {
      id: 2,
      title: "Clase de Yoga en el Parque",
      creator: "Ana López",
      profilePic: {profileImage},
      locationName: "Parque Central",
      address: "Av. Las Flores 123, CDMX",
      dateTime: "2025-01-10 09:00 AM",
    },
    {
      id: 3,
      title: "Clase de Yoga en el Parque",
      creator: "Ana López",
      profilePic: {profileImage},
      locationName: "Parque Central",
      address: "Av. Las Flores 123, CDMX",
      dateTime: "2025-01-10 09:00 AM",
    },
    // Más actividades...
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtener el token almacenado en el navegador

    if (!token) {
        // Si no hay token, redirigir al login
        navigate('/login');
    } else {
        // Opcional: Verificar si el token sigue siendo válido haciendo una solicitud al backend
        fetch('http://localhost:5001/api/validate-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
            },
        })
            .then((response) => {
                if (!response.ok) {
                    // Token inválido, redirigir al login
                    navigate('/login');
                }
            })
            .catch(() => {
                // Error de red, redirigir al login
                navigate('/login');
            });
    }
}, [navigate]);

  return (
    <section className="activities-container">
    <h2>Actividades Disponibles</h2>
      {activities.length > 0 ? (
        <ul className="activities-list">
          {activities.map((activity) => (
            <li key={activity.id} className="activity-card">
              <article>
                <div className="activity-header">
                  <img
                    src={profileImage}
                    alt={`${activity.creator} profile`}
                    className="profile-pic"
                  />
                  <div>
                    <h3>{activity.title}</h3>
                    <p>Por: {activity.creator}</p>
                  </div>
                </div>
                <div className="activity-details">
                  <p>
                    <strong>Lugar:</strong> {activity.locationName}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {activity.address}
                  </p>
                  <p>
                    <strong>Fecha y Hora:</strong> {activity.dateTime}
                  </p>
                </div>
                <div className="activity-actions">
                  <button className="view-more">Ver más</button>
                  <button className="add-favorite">❤</button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay actividades disponibles en este momento.</p>
      )}
    </section>
  );
};

export default Activities;
