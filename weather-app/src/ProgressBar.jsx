import React, { useState } from 'react';

const ProgressBar = ({ title, percentage, onCancel }) => {
  const [isCanceled, setIsCanceled] = useState(false);

  // Функция для обработки отмены
  const handleCancel = () => {
    setIsCanceled(true);
    onCancel(); // Вызываем переданный обработчик отмены
  };

  return (
    <div className="progress-bar-container">
      <h3>{title}</h3>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${isCanceled ? 0 : percentage}%`,
            backgroundColor: isCanceled ? 'gray' : '#4CAF50',
          }}
        >
          {isCanceled ? 'Canceled' : `${percentage}%`}
        </div>
      </div>
      <button className="cancel-button" onClick={handleCancel}>
        X
      </button>
    </div>
  );
};

export default ProgressBar;