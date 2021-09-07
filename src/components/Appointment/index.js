import React from "react";
import "./styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM_DELETE = "CONFIRM_DELETE";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_INPUT = "ERROR_INPUT";

export default function Appointment(props) {
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  const saveInterview = (name, interviewer) => {
    console.log("saving");
    console.log("name", name);
    console.log("interviewer", interviewer);
    if (!name || !interviewer) {
      transition(ERROR_INPUT, true);
      
      return;
    }

    const interview = {
      student: name,
      interviewer: interviewer.id
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  const deleteInterview = apptId => {
    transition(DELETING, true);
    props.deleteInterview(apptId)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  return (

    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM_DELETE)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={saveInterview}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer}
          name={props.interview.student}
          onCancel={() => {
            console.log("cancelled", props.interview);
            
            back();
          }}
          onSave={saveInterview}
        />
      )}
      {mode === SAVING && (
        <Status
          message={"Saving..."}
        />
      )}
      {mode === DELETING && (
        <Status
          message={"Deleting..."}
        />
      )}
      {mode === CONFIRM_DELETE && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={() => back()}
          onConfirm={() => deleteInterview(props.id)}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Could not cancel appointment."}
          onClose={() => back()}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={"Could not create appointment."}
          onClose={() => back()}
        />
      )}
      {mode === ERROR_INPUT && (
        <Error
          message={"Invalid name or interviewer."}
          onClose={() => back()}
        />
      )}
    </article>

  );
}
