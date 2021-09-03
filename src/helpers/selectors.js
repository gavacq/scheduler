const getAppointmentsForDay = (state, dayName) => {
  const appts = [];

  state.days.forEach(day => {
    if (day.name === dayName) {
      day.appointments.forEach(appt => appts.push(state.appointments[appt]));
    }
  });
  
  return appts;
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

export {getAppointmentsForDay, getInterview};
