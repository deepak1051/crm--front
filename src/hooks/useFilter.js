import { useState } from 'react';

const useFilter = (list) => {
  const [name, setName] = useState('');
  const [data, setData] = useState([]);

  const handleChange = (value) => {
    setName(value);
    setData(
      list.filter((v) => v.name.toLowerCase().includes(value.toLowerCase()))
    );
  };

  return { data, handleChange, name };
};

export default useFilter;
