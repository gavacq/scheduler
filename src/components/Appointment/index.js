import React from "react";
import "./styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM_DELETE = "CONFIRM_DELETE";

export default function Appointment(props) {
  const {mode, transition} = useVisualMode(props.interview ? SHOW : EMPTY);

  const saveInterview = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => console.error(err.message));
  };

  const deleteInterview = apptId => {
    transition(SAVING);

    props.deleteInterview(apptId);
    console.log("props.interview", props.interview);
    
    transition(EMPTY);
  };

  return (

    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => deleteInterview(props.id)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => transition(EMPTY)}
          onSave={saveInterview}
        />
      )}
      {mode === SAVING && (
        <Status
          message={"Saving..."}
        />
      )}
    </article>

  );
}
