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

const countBookingsForDay = (appts, day) => {
  let bookings = 0;

  for (const appt of day.appointments) {
    if (appts[appt].interview !== null) {
      bookings++;
    }
  }

  return bookings;
};

const updateSpots = function(state, appointments, change) {
  const MAXSPOTS = 5;

  // deep copy days array
  const days = state.days.map(day => {
    return {...day};
  });

  // find the current day
  const curDay = days.find(day => day.name === state.day);

  // calculate new spots
  // update the day.spots
  // update days array
  curDay.spots = MAXSPOTS - countBookingsForDay(appointments, curDay);

  // return days array
  return days;
};

export {getAppointmentsForDay, getInterviewersForDay, getInterview, countBookingsForDay, updateSpots};
