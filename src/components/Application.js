import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
import Appointment from "components/Appointment";
import "./Application.scss";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Bob Thomas",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  },
  {
    id: 4,
    time: "4pm",
  },
  {
    id: 5,
    time: "4:30pm",
    interview: {
      student: "Gary Jipp",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg"
      }
    }
  }
];

export default function Application() {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  console.log("days:", days);

  useEffect(() => {
    axios.get("/api/days")
      .then(res => setDays(res.data))
      .catch(res => console.log("Error:", res.message));
  }, []);

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
            day={day}
            days={days}
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
        {appointments.map(appointment => {
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
