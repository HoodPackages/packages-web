import { useEffect, useState } from 'react';
import axios from 'axios';

export const usePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://packages-server-75ra.onrender.com/api/products')
      .then(res => {
        setPackages(res.data);
        console.log(res.data)
      })
      .catch(err => {
        console.error("Ошибка при загрузке пакетов:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { packages, loading };
};
