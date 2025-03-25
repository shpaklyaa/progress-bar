import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar'; // Импорт компонента ProgressBar

const App = () => {
  const [data, setData] = useState(null); // Для хранения загруженных данных
  const [percentage, setPercentage] = useState(0); // Процент выполнения
  const [isFetching, setIsFetching] = useState(false); // Статус загрузки
  const [isCanceled, setIsCanceled] = useState(false); // Статус отмены

  // Обработчик отмены
  const handleCancel = () => {
    setIsCanceled(true);
    setIsFetching(false);
  };

  // Функция имитации загрузки данных
  const fetchData = async () => {
    setIsFetching(true);
    setIsCanceled(false);

    try {
      // Имитируем задержку загрузки (5 секунд)
      const totalDuration = 5000; // 5 секунд
      const intervalId = setInterval(() => {
        if (percentage < 100 && !isCanceled) {
          setPercentage((prev) => prev + 10); // Увеличиваем процент каждые 500 мс
        }
      }, 500);

      await new Promise((resolve) => setTimeout(resolve, totalDuration));

      // Загружаем данные с API
      const response = await fetch('https://fakeapi.extendsclass.com/countries');
      const result = await response.json();
      setData(result);

      clearInterval(intervalId); // Останавливаем интервал
      setIsFetching(false);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      setIsFetching(false);
    }
  };

  // Автоматическая загрузка данных при монтировании компонента
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Имитация загрузки данных</h1>
      {isFetching && (
        <ProgressBar
          title="Загрузка данных..."
          percentage={percentage}
          onCancel={handleCancel}
        />
      )}
      {!isFetching && data && (
        <div>
          <h2>Загруженные данные:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      {isCanceled && (
        <div>
          <h2>Загрузка была отменена.</h2>
        </div>
      )}
    </div>
  );
};

export default App;