import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from "./config";

export const usePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/api/products`)
      .then(res => {
        setPackages(res.data);
      })
      .catch(err => {
        console.error("Ошибка при загрузке пакетов:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { packages, loading, API_URL };
};
