// import React, { useState } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import NewCategory from "./NewCategory";
import ListView from "./ListView";


function MyListsHeader(props) {
  return (
    <div className="flex justify-center text-2xl font-bold rounded-mb">
      My Lists
    </div>
  );
}

function CategoryViewBody(props) {
  console.log(props.userData);
  const rows = Object.keys(props.userData).map((row, index) => (
    <tr key={index}>
      <td>
        <div>
          <div className="flex gap-4 mt-2">
            <div className=" text-2xl font-bold">{row}</div>
            <button
              className=" flex w-8 h-8 bg-red-500 text-white justify-center items-center font-semibold rounded-md "
              onClick={() => props.removeCharacter(index)}
            >
              x
            </button>
          </div>
          <div className="pt-4">
            <ListView
              listData={props.userData[row]}
              // removeCharacter={props.removeCharacter}
              addNewList = {props.addNewList}
              currentCategory = {row}
              onSelectList={props.onSelectList} // Pass selection handler
            />
          </div>
        </div>
      </td>
    </tr>
  ));
  return <tbody>{rows}</tbody>;
}

CategoryViewBody.propTypes = {
  categoryData: PropTypes.arrayOf(
    PropTypes.shape({
      categoryName: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSelectList: PropTypes.func.isRequired,

  removeCharacter: PropTypes.func.isRequired,
};



function CategoryView(props) {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  function addNewCategory(category){
    props.addNewCategory(category);
    closeModal();
  }

  

  

  return (
    <div >
       <div className=" bg-gray-200 rounded-md mb-4 py-2 px-2">
          <MyListsHeader />
        </div>
      <div className=" bg-gray-200 rounded-md mb-4 py-2 px-2">
        <table>
          <CategoryViewBody
          
            addNewList = {props.addNewList}
            userData = {props.userData}
            onSelectList={props.onSelectList} // Pass selection handler
            addNewTask = {props.addNewTask} 

          />
        </table>

        <button
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md mt-4"
          onClick={openModal}
        >
          Add a New Category
        </button>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <NewCategory handleSubmit={addNewCategory} />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              &#10005;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

CategoryView.propTypes = {
  categoryData: PropTypes.arrayOf(
    PropTypes.shape({
      categoryName: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSelectList: PropTypes.func.isRequired,
  removeCharacter: PropTypes.func.isRequired,
};

export default CategoryView;
