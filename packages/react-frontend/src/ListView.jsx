import NewList from "./NewList"; // Import the NewList component

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
    <tr key={index}>
      <td>{row.listName}</td>
      <td>
        <button
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md mb-4"
          onClick={() => props.removeCharacter(index)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return <tbody>{rows}</tbody>;
}

function ListView(props) {
  const [showModal, setShowModal] = useState(false);
  const [listData, setListData] = useState(props.listData || []);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  function addNewList(list) {
    setListData([...listData, list]);
    closeModal(); // Close the modal after adding the list
  }

  return (
    <div>
      <table>
        <TableHeader />
        <TableBody listData={listData} removeCharacter={props.removeCharacter} />
      </table>

      {/* Button to open the modal */}
      <button
        className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md mt-4"
        onClick={openModal}
      >
        Add a List
      </button>

      {/* Conditionally render NewList as a modal */}
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

export default ListView