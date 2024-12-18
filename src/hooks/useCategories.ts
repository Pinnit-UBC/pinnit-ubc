import { useEffect, useState } from 'react';

const useCategories = () => {
  const [categories, setCategories] = useState<Record<string, string[]>>({});

  useEffect(() => {
    fetch('/api/getCategories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => {
        console.error('Error fetching categories:', err);
        setCategories({});
      });
  }, []);

  return categories;
};

export default useCategories;
