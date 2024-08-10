const DataTable = ({ data, columns, actions }) => {
    return (
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.Header}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {col.Cell ? col.Cell({ cell: { value: row[col.accessor] } }) : row[col.accessor]}
                </td>
              ))}
              <td>
                {actions.map((ActionComponent, actionIndex) => (
                  <span key={actionIndex}>
                    {ActionComponent(row)}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  export default DataTable;