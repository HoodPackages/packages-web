import { useEffect, useState } from 'react';
import axios from 'axios';

// http://localhost:5000
const API_URL = "https://packages-server-75ra.onrender.com";

export const usePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/api/products`)
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
