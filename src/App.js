import React, { useState, useEffect } from 'react';
import ReadTable from './ReadTable';
import FilterForm from './FilterForm';

const initialFilters = {
  Salidas: '',
  Entradas: '',
  Observaciones: '',
  Rubro: '',
};

function App() {
  const [filters, setFilters] = useState(initialFilters);

  const [title, setTitle] = useState(null);
  const [date, setDate] = useState(null);
  const [focusField, setFocusField] = useState(null);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (!event.ctrlKey) {
      return;
    }

    switch (event.key) {
      case '1':
        setFocusField('Entradas');
        break;
      case '2':
        setFocusField('Salidas');
        break;
      case '3':
        setFocusField('Observaciones');
        break;
      case '4':
        setFocusField('Rubro');
        break;
      default:
        break;
    }
  };

  const handleFilterChange = (filters) => {
    const { name, value } = filters.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleResetFilters = (evt) => {
    evt && evt.preventDefault();
    setFilters(initialFilters);
  };

  const handleReset = () => {
    if (window.confirm('Borrar las revisiones de este archivo?')) {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(`${title}-${date}`)) {
          localStorage.removeItem(key);
        }
      });
      window.location.reload();
    }
  };

  return (
    <div className='main-app'>
      <button
        className='btn btn-outline-danger btn-sm btn-reset-rev'
        onClick={handleReset}
      >
        Reset Revisions
      </button>
      <FilterForm
        focusField={focusField}
        // filters={filters}
        // setFilters={setFilters}
        onChange={handleFilterChange}
        handleResetFilters={handleResetFilters}
      />
      <ReadTable
        setTitle={setTitle}
        setDate={setDate}
        title={title}
        date={date}
        filters={filters}
      />
    </div>
  );
}

export default App;
