import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
  interviewer: PropTypes.object,
  setInterviewer: PropTypes.func
};

export default function InterviewerList(props) {
  // const { interviewers, interviewer, setInterviewer } = props;

  // makes sure that interviewers is truthy, and that we have access to them
  const interviewerListItems = props.interviewers && props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        // id={interviewer.id} // Do not need as per compass lul
        avatar={interviewer.avatar}
        selected={props.interviewer && (interviewer.id === props.interviewer.id)}
        //setInterviewer prop is an anon function that returns the return value of props.setInterviewer(interviewer.id) (which is the real function that changes the state)
        setInterviewer={() => props.setInterviewer(interviewer)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">interviewer</h4>
      <ul className="interviewers__list">{interviewerListItems}</ul>
    </section>
  );
}
