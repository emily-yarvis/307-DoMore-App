// src/Form.jsx
import React, { useState } from "react";

function Form(props) {
  const [person, setPerson] = useState({
    taskName: "",
    dueDate: ""
  });

  function handleChange(event) {//come back to this and write it better later
    const { name, value } = event.target;
    setPerson(prevPerson => ({
      ...prevPerson,
      [name]: value
    }));
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
        onChange={handleChange}
      />
      <label htmlFor="dueDate">Due Date</label>
      <input
        type="text"
        name="dueDate"
        id="dueDate"
        value={person.dueDate}
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={submitForm} />

    </form>
  );
}


export default Form;