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
  const rows = Object.keys(props.userData).map((row, index) => (
    <tr key={index}>
      <td>
        <div>
          <div className="flex gap-4 mt-2">
            <div className="text-2xl font-bold">{row}</div>
            <button
              className="flex w-8 h-8 bg-red-500 text-white justify-center items-center font-semibold rounded-md"
              onClick={() => props.removeCharacter(index)}
            >
              x
            </button>
          </div>
          <div className="pt-4">
            <ListView
              listData={props.userData[row]}
              addNewList={props.addNewList}
              currentCategory={row}
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
  userData: PropTypes.object.isRequired,
  addNewList: PropTypes.func.isRequired,
  onSelectList: PropTypes.func.isRequired,
  removeCharacter: PropTypes.func.isRequired,
};

function CategoryView(props) {
  return (
    <div>
      <div className="bg-gray-200 rounded-md mb-4 py-2 px-2">
        <MyListsHeader />
      </div>
      <div className="bg-gray-200 rounded-md mb-4 py-2 px-2">
        <table>
          <CategoryViewBody
            userData={props.userData}
            addNewList={props.addNewList}
            onSelectList={props.onSelectList} // Pass selection handler
          />
        </table>
        <button
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md mt-4"
          onClick={() => console.log("Add Category Clicked")}
        >
          Add a New Category
        </button>
      </div>
    </div>
  );
}

CategoryView.propTypes = {
  userData: PropTypes.object.isRequired,
  addNewList: PropTypes.func.isRequired,
  onSelectList: PropTypes.func.isRequired,
};

export default CategoryView;