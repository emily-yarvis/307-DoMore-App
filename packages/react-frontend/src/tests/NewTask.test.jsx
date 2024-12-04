import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewTask from "../NewTask";

describe("NewTask Component", () => {
  it("renders all form inputs and submit button", () => {
    render(<NewTask handleSubmit={() => {}} />);

    // Check for inputs by their labels
    expect(screen.getByLabelText("Task Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Due Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "✓" })).toBeInTheDocument();
  });

  it("updates state on input change", () => {
    render(<NewTask handleSubmit={() => {}} />);

    // Interact with inputs by their labels
    const taskNameInput = screen.getByLabelText("Task Name");
    const dueDateInput = screen.getByLabelText("Due Date");
    const descriptionInput = screen.getByLabelText("Description");

    fireEvent.change(taskNameInput, { target: { value: "Test Task" } });
    fireEvent.change(dueDateInput, { target: { value: "2024-12-31" } });
    fireEvent.change(descriptionInput, { target: { value: "Test Description" } });

    expect(taskNameInput.value).toBe("Test Task");
    expect(dueDateInput.value).toBe("2024-12-31");
    expect(descriptionInput.value).toBe("Test Description");
  });

  it("calls handleSubmit with correct data on submit", () => {
    const mockSubmit = jest.fn();
    render(<NewTask handleSubmit={mockSubmit} />);

    // Interact with inputs
    const taskNameInput = screen.getByLabelText("Task Name");
    const dueDateInput = screen.getByLabelText("Due Date");
    const descriptionInput = screen.getByLabelText("Description");
    const submitButton = screen.getByRole("button", { name: "✓" });

    fireEvent.change(taskNameInput, { target: { value: "Test Task" } });
    fireEvent.change(dueDateInput, { target: { value: "2024-12-31" } });
    fireEvent.change(descriptionInput, { target: { value: "Test Description" } });
    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith({
      taskName: "Test Task",
      dueDate: "2024-12-31",
      description: "Test Description",
    });
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
});
