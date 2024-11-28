'use client';
import { useState, useEffect } from 'react';

export default function ItemForm({ onSave, item }) {
  const [name, setName] = useState('');

  // Prellenar el formulario si estamos editando un elemento
  useEffect(() => {
    if (item) setName(item.name);
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    onSave({ id: item?.id, name });
    setName(''); // Limpiar el formulario después de guardar
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter item name"
      />
      <button type="submit">{item ? 'Update' : 'Add'} Item</button>
    </form>
  );
}
