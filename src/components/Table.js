const Table = ({ columns, rows }) => (
  <table>
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column}>{column}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map(({ url, name, amount }) => (
        <tr key={url}>
          <td>{name}</td>
          <td>{amount}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
