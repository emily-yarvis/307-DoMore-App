// src/Table.jsx

import PropTypes from "prop-types";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Task Name</th>
        <th>Due Date</th>
        <th>Delete</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const rows = props.characterData.map((row, index) => (
    <tr key={index}>
      <td>{row.taskName}</td>
      <td>{row.dueDate}</td>
      <td>
        <button onClick={() => props.removeCharacter(index)}>Delete</button>
      </td>
    </tr>
  ));
  return <tbody>{rows}</tbody>;
}

TableBody.propTypes = {
  characterData: PropTypes.arrayOf(
    PropTypes.shape({
      taskName: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  removeCharacter: PropTypes.func.isRequired,
};

function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody
        characterData={props.characterData}
        removeCharacter={props.removeCharacter}
      />
    </table>
  );
}

Table.propTypes = {
  characterData: PropTypes.arrayOf(
    PropTypes.shape({
      taskName: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  removeCharacter: PropTypes.func.isRequired,
};

export default Table;
