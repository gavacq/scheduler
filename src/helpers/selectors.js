const getAppointmentsForDay = (state, dayName) => {
  const appts = [];

  console.log("getAppointmentsForDay", state);

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

  console.log("getInterview state interviewers", state.interviewers);
  console.log("getInterview interview", interview);

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
  // deep copy days array
  // const days = state.days.map(day => {
  //   return {...day};
  // });
  const days = {...state.days};

  // find the current day
  const day = days.filter(day => day.name === state.day);

  // calculate new spots
  day.spots = countEmptySpotsForDay(appointments, day);
  console.log("new day", day);
  
  // update the day.spots
  // update days array
  days.splice(day.id - 1, 1, day);
  console.log("spliced days", days);

  // return days array
  return days;
};

export {getAppointmentsForDay, getInterviewersForDay, getInterview, updateSpots};
