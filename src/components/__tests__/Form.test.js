/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import {render, cleanup, fireEvent} from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Form from "components/Appointment/Form";

describe("Form", () => {
  afterEach(cleanup);

  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const {getByPlaceholderText} = render(<Form
      interviewers={interviewers}
    />);
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const {getByTestId} = render(<Form
      interviewers={interviewers}
      name="Lydia Miller-Jones"
    />);
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const {getByText, getByPlaceholderText, queryByText} = render(
      <Form interviewers={interviewers} onSave={onSave} interviewer={interviewers[0]} />
    );

    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {target: {value: "Lydia Miller-Jones"}});

    fireEvent.click(getByText("Save"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", interviewers[0]);
  });

  it("can successfully save after trying to submit without selecting an interviewer", () => {
    const onSave = jest.fn();
    const {getByText, getByPlaceholderText, queryByText, getByAltText} = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {target: {value: "Lydia Miller-Jones"}});

    fireEvent.click(getByText("Save"));

    expect(getByText(/an interviewer must be selected/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    fireEvent.click(getByAltText("Sylvia Palmer"));

    fireEvent.click(getByText("Save"));

    expect(queryByText(/an interviewer must be selected/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", interviewers[0]);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const {getByText, getByPlaceholderText, queryByText} = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );

    fireEvent.click(getByText("Save"));

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {target: {value: "Lydia Miller-Jones"}});

    fireEvent.click(getByText("Cancel"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
