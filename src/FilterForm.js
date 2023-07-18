import React, { useEffect, useRef } from 'react';

function FilterForm({ focusField, onChange, handleResetFilters }) {
  const salidasRef = useRef();
  const entradasRef = useRef();
  const observacionesRef = useRef();
  const rubroRef = useRef();

  useEffect(() => {
    switch (focusField) {
      case 'Salidas':
        salidasRef.current.focus();
        break;
      case 'Entradas':
        entradasRef.current.focus();
        break;
      case 'Observaciones':
        observacionesRef.current.focus();
        break;
      case 'Rubro':
        rubroRef.current.focus();
        break;
      default:
        break;
    }
  }, [focusField]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClearFilters();
      return;
    }

    if (!event.shiftKey) {
      return;
    }

    switch (event.key) {
      case '1':
        document.getElementById('Salidas').focus();
        break;
      case '2':
        document.getElementById('Entradas').focus();
        break;
      case '3':
        document.getElementById('Observaciones').focus();
        break;
      case '4':
        document.getElementById('Rubro').focus();
        break;
      default:
        break;
    }
  };

  const onFilterChange = (event) => {
    onChange(event);
  };

  const onClearFilters = () => {
    salidasRef.current.value = '';
    entradasRef.current.value = '';
    observacionesRef.current.value = '';
    rubroRef.current.value = '';
    handleResetFilters();
  };

  return (
    <form>
      <label className='lbl-txt-my'>
        Entradas
        <input
          ref={entradasRef}
          id='Entradas'
          name='Entradas'
          onChange={onFilterChange}
          className='form-txt-my'
          autoComplete='off'
        />
      </label>
      <label className='lbl-txt-my'>
        Salidas
        <input
          ref={salidasRef}
          id='Salidas'
          name='Salidas'
          onChange={onFilterChange}
          className='form-txt-my'
          autoComplete='off'
        />
      </label>
      <label className='lbl-txt-my'>
        Observaciones
        <input
          ref={observacionesRef}
          id='Observaciones'
          name='Observaciones'
          onChange={onFilterChange}
          className='form-txt-my'
          autoComplete='off'
        />
      </label>
      <label className='lbl-txt-my'>
        Rubro
        <input
          ref={rubroRef}
          id='Rubro'
          name='Rubro'
          onChange={onFilterChange}
          className='form-txt-my'
          autoComplete='off'
        />
      </label>
      <button
        type='button'
        onClick={onClearFilters}
        className='btn btn-outline-warning btn-sm'
      >
        X
      </button>
    </form>
  );
}

export default FilterForm;
