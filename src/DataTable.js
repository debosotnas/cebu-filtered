import React, { useEffect, useState } from 'react';

function DataTable({ data, title, date, filters }) {
  const [rows, setRows] = useState([]);
  const [highlightedGroup, setHighlightedGroup] = useState(null);
  const [seenGroups, setSeenGroups] = useState(new Set());

  useEffect(() => {
    let filteredData = data;

    if (filters) {
      Object.keys(filters).forEach((key) => {
        const value = String(filters[key]).toLowerCase();
        if (value) {
          filteredData = filteredData.filter((row) => {
            return String(row[key]).toLowerCase().includes(value);
          });
        }
      });
    }

    const filteredIds = filteredData.map((row) => row.ID);

    filteredData = data.filter((row) => filteredIds.includes(row.ID));

    setRows(filteredData);
  }, [data, filters]);

  const handleCheck = (id) => {
    const checked = localStorage.getItem(`${title}-${date}-${id}`) === 'true';
    localStorage.setItem(`${title}-${date}-${id}`, !checked);
    setRows([...rows]);
  };

  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th></th>
          {Object.keys(data[0] || {}).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.isArray(rows) &&
          rows.map((row, index) => {
            if (!seenGroups.has(row.ID)) {
              setSeenGroups(
                (prevSeenGroups) => new Set([...prevSeenGroups, row.ID])
              );
            }

            const isEvenGroup =
              Array.from(seenGroups).indexOf(row.ID) % 2 === 0;

            return (
              <tr
                key={index}
                onClick={() => handleCheck(row.ID)}
                onMouseEnter={() => setHighlightedGroup(row.ID)}
                onMouseLeave={() => setHighlightedGroup(null)}
                className={
                  localStorage.getItem(`${title}-${date}-${row.ID}`) === 'true'
                    ? highlightedGroup === row.ID
                      ? 'checked-highlighted'
                      : 'checked'
                    : highlightedGroup === row.ID
                    ? 'highlighted'
                    : isEvenGroup
                    ? 'group1'
                    : 'group2'
                }
              >
                <td>
                  <input
                    type='checkbox'
                    checked={
                      localStorage.getItem(`${title}-${date}-${row.ID}`) ===
                      'true'
                    }
                    onClick={(e) => e.stopPropagation()}
                  />

                  {/* <input
                    type='checkbox'
                    checked={localStorage.getItem(`${title}-${date}-${row.ID}`) === 'true'}
                    onChange={() => handleCheck(row.ID)}
                  />                   */}
                </td>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default DataTable;
