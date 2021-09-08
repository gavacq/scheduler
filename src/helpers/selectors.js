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

const countEmptySpotsForDay = (appts, day) => {
  let emptySpots = 0;

  for (const appt of day.appointments) {
    if (appts[appt].interview === null) {
      emptySpots++;
    }
  }

  return emptySpots;
};

const updateSpots = function(state, appointments) {
  // find the current day and deep copy it
  const newDay = {...state.days.find(day => day.name === state.day)};

  // calculate new spots and update spots for day
  newDay.spots = countEmptySpotsForDay(appointments, newDay);

  // update days array without mutating state
  const days = state.days.map(dayObj => (dayObj.name === state.day) ? newDay : dayObj);

  // return days array
  return days;
};

export {getAppointmentsForDay, getInterviewersForDay, getInterview, updateSpots};
