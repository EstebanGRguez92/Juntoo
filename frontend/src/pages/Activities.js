import React from "react";
import "./../styles/Activities.css";

const Activities = () => {
  // Datos simulados (mock data)
  const activities = [
    {
      id: 1,
      title: "Clase de Yoga en el Parque",
      creator: "Ana López",
      profilePic: "https://via.placeholder.com/40",
      locationName: "Parque Central",
      address: "Av. Las Flores 123, CDMX",
      dateTime: "2025-01-10 09:00 AM",
    },
    {
      id: 2,
      title: "Taller de Pintura al Aire Libre",
      creator: "Luis Martínez",
      profilePic: "https://via.placeholder.com/40",
      locationName: "Jardín Cultural",
      address: "Calle Arte 45, Puebla",
      dateTime: "2025-01-12 04:00 PM",
    },
    {
      id: 3,
      title: "Caminata Fotográfica",
      creator: "Marta Rivera",
      profilePic: "https://via.placeholder.com/40",
      locationName: "Plaza del Sol",
      address: "Zona Centro, Guadalajara",
      dateTime: "2025-01-15 08:00 AM",
    },
    {
      id: 4,
      title: "Charla de Literatura Contemporánea",
      creator: "Juan Pérez",
      profilePic: "https://via.placeholder.com/40",
      locationName: "Biblioteca Nacional",
      address: "Av. Universidad 200, Monterrey",
      dateTime: "2025-01-18 06:00 PM",
    },
    {
      id: 5,
      title: "Sesión de Meditación Grupal",
      creator: "Sofía Gómez",
      profilePic: "https://via.placeholder.com/40",
      locationName: "Salón Zen",
      address: "Calle Calma 78, Mérida",
      dateTime: "2025-01-20 07:00 PM",
    },
  ];

  return (
    <div className="activities-container">
      <h2>Actividades Disponibles</h2>
      <ul className="activities-list">
        {activities.map((activity) => (
          <li key={activity.id} className="activity-card">
            <div className="activity-header">
              <img
                src={activity.profilePic}
                alt={`${activity.creator} profile`}
                className="profile-pic"
              />
              <div>
                <h3>{activity.title}</h3>
                <p>Por: {activity.creator}</p>
              </div>
            </div>
            <div className="activity-details">
              <p><strong>Lugar:</strong> {activity.locationName}</p>
              <p><strong>Dirección:</strong> {activity.address}</p>
              <p><strong>Fecha y Hora:</strong> {activity.dateTime}</p>
            </div>
            <div className="activity-actions">
              <button className="view-more">Ver más</button>
              <button className="add-favorite">❤</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Activities;
