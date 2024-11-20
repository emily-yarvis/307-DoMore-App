import React, { useState } from "react";
import PropTypes from "prop-types";

function Form(props) {
  const [person, setPerson] = useState({
    taskName: "",
    dueDate: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setPerson({ ...person, [name]: value }); 
  }

  function submitForm() {
    props.handleSubmit(person);
    setPerson({ taskName: "", dueDate: "" });
  }

  return (
    <form>
      <label htmlFor="taskName">Task Name</label>
      <input
        type="text"
        name="taskName"
        id="taskName"
        value={person.taskName}
        className="w-full w-60"
        onChange={handleChange}
      />
      <label htmlFor="dueDate">Due Date</label>
      <input
        type="date"
        name="dueDate"
        id="dueDate"
        value={person.dueDate}
        className="w-full w-60"
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired, 
};

export default Form;
