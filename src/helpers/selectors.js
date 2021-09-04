const getAppointmentsForDay = (state, dayName) => {
  const appts = [];

  state.days.forEach(day => {
    if (day.name === dayName) {
      day.appointments.forEach(appt => appts.push(state.appointments[appt]));
    }
  });
  
  return appts;
};

const getInterviewersForDay = (state, dayName) => {
  const interviewers = [];

  state.days.forEach(day => {
    if (day.name === dayName) {
      day.interviewers.forEach(interviewer => interviewers.push(state.interviewers[interviewer]));
    }
  });
  
  return interviewers;
};

const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
};

export {getAppointmentsForDay, getInterviewersForDay, getInterview};
