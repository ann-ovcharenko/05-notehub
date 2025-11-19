import React from "react";
// import css from './StatusError.module.css'; // Імпорт стилів

interface StatusErrorProps {
  message: string;
}

const StatusError: React.FC<StatusErrorProps> = ({ message }) => {
  return (
    <div className="errorContainer">
      <h2>❌ Помилка!</h2>
      <p>Не вдалося завантажити дані.</p>
      <p>Деталі: {message}</p>
    </div>
  );
};

export default StatusError;
