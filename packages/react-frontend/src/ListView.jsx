// import React, { useState } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import NewList from "./NewList";



function TableHeader() {
  return (
    <thead>
      <tr>
        <th>List Name</th>
        <th>Delete</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const rows = props.listData.map((row, index) => (
    <tr className="flex items-center justify-between" key={index}>
      <td>
        <div className=" py-2 px-4 min-w-40 bg-white font-semibold rounded-md">
          {row.listName}
        </div>
      </td>
      <td>
        <button
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md "
          onClick={() => props.removeCharacter(index)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return <tbody>{rows}</tbody>;
}

TableBody.propTypes = {
  listData: PropTypes.arrayOf(
    PropTypes.shape({
      listName: PropTypes.string.isRequired,
    }),
  ).isRequired,
  removeCharacter: PropTypes.func.isRequired,
};

function ListView(props) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  function addNewList(list) {
    setListData([...props.listData, list]);
    closeModal();
  }

  return (
    <div>
      
      <table>
        <TableBody
          listData={props.listData}
          removeCharacter={props.removeCharacter}
        />
      </table>
      <button
        className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md mt-4"
        onClick={openModal}
      >
        Add a List
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <NewList handleSubmit={addNewList} />
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          >
            &#10005;
          </button>
        </div>
      )}
    </div>
  );
}

ListView.propTypes = {
  listData: PropTypes.arrayOf(
    PropTypes.shape({
      listName: PropTypes.string.isRequired,
    }),
  ).isRequired,
  removeCharacter: PropTypes.func.isRequired,
};

export default ListView;
