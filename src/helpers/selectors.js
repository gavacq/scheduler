const getAppointmentsForDay = (state, dayName) => {
  const appts = [];

  state.days.forEach(day => {
    if (day.name === dayName) {
      day.appointments.forEach(appt => appts.push(state.appointments[appt]));
    }
  });
  
  return appts;
};

export {getAppointmentsForDay};
