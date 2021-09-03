import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import "./Application.scss";

export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  console.log("state", state);
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments")
    ]).then(res => {
      setState(prev => {
        return {
          ...prev,
          days: res[0].data,
          appointments: res[1].data
        };
      });
    }).catch(res => console.log("Error:", res.message));
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({
    ...state,
    day
  });

  // 69 420   xoxooxox

  return (
    <main className="layout">

      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            // /CREATE PROPS and pass them to DayList
            day={state.day}
            days={state.days}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => {
          return (
            <Appointment
              key={appointment.id}
              {...appointment} />
          );
        })}

        {/* the appointment below is a fake and is not rendered. It is just used to
        display the end of the day without any interviews */}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
