import React, { useState } from 'react';
import DataTable from './DataTable';

function ReadTable({ setTitle, setDate, title, date, filters }) {
  const [fileData, setFileData] = useState(null);
  // const [title, setTitle] = useState(null);
  // const [date, setDate] = useState(null);

  const handleChange = async (e) => {
    // if (!Array.isArray(e.target.files)) {
    //   return;
    // }
    const file = e.target.files[0];
    const text = await file.text();
    const doc = new DOMParser().parseFromString(text, 'text/html');

    const rows = Array.from(doc.querySelectorAll('tr'));

    setTitle(rows[0]?.innerText.trim());
    setDate(rows[2]?.innerText.trim());

    const headers = Array.from(rows[4]?.querySelectorAll('th'), (th) =>
      th.innerText.trim()
    );

    const data = rows.slice(5).map((row) => {
      const values = Array.from(row.querySelectorAll('td'), (td) =>
        td.innerText.trim()
      );
      return Object.fromEntries(headers.map((_, i) => [headers[i], values[i]]));
    });

    setFileData(data);
  };

  return (
    <div>
      <input
        className='file-select-file'
        type='file'
        accept='.html'
        onChange={handleChange}
      />
      {fileData && (
        <DataTable
          data={fileData}
          title={title}
          date={date}
          filters={filters}
        />
      )}
    </div>
  );
}

export default ReadTable;
